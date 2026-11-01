// Get the registration form and the fields that need validation.
const form = document.querySelector('#registration');
const fields = ['avatar', 'name', 'email', 'github'];
// Update both the visible error message and the input's accessibility state.
function showError(field, message) {
  document.querySelector('#' + field + '-error').textContent = message;
  document.querySelector('#' + field).setAttribute('aria-invalid', String(Boolean(message)));
}
// Clear a field's previous error when the user changes its value.
fields.forEach(id => document.querySelector('#' + id).addEventListener('input', () => showError(id, '')));
form.addEventListener('submit', event => {
  // Stay on this page until the custom validation checks pass.
  event.preventDefault();
  // Remove surrounding spaces before checking and saving the text values.
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const github = document.querySelector('#github').value.trim();
  const file = document.querySelector('#avatar').files[0];
  fields.forEach(id => showError(id, ''));
  let valid = true;
  // Require a name, an email-shaped address and a GitHub handle beginning with @.
  if (!name) { showError('name', 'Please enter your full name.'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Enter a valid email address (name@domain.com).'); valid = false; }
  if (!/^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(github)) { showError('github', 'Start with @ and enter a valid GitHub username.'); valid = false; }
  // Require a JPEG or PNG avatar smaller than 500 * 1024 bytes.
  if (!file) { showError('avatar', 'Please choose an avatar image.'); valid = false; }
  else if (!['image/jpeg', 'image/png'].includes(file.type)) { showError('avatar', 'Only JPEG or PNG images are allowed.'); valid = false; }
  else if (file.size >= 500 * 1024) { showError('avatar', 'Your image must be smaller than 500 KB.'); valid = false; }
  // Focus the first invalid field and stop before reading or saving the image.
  if (!valid) { const first = fields.find(id => document.querySelector('#' + id).getAttribute('aria-invalid') === 'true'); document.querySelector('#' + first).focus(); return; }
  // Read the avatar as a data URL so it can be carried to the ticket page.
  const reader = new FileReader();
  reader.onload = () => {
    // Save the attendee data with a random five-digit ticket serial.
    const registration = { name, email, github, avatar: reader.result, serial: '#' + String(Math.floor(10000 + Math.random() * 90000)) };
    // sessionStorage keeps the registration within this browser tab's session.
    try { sessionStorage.setItem('codingConfRegistration', JSON.stringify(registration)); window.location.href = 'ticket.html'; }
    // Storage may be unavailable or full; let the user try a smaller image.
    catch (error) { showError('avatar', 'Unable to save ticket. Please try a smaller image.'); }
  };
  // Show a useful message if the selected file cannot be read.
  reader.onerror = () => showError('avatar', 'Could not read your image. Please try again.');
  reader.readAsDataURL(file);
});
