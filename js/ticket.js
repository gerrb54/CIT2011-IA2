// Read the registration saved by the form in this browser tab.
let registration = null;
// Invalid stored JSON is treated as missing registration data.
try { registration = JSON.parse(sessionStorage.getItem('codingConfRegistration')); } catch (error) { registration = null; }
// A direct visit without the required data returns the visitor to the home page.
if (!registration || !registration.name || !registration.github || !registration.avatar) {
  window.location.replace('index.html');
} else {
  // Insert attendee text using textContent and restore the uploaded avatar.
  document.querySelector('#greeting-name').textContent = registration.name;
  document.querySelector('#ticket-name').textContent = registration.name;
  document.querySelector('#ticket-avatar').src = registration.avatar;
  document.querySelector('#ticket-github').textContent = registration.github;
  // Remove the @ prefix and encode the username when building the profile link.
  document.querySelector('#ticket-github').href = 'https://github.com/' + encodeURIComponent(registration.github.slice(1));
  document.querySelector('#ticket-serial').textContent = registration.serial;
}
