let registration = null;
try { registration = JSON.parse(sessionStorage.getItem('codingConfRegistration')); } catch (error) { registration = null; }
if (!registration || !registration.name || !registration.github || !registration.avatar) {
  window.location.replace('index.html');
} else {
  document.querySelector('#greeting-name').textContent = registration.name;
  document.querySelector('#ticket-name').textContent = registration.name;
  document.querySelector('#ticket-avatar').src = registration.avatar;
  document.querySelector('#ticket-github').textContent = registration.github;
  document.querySelector('#ticket-github').href = 'https://github.com/' + encodeURIComponent(registration.github.slice(1));
  document.querySelector('#ticket-serial').textContent = registration.serial;
}
