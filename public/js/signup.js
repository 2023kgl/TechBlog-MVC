const signupFormHandler = async (event) => {
    event.preventDefault()

    const name = document.querySelector('#name-signup').value.trim()
    const email = document.querySelector('#email-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

console.log(name, email, password); 

    if (name && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        document.location.replace('/dashboard')
      } else if (response.status === 400) {
        alert('User already exists, please log in.')
      } 
    }
  }

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler)