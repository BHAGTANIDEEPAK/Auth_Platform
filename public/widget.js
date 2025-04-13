// (function () {
//     const ORIGIN = window.location.origin;
  
//     if (localStorage.getItem(ORIGIN)) return; // already logged in
  
//     const style = document.createElement('link');
//     style.rel = 'stylesheet';
//     style.href = 'https://auth-platform-gc05.onrender.com/style.css';
//     document.head.appendChild(style);
  
//     const container = document.createElement('div');
//     container.id = 'auth-widget-container';
//     document.body.appendChild(container);

//     var login_with_password = false;
  
//     fetch('https://auth-platform-gc05.onrender.com/auth.html')
//       .then(res => res.text())
//       .then(html => {
//         container.innerHTML = html;
  
//         const formTitle = document.getElementById('form-title');
//         const toggleLink = document.getElementById('toggle-link');
//         const authForm = document.getElementById('auth-form');
  
//         // ✅ Handle Form Submit
//         authForm.addEventListener('submit', async (e) => {
//           e.preventDefault();
//           const email = document.getElementById('email').value;
//           const password = document.getElementById('password').value;
//           const isLogin = formTitle.textContent === 'Login';
  
//           const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;
  
//           try {
//             const res = await fetch(url, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email, password, projectURL: ORIGIN }),
//             });
  
//             const data = await res.json();
  
//             if (res.ok) {
//               var verify = otpVerify(email);
//               if(verify){
//                 localStorage.setItem(ORIGIN, JSON.stringify(data));
//                 alert('Logged in successfully!');
//                 location.reload();
//               }
//             } else {
//               alert(data.msg || 'Error');
//             }
//           } catch (err) {
//             console.error('Error:', err);
//             alert('Network or server error');
//           }
//         });

  
//         // ✅ Handle Toggle
//         toggleLink.addEventListener('click', function (e) {
//           e.preventDefault();
//           const isLogin = formTitle.textContent === 'Login';
//           formTitle.textContent = isLogin ? 'Register' : 'Login';
//           toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
//         });
//       });
//   })();

  
  
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

  // 🔐 OTP Verify Function with OTP HTML flow
  async function otpVerify(email) {
    try {
      // Step 1: Send OTP
      const sendRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const sendData = await sendRes.json();
      if (!sendRes.ok) {
        alert(sendData.msg || 'Failed to send OTP');
        return false;
      }

      // Step 2: Load OTP HTML
      const otpHTML = await fetch('https://auth-platform-gc05.onrender.com/otp.html').then(r => r.text());
      container.innerHTML = otpHTML;

      return new Promise((resolve) => {
        document.getElementById('otp-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const otp = document.getElementById('otp-input').value;

          if (!otp) {
            alert('OTP is required');
            return resolve(false);
          }

          // Step 3: Verify OTP
          const verifyRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) {
            alert(verifyData.msg || 'Invalid or expired OTP');
            return resolve(false);
          }

          resolve(true);
        });
      });

    } catch (err) {
      console.error('OTP verification error:', err);
      alert('Something went wrong during OTP verification');
      return false;
    }
  }

  // 🔐 Main auth form
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
            otpVerify(email).then((verified) => {
              if (verified) {
                localStorage.setItem(ORIGIN, JSON.stringify(data));
                alert('Logged in successfully!');
                location.reload();
              }
            });
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
