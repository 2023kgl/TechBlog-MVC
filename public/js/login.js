const loginFormHandler = async (event) => {
  event.preventDefault();

  // GRAB USER INPUTS
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
      try {
          const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
              document.location.replace('/dashboard');
          } else {
              const errorData = await response.json();
              console.error('Error response data:', errorData);
              alert('FAILED TO LOGIN');
          }
      } catch (error) {
          console.error('Fetch error:', error);
          alert('An error occurred. Please try again later.');
      }
  } else {
      alert('Please enter both username and password.');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
