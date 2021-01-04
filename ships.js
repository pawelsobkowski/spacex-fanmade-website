const getHash = (el) => el.href.split('#')[1];

const getElFromHash = (hash) =>
  [...document.querySelectorAll('.nav__list__element > a')].filter((el) => getHash(el) === hash);

const changeActiveLink = (activeEl) => {
  li = document.querySelectorAll('.nav__list__element');
  li.forEach((el) => el.classList.remove('nav__list__element--active'));
  activeEl.parentNode.classList.add('nav__list__element--active');
};

const setCurrentViewData = (rockets, hash) => {
  const [rocket] = rockets.filter((r) => r.name.replace(/\s/g, '').toLowerCase() === hash);

  console.log(rocket);

  const title = document.querySelector('.section__title');
  const status = document.querySelector('.section__subtitle > span');
  const desc = document.querySelector('.section__description');
  const height = document.querySelector('.overview__list__element__value--height');
  const diameter = document.querySelector('.overview__list__element__value--diameter');
  const mass = document.querySelector('.overview__list__element__value--mass');
  const leo = document.querySelector('.overview__list__element__value--leo');
  const stages = document.querySelector('.overview__list__element__value--stages');
  const firstflight = document.querySelector('.overview__list__element__value--firstflight');

  title.innerText = rocket.name;
  status.innerText = rocket.status ? 'active' : 'inactive';
  desc.innerText = rocket.description;
  height.innerText = `${rocket.height.meters} m`;
  diameter.innerText = `${rocket.diameter.meters} m`;
  mass.innerText = `${rocket.mass.kg} kg`;
  leo.innerText = `${rocket.payload_weights[0].kg} kg`;
  stages.innerText = rocket.stages;
  firstflight.innerText = rocket.first_flight;
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
