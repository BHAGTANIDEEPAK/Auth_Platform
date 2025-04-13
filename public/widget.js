// // // // (function () {
// // // //     const ORIGIN = window.location.origin;
  
// // // //     if (localStorage.getItem(ORIGIN)) return; // already logged in
  
// // // //     const style = document.createElement('link');
// // // //     style.rel = 'stylesheet';
// // // //     style.href = 'https://auth-platform-gc05.onrender.com/style.css';
// // // //     document.head.appendChild(style);
  
// // // //     const container = document.createElement('div');
// // // //     container.id = 'auth-widget-container';
// // // //     document.body.appendChild(container);

// // // //     var login_with_password = false;
  
// // // //     fetch('https://auth-platform-gc05.onrender.com/auth.html')
// // // //       .then(res => res.text())
// // // //       .then(html => {
// // // //         container.innerHTML = html;
  
// // // //         const formTitle = document.getElementById('form-title');
// // // //         const toggleLink = document.getElementById('toggle-link');
// // // //         const authForm = document.getElementById('auth-form');
  
// // // //         // ✅ Handle Form Submit
// // // //         authForm.addEventListener('submit', async (e) => {
// // // //           e.preventDefault();
// // // //           const email = document.getElementById('email').value;
// // // //           const password = document.getElementById('password').value;
// // // //           const isLogin = formTitle.textContent === 'Login';
  
// // // //           const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;
  
// // // //           try {
// // // //             const res = await fetch(url, {
// // // //               method: 'POST',
// // // //               headers: { 'Content-Type': 'application/json' },
// // // //               body: JSON.stringify({ email, password, projectURL: ORIGIN }),
// // // //             });
  
// // // //             const data = await res.json();
  
// // // //             if (res.ok) {
// // // //               var verify = otpVerify(email);
// // // //               if(verify){
// // // //                 localStorage.setItem(ORIGIN, JSON.stringify(data));
// // // //                 alert('Logged in successfully!');
// // // //                 location.reload();
// // // //               }
// // // //             } else {
// // // //               alert(data.msg || 'Error');
// // // //             }
// // // //           } catch (err) {
// // // //             console.error('Error:', err);
// // // //             alert('Network or server error');
// // // //           }
// // // //         });

  
// // // //         // ✅ Handle Toggle
// // // //         toggleLink.addEventListener('click', function (e) {
// // // //           e.preventDefault();
// // // //           const isLogin = formTitle.textContent === 'Login';
// // // //           formTitle.textContent = isLogin ? 'Register' : 'Login';
// // // //           toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
// // // //         });
// // // //       });
// // // //   })();

  
  
// // // (function () {
// // //   const ORIGIN = window.location.origin;

// // //   if (localStorage.getItem(ORIGIN)) return; // already logged in

// // //   const style = document.createElement('link');
// // //   style.rel = 'stylesheet';
// // //   style.href = 'https://auth-platform-gc05.onrender.com/style.css';
// // //   document.head.appendChild(style);

// // //   const container = document.createElement('div');
// // //   container.id = 'auth-widget-container';
// // //   document.body.appendChild(container);

// // //   // 🔐 OTP Verify Function with OTP HTML flow
// // //   async function otpVerify(email) {
// // //     try {
// // //       // Step 1: Send OTP
// // //       const sendRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/send-otp', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ email })
// // //       });

// // //       const sendData = await sendRes.json();
// // //       if (!sendRes.ok) {
// // //         alert(sendData.msg || 'Failed to send OTP');
// // //         return false;
// // //       }

// // //       // Step 2: Load OTP HTML
// // //       const otpHTML = await fetch('https://auth-platform-gc05.onrender.com/otp.html').then(r => r.text());
// // //       container.innerHTML = otpHTML;

// // //       return new Promise((resolve) => {
// // //         document.getElementById('otp-form').addEventListener('submit', async (e) => {
// // //           e.preventDefault();
// // //           const otp = document.getElementById('otp-input').value;

// // //           if (!otp) {
// // //             alert('OTP is required');
// // //             return resolve(false);
// // //           }

// // //           // Step 3: Verify OTP
// // //           const verifyRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/verify-otp', {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ email, otp })
// // //           });

// // //           const verifyData = await verifyRes.json();
// // //           if (!verifyRes.ok) {
// // //             alert(verifyData.msg || 'Invalid or expired OTP');
// // //             return resolve(false);
// // //           }

// // //           resolve(true);
// // //         });
// // //       });

// // //     } catch (err) {
// // //       console.error('OTP verification error:', err);
// // //       alert('Something went wrong during OTP verification');
// // //       return false;
// // //     }
// // //   }

// // //   // 🔐 Main auth form
// // //   fetch('https://auth-platform-gc05.onrender.com/auth.html')
// // //     .then(res => res.text())
// // //     .then(html => {
// // //       container.innerHTML = html;

// // //       const formTitle = document.getElementById('form-title');
// // //       const toggleLink = document.getElementById('toggle-link');
// // //       const authForm = document.getElementById('auth-form');

// // //       // ✅ Handle Form Submit
// // //       authForm.addEventListener('submit', async (e) => {
// // //         e.preventDefault();
// // //         const email = document.getElementById('email').value;
// // //         const password = document.getElementById('password').value;
// // //         const isLogin = formTitle.textContent === 'Login';

// // //         const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;

// // //         try {
// // //           const res = await fetch(url, {
// // //             method: 'POST',
// // //             headers: { 'Content-Type': 'application/json' },
// // //             body: JSON.stringify({ email, password, projectURL: ORIGIN }),
// // //           });

// // //           const data = await res.json();

// // //           if (res.ok) {
// // //             otpVerify(email).then((verified) => {
// // //               if (verified) {
// // //                 localStorage.setItem(ORIGIN, JSON.stringify(data));
// // //                 alert('Logged in successfully!');
// // //                 location.reload();
// // //               }
// // //             });
// // //           } else {
// // //             alert(data.msg || 'Error');
// // //           }
// // //         } catch (err) {
// // //           console.error('Error:', err);
// // //           alert('Network or server error');
// // //         }
// // //       });

// // //       // ✅ Handle Toggle
// // //       toggleLink.addEventListener('click', function (e) {
// // //         e.preventDefault();
// // //         const isLogin = formTitle.textContent === 'Login';
// // //         formTitle.textContent = isLogin ? 'Register' : 'Login';
// // //         toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
// // //       });
// // //     });
// // // })();

// // (function () {
// //     const ORIGIN = window.location.origin;
  
// //     if (localStorage.getItem(ORIGIN)) return; // already logged in
  
// //     const style = document.createElement('link');
// //     style.rel = 'stylesheet';
// //     style.href = 'https://auth-platform-gc05.onrender.com/style.css';
// //     document.head.appendChild(style);
  
// //     const container = document.createElement('div');
// //     container.id = 'auth-widget-container';
// //     document.body.appendChild(container);
  
// //     async function otpVerify(email) {
// //       try {
// //         const sendRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/send-otp', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ email })
// //         });
  
// //         const sendData = await sendRes.json();
// //         if (!sendRes.ok) {
// //           alert(sendData.msg || 'Failed to send OTP');
// //           return false;
// //         }
  
// //         const otpHTML = await fetch('https://auth-platform-gc05.onrender.com/otp.html').then(r => r.text());
// //         container.innerHTML = otpHTML;
  
// //         return new Promise((resolve) => {
// //           const otpForm = document.getElementById('otp-form');
// //           otpForm.addEventListener('submit', async (e) => {
// //             e.preventDefault();
// //             const otp = document.getElementById('otp-input').value;
  
// //             if (!otp) {
// //               alert('OTP is required');
// //               return resolve(false);
// //             }
  
// //             const verifyRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/verify-otp', {
// //               method: 'POST',
// //               headers: { 'Content-Type': 'application/json' },
// //               body: JSON.stringify({ email, otp })
// //             });
  
// //             const verifyData = await verifyRes.json();
// //             if (!verifyRes.ok) {
// //               alert(verifyData.msg || 'Invalid or expired OTP');
// //               return resolve(false);
// //             }
  
// //             resolve(true);
// //           });
// //         });
  
// //       } catch (err) {
// //         console.error('OTP verification error:', err);
// //         alert('Something went wrong during OTP verification');
// //         return false;
// //       }
// //     }
  
// //     fetch('https://auth-platform-gc05.onrender.com/auth.html')
// //       .then(res => res.text())
// //       .then(html => {
// //         container.innerHTML = html;
  
// //         const formTitle = document.getElementById('form-title');
// //         const toggleLink = document.getElementById('toggle-link');
// //         const authForm = document.getElementById('auth-form');
  
// //         authForm.addEventListener('submit', async (e) => {
// //           e.preventDefault();
// //           const email = document.getElementById('email').value;
// //           const password = document.getElementById('password').value;
// //           const isLogin = formTitle.textContent === 'Login';
  
// //           const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;
  
// //           try {
// //             const res = await fetch(url, {
// //               method: 'POST',
// //               headers: { 'Content-Type': 'application/json' },
// //               body: JSON.stringify({ email, password, projectURL: ORIGIN }),
// //             });
  
// //             const data = await res.json();
  
// //             if (res.ok) {
// //               const verified = await otpVerify(email);
// //               if (verified) {
// //                 // ✅ Save and reload
// //                 localStorage.setItem(ORIGIN, JSON.stringify(data));
// //                 alert('Logged in successfully!');
// //                 window.location.reload();
// //               } else {
// //                 console.log('OTP verification failed');
// //               }
// //             } else {
// //               alert(data.msg || 'Error');
// //             }
// //           } catch (err) {
// //             console.error('Auth error:', err);
// //             alert('Network or server error');
// //           }
// //         });
  
// //         toggleLink.addEventListener('click', function (e) {
// //           e.preventDefault();
// //           const isLogin = formTitle.textContent === 'Login';
// //           formTitle.textContent = isLogin ? 'Register' : 'Login';
// //           toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
// //         });
// //       });
// //   })();
  

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
  
//     // 👉 Universal loader
//     function showLoader(text = 'Loading...') {
//       container.innerHTML = `<div class="loader-wrapper">
//         <div class="spinner"></div>
//         <p>${text}</p>
//       </div>`;
//     }
  
//     // 👉 OTP Verification Flow
//     async function otpVerify(email) {
//       try {
//         showLoader('Sending OTP...');
  
//         const sendRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/send-otp', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email })
//         });
  
//         const sendData = await sendRes.json();
//         if (!sendRes.ok) {
//           alert(sendData.msg || 'Failed to send OTP');
//           return false;
//         }
  
//         const otpHTML = await fetch('https://auth-platform-gc05.onrender.com/otp.html').then(r => r.text());
//         container.innerHTML = otpHTML;
  
//         return new Promise((resolve) => {
//           document.getElementById('otp-form').addEventListener('submit', async (e) => {
//             e.preventDefault();
//             const otp = document.getElementById('otp-input').value;
  
//             if (!otp) {
//               alert('OTP is required');
//               return resolve(false);
//             }
  
//             showLoader('Verifying OTP...');
  
//             try {
//               const verifyRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/verify-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, otp })
//               });
  
//               const verifyData = await verifyRes.json();
//               if (!verifyRes.ok) {
//                 alert(verifyData.msg || 'Invalid or expired OTP');
//                 return resolve(false);
//               }
  
//               resolve(true);
//             } catch (err) {
//               console.error('OTP Verification Error:', err);
//               alert('Error verifying OTP');
//               resolve(false);
//             }
//           });
//         });
  
//       } catch (err) {
//         console.error('OTP Flow Error:', err);
//         alert('Error during OTP flow');
//         return false;
//       }
//     }
  
//     // 👉 Load Auth Form
//     fetch('https://auth-platform-gc05.onrender.com/auth.html')
//       .then(res => res.text())
//       .then(html => {
//         container.innerHTML = html;
  
//         const formTitle = document.getElementById('form-title');
//         const toggleLink = document.getElementById('toggle-link');
//         const authForm = document.getElementById('auth-form');
  
//         // Handle Login/Register Submit
//         authForm.addEventListener('submit', async (e) => {
//           e.preventDefault();
//           const email = document.getElementById('email').value.trim();
//           const password = document.getElementById('password').value;
//           const isLogin = formTitle.textContent === 'Login';
  
//           if (!email || !password) return alert('Please fill all fields');
  
//           const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;
  
//           try {
//             showLoader(isLogin ? 'Logging in...' : 'Registering...');
  
//             const res = await fetch(url, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ email, password, projectURL: ORIGIN }),
//             });
  
//             const data = await res.json();
  
//             if (!res.ok) {
//               alert(data.msg || 'Authentication failed');
//               container.innerHTML = html; // Reset UI
//               return;
//             }
  
//             const verified = await otpVerify(email);
//             if (verified) {
//               localStorage.setItem(ORIGIN, JSON.stringify(data));
//               alert('Logged in successfully!');
//               location.reload();
//             } else {
//               container.innerHTML = html; // Re-show login form
//             }
  
//           } catch (err) {
//             console.error('Network or Server Error:', err);
//             alert('Please check your internet connection or try again later.');
//             container.innerHTML = html; // Reset UI
//           }
//         });
  
//         // Toggle between Login/Register
//         toggleLink.addEventListener('click', function (e) {
//           e.preventDefault();
//           const isLogin = formTitle.textContent === 'Login';
//           formTitle.textContent = isLogin ? 'Register' : 'Login';
//           toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
//         });
//       });
  
//     // Optional: Add simple spinner CSS
//     const css = document.createElement('style');
//     css.textContent = `
//       .loader-wrapper {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         padding: 40px;
//         font-family: sans-serif;
//         color: #555;
//       }
//       .spinner {
//         border: 6px solid #eee;
//         border-top: 6px solid #3498db;
//         border-radius: 50%;
//         width: 40px;
//         height: 40px;
//         animation: spin 1s linear infinite;
//         margin-bottom: 10px;
//       }
//       @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//       }
//     `;
//     document.head.appendChild(css);
//   })();
  
(function () {
    const ORIGIN = window.location.origin;
  
    if (localStorage.getItem(ORIGIN)) return; // Already logged in
  
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://auth-platform-gc05.onrender.com/style.css';
    document.head.appendChild(style);
  
    const container = document.createElement('div');
    container.id = 'auth-widget-container';
    document.body.appendChild(container);
  
    // 🔄 Show Loader
    function showLoader(message = 'Loading...') {
      container.innerHTML = `
        <div class="loader-wrapper">
          <div class="spinner"></div>
          <p>${message}</p>
        </div>
      `;
    }
  
    // ✅ OTP Flow
    async function sendAndVerifyOTP(email, userData) {
      try {
        showLoader('Sending OTP...');
  
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
  
        // ✅ Load OTP HTML and wait
        const otpHTML = await fetch('https://auth-platform-gc05.onrender.com/otp.html').then(r => r.text());
        container.innerHTML = otpHTML;
  
        return new Promise((resolve) => {
          document.getElementById('otp-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const otp = document.getElementById('otp-input').value.trim();
            if (!otp) {
              alert('Please enter the OTP');
              return resolve(false);
            }
  
            showLoader('Verifying OTP...');
  
            try {
              const verifyRes = await fetch('https://otp-dispatcher.onrender.com/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
              });
  
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) {
                alert(verifyData.msg || 'Invalid OTP');
                return resolve(false);
              }
  
              // ✅ OTP Verified, Save login data
              localStorage.setItem(ORIGIN, JSON.stringify(userData));
              resolve(true);
            } catch (err) {
              console.error('Verify OTP failed:', err);
              alert('Failed to verify OTP');
              resolve(false);
            }
          });
        });
      } catch (err) {
        console.error('OTP Flow Error:', err);
        alert('OTP process failed');
        return false;
      }
    }
  
    // ✅ Load Auth Form (Login/Register)
    fetch('https://auth-platform-gc05.onrender.com/auth.html')
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
  
          if (!email || !password) {
            alert('Please fill in both email and password');
            return;
          }
  
          showLoader(isLogin ? 'Logging in...' : 'Registering...');
  
          try {
            const res = await fetch(`https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, projectURL: ORIGIN })
            });
  
            const data = await res.json();
  
            if (!res.ok) {
              alert(data.msg || 'Authentication failed');
              container.innerHTML = html;
              return;
            }
  
            // ✅ Proceed with OTP
            const verified = await sendAndVerifyOTP(email, data);
            if (verified) {
              alert('Login successful!');
              location.reload();
            } else {
              container.innerHTML = html;
            }
          } catch (err) {
            console.error('Login/Register Error:', err);
            alert('Server error. Please try again.');
            container.innerHTML = html;
          }
        });
  
        toggleLink.addEventListener('click', function (e) {
          e.preventDefault();
          const isLogin = formTitle.textContent === 'Login';
          formTitle.textContent = isLogin ? 'Register' : 'Login';
          toggleLink.textContent = isLogin ? 'Switch to Login' : 'Switch to Register';
        });
      });
  
    // Optional Spinner CSS
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
  