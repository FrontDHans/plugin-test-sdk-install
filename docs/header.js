const BASE_URL = '/plugin-test-sdk-install/';

const HEADER_LINKS = [
  { href: BASE_URL, label: 'Home' },
  { href: BASE_URL + 'multi-page/login/', label: 'Login' },
  { href: BASE_URL + 'multi-page/about/', label: 'About' },
];

const links = HEADER_LINKS.map((link) => {
  const el = document.createElement('a');
  el.textContent = link.label;
  el.href = link.href;
  isActive = document.location.pathname === link.href;
  if (isActive) {
    el.classList.add('active');
  }
  return el;
});

const divContainer = document.createElement('div');
divContainer.classList.add('header');
links.forEach((link) => divContainer.appendChild(link));

const bodyEl = document.querySelector('body');
bodyEl.insertBefore(divContainer, bodyEl.firstChild);
