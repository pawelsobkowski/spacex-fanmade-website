const getHash = (el) => el.href.split('#')[1];

const getElFromHash = (hash) =>
  [...document.querySelectorAll('.nav__list__element > a')].filter((el) => getHash(el) === hash);

const changeActiveLink = (activeEl) => {
  li = document.querySelectorAll('.nav__list__element');
  li.forEach((el) => el.classList.remove('nav__list__element--active'));
  activeEl.parentNode.classList.add('nav__list__element--active');
};

const setCurrentViewData = (rockets, hash) => {
  const rocket = rockets.filter((r) => r.name.replace(/\s/g, '').toLowerCase() === hash);
  console.log(rocket);
};

const changeView = (e, rockets) => {
  const hash = getHash(e.target);
  changeActiveLink(e.target);
  setCurrentViewData(rockets, hash);
};

const fetchRockets = () => fetch('https://api.spacexdata.com/v4/rockets');

document.addEventListener('DOMContentLoaded', async () => {
  let rockets;
  const links = document.querySelectorAll('.nav__list__element > a');
  const hash = window.location.hash.split('#')[1];
  changeActiveLink(getElFromHash(hash)[0]);
  try {
    const data = await fetchRockets();
    rockets = await data.json();
    setCurrentViewData(rockets, hash);
    console.log(rockets);
  } catch (e) {
    console.log(e);
  }

  links.forEach((el) => el.addEventListener('click', (e) => changeView(e, rockets)));
});
