const form = document.querySelector('#registration');
const fields = ['avatar', 'name', 'email', 'github'];
function showError(field, message) {
  document.querySelector('#' + field + '-error').textContent = message;
  document.querySelector('#' + field).setAttribute('aria-invalid', String(Boolean(message)));
}
fields.forEach(id => document.querySelector('#' + id).addEventListener('input', () => showError(id, '')));
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const github = document.querySelector('#github').value.trim();
  const file = document.querySelector('#avatar').files[0];
  fields.forEach(id => showError(id, ''));
  let valid = true;
  if (!name) { showError('name', 'Please enter your full name.'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Enter a valid email address (name@domain.com).'); valid = false; }
  if (!/^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(github)) { showError('github', 'Start with @ and enter a valid GitHub username.'); valid = false; }
  if (!file) { showError('avatar', 'Please choose an avatar image.'); valid = false; }
  else if (!['image/jpeg', 'image/png'].includes(file.type)) { showError('avatar', 'Only JPEG or PNG images are allowed.'); valid = false; }
  else if (file.size >= 500 * 1024) { showError('avatar', 'Your image must be smaller than 500 KB.'); valid = false; }
  if (!valid) { const first = fields.find(id => document.querySelector('#' + id).getAttribute('aria-invalid') === 'true'); document.querySelector('#' + first).focus(); return; }
  const reader = new FileReader();
  reader.onload = () => {
    const registration = { name, email, github, avatar: reader.result, serial: '#' + String(Math.floor(10000 + Math.random() * 90000)) };
    try { sessionStorage.setItem('codingConfRegistration', JSON.stringify(registration)); window.location.href = 'ticket.html'; }
    catch (error) { showError('avatar', 'Unable to save ticket. Please try a smaller image.'); }
  };
  reader.onerror = () => showError('avatar', 'Could not read your image. Please try again.');
  reader.readAsDataURL(file);
});
