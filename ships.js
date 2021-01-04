const getHash = (el) => el.href.split('#')[1];

const getElFromHash = (hash, links) =>
  [...document.querySelectorAll('.nav__list__element > a')].filter((el) => getHash(el) === hash);

const changeActiveLink = (activeEl) => {
  li = document.querySelectorAll('.nav__list__element');
  li.forEach((el) => el.classList.remove('nav__list__element--active'));
  activeEl.parentNode.classList.add('nav__list__element--active');
};

const changeView = (e, links) => {
  const hash = getHash(e.target);
  changeActiveLink(e.target);
};

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav__list__element > a');
  const hash = window.location.hash.split('#')[1];
  changeActiveLink(getElFromHash(hash, links)[0]);

  links.forEach((el) => el.addEventListener('click', (e) => changeView(e, links)));
});
