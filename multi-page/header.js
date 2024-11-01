const HEADER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/multi-page/login/', label: 'Login' },
  { href: '/multi-page/about/', label: 'About' },
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
