(function () {
    const ORIGIN = window.location.origin;
    const HOSTNAME = window.location.hostname;
    const API_BASE = 'https://auth-platform-gc05.onrender.com';
    const OTP_API = 'https://otp-dispatcher.onrender.com/api/auth';

      // ✅ Define your allowed hostnames
  const allowedHostnames = [
    'your-client-site.com',
    'another-allowed-client.com',
  ];

  // 🚫 Block unauthorized domains
  if (!allowedHostnames.includes(HOSTNAME)) {
    console.warn(`Access denied for hostname: ${HOSTNAME}`);
    document.body.innerHTML = `
      <div style="padding:40px; text-align:center; font-family:sans-serif; color:#b00020;">
        <h2>Unauthorized</h2>
        <p>This widget is not allowed on this domain.</p>
      </div>
    `;
    return;
  }
  
    if (localStorage.getItem(ORIGIN)) return;
  
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `${API_BASE}/style.css`;
    document.head.appendChild(style);
  
    const container = document.createElement('div');
    container.id = 'auth-widget-container';
    document.body.appendChild(container);
  
    function showLoader(message = 'Please wait...') {
      container.innerHTML = `
        <div class="loader-wrapper">
          <div class="spinner"></div>
          <p>${message}</p>
        </div>
      `;
    }
  
    fetch(`${API_BASE}/auth.html`)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
  
        const formTitle = document.getElementById('form-title');
        const toggleLink = document.getElementById('toggle-link');
        const authForm = document.getElementById('auth-form');
  
        authForm.addEventListener('submit', async (e) => {
          e.preventDefault();
  
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;
          const isLogin = formTitle.textContent === 'Login';
          const url = `${API_BASE}/api/auth/${isLogin ? 'login' : 'register'}`;
  
          if (!email || !password) {
            alert('Please fill in both fields');
            return;
          }
  
          showLoader(isLogin ? 'Logging in...' : 'Registering...');
  
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, projectURL: ORIGIN })
            });
  
            const data = await res.json();
  
            if (!res.ok) {
              alert(data.msg || 'Authentication failed');
              return location.reload();
            }
  
            // ✅ Load OTP HTML first
            const otpHTML = await fetch(`${API_BASE}/otp.html`).then(r => r.text());
            container.innerHTML = otpHTML;
  
            // 📨 Then send OTP in the background
            await fetch(`${OTP_API}/send-otp`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email })
            });
  
            // ✅ Now handle OTP form submission
            document.getElementById('auth-form').addEventListener('submit', async (e) => {
              e.preventDefault();
  
              const otp = document.getElementById('otp').value.trim();
              if (!otp) {
                alert('Enter the OTP');
                return;
              }
  
              showLoader('Verifying OTP...');
  
              try {
                const verifyRes = await fetch(`${OTP_API}/verify-otp`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, otp })
                });
  
                const verifyData = await verifyRes.json();
  
                if (!verifyRes.ok) {
                  alert(verifyData.msg || 'OTP verification failed');
                  return location.reload();
                }
  
                localStorage.setItem(ORIGIN, JSON.stringify(data));
                alert('Login successful!');
                location.reload();
  
              } catch (err) {
                alert('Error verifying OTP');
                location.reload();
              }
            });
  
          } catch (err) {
            alert('Network error. Please try again.');
            location.reload();
          }
        });
  
        toggleLink.addEventListener('click', function (e) {
          e.preventDefault();
          const isLogin = formTitle.textContent === 'Login';
          formTitle.textContent = isLogin ? 'Register' : 'Login';
          toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
        });
      });
  
    // Spinner CSS
    const css = document.createElement('style');
    css.textContent = `
      .loader-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        font-family: sans-serif;
        color: #333;
      }
      .spinner {
        border: 5px solid #eee;
        border-top: 5px solid #007bff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-bottom: 10px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(css);
  })();
  