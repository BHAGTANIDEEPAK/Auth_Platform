(function () {
    const ORIGIN = window.location.origin;
  
    if (localStorage.getItem(ORIGIN)) return; // already logged in
  
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://auth-platform-gc05.onrender.com/style.css';
    document.head.appendChild(style);
  
    const container = document.createElement('div');
    container.id = 'auth-widget-container';
    document.body.appendChild(container);
  
    fetch('https://auth-platform-gc05.onrender.com/auth.html')
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;
  
        const formTitle = document.getElementById('form-title');
        const toggleLink = document.getElementById('toggle-link');
        const authForm = document.getElementById('auth-form');
  
        // ✅ Handle Form Submit
        authForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const isLogin = formTitle.textContent === 'Login';
  
          const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;
  
          try {
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, projectURL: ORIGIN }),
            });
  
            const data = await res.json();
  
            if (res.ok) {
              localStorage.setItem(ORIGIN, JSON.stringify(data));
              alert('Logged in successfully!');
              location.reload();
            } else {
              alert(data.msg || 'Error');
            }
          } catch (err) {
            console.error('Error:', err);
            alert('Network or server error');
          }
        });
  
        // ✅ Handle Toggle
        toggleLink.addEventListener('click', function (e) {
          e.preventDefault();
          const isLogin = formTitle.textContent === 'Login';
          formTitle.textContent = isLogin ? 'Register' : 'Login';
          toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
        });
      });
  })();
  