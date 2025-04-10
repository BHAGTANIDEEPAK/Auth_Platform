(function () {
    const ORIGIN = window.location.origin;
  
    if (localStorage.getItem(ORIGIN)) {
      return; // already logged in
    }
  
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
  
        document.getElementById('auth-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const isLogin = document.getElementById('form-title').textContent === 'Login';
          const url = `https://auth-platform-gc05.onrender.com/api/auth/${isLogin ? 'login' : 'register'}`;
  
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, projectURL: ORIGIN })
          });
  
          const data = await res.json();
          if (res.ok) {
            localStorage.setItem(ORIGIN, JSON.stringify(data));
            alert('Logged in successfully!');
            location.reload();
          } else {
            alert(data.msg || 'Error');
          }
        });
      });
  })();
  