document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('username').value;  // Username is actually email
  const password = document.getElementById('password').value;

  const formData = new FormData();
  formData.append('email', email); // Change to email
  formData.append('password', password);

  // Send login data to the PHP backend
  fetch('php/login.php', {
      method: 'POST',
      body: formData,
  })
  .then(response => response.text())
  .then(data => {
      if (data === "success") {
          alert('Login successful!');
          window.location.href = 'index.html'; // Redirect to home page after successful login
      } else if (data.includes('Invalid password')) {
          alert('Invalid password!');
      } else if (data.includes('Invalid email')) {
          alert('Invalid email!');
      } else {
          alert('An unknown error occurred.');
      }
  })
  .catch(error => console.error('Error:', error));
});
