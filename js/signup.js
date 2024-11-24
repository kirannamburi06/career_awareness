document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Form submitted'); // Debugging line to see if the form submit event is fired

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  const whatsapp = document.getElementById('whatsapp').value;
  const dob = document.getElementById('dob').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Password confirmation validation
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('mobile', mobile);
  formData.append('whatsapp', whatsapp);
  formData.append('dob', dob);
  formData.append('password', password);

  // Send data to the PHP backend
  fetch('php/signup.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text()) // Get the response as text
    .then((data) => {
      console.log(data); // Log server response
      alert(data); // Display success or error message from the server
      if (data.includes('success')) {
        window.location.href = 'login.html'; // Redirect to login page after successful signup
      }
    })
    .catch((error) => {
      console.error('Error:', error); // Log any errors that occur
    });
});
