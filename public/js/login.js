// const loginFormHandler = async (event) => {
//     event.preventDefault();

// // GRAB USER INPUTS
//     const email = document.querySelector('#email-login').value.trim();
//     console.log(email)
//     const password = document.querySelector('#password-login').value.trim();
//     console.log(password)
    
//     if (email && password) {
//       const response = await fetch("/api/users/login", {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });  
//       console.log(response); 

//       if (response.ok) {
//         document.location.replace('/dashboard');
//       } else {
//         alert('FAILED TO LOGIN');
//       }
//     }
//   };

//   document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

const loginFormHandler = async (event) => {
  event.preventDefault();

  // GRAB USER INPUTS
  const email = document.querySelector('#email-login').value.trim();
  console.log('Email:', email);
  const password = document.querySelector('#password-login').value.trim();
  console.log('Password:', password);

  if (email && password) {
      try {
          const response = await fetch("/api/users/login", {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: { 'Content-Type': 'application/json' },
          });

          console.log('Response:', response);

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
      alert('Please enter both email and password.');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
