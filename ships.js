const getHash = (el) => el.href.split('#')[1];

const getElFromHash = (hash) =>
  [...document.querySelectorAll('.nav__list__element > a')].filter((el) => getHash(el) === hash);

const changeActiveLink = (activeEl) => {
  li = document.querySelectorAll('.nav__list__element');
  li.forEach((el) => el.classList.remove('nav__list__element--active'));
  activeEl.parentNode.classList.add('nav__list__element--active');
};

const setCurrentViewData = (rockets, launches, hash) => {
  const [rocket] = rockets.filter((r) => r.name.replace(/\s/g, '').toLowerCase() === hash);

  //setting rockets
  const title = document.querySelector('.section__title');
  const status = document.querySelector('.section__subtitle > span');
  const desc = document.querySelector('.section__description');
  const height = document.querySelector('.overview__list__element__value--height');
  const diameter = document.querySelector('.overview__list__element__value--diameter');
  const mass = document.querySelector('.overview__list__element__value--mass');
  const leo = document.querySelector('.overview__list__element__value--leo');
  const stages = document.querySelector('.overview__list__element__value--stages');
  const firstflight = document.querySelector('.overview__list__element__value--firstflight');
  const section = document.querySelectorAll('.section')[0];

  title.innerText = rocket.name;
  status.innerText = rocket.status ? 'active' : 'inactive';
  desc.innerText = rocket.description;
  height.innerText = `${rocket.height.meters} m`;
  diameter.innerText = `${rocket.diameter.meters} m`;
  mass.innerText = `${rocket.mass.kg} kg`;
  leo.innerText = `${rocket.payload_weights[0].kg} kg`;
  stages.innerText = rocket.stages;
  firstflight.innerText = rocket.first_flight;

  section.style.background = `url(${rocket.flickr_images[1]}) no-repeat center`;
  section.style.backgroundSize = 'cover';

  //setting launches
  const tbody = document.querySelector('.table__data');
  tbody.innerHTML = '';

  const rocketLaunches = launches.filter((el) => el.rocket === rocket.id);

  if (rocketLaunches.length <= 0) {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    const cell = document.createElement('td');
    cell.classList.add('table__cell');
    cell.innerText = 'No data to display';
    cell.colSpan = 4;

    row.appendChild(cell);
    tbody.appendChild(row);

    return;
  }

  rocketLaunches.forEach((el, i) => {
    if (i >= 7) return;
    const row = document.createElement('tr');
    row.classList.add('table__row');

    const cell_patch = document.createElement('td');
    const cell_name = document.createElement('td');
    const cell_date = document.createElement('td');
    const cell_success = document.createElement('td');

    const img = document.createElement('img');
    img.classList.add('table__cell__img');
    img.alt = `${el.name} mission patch`;
    img.src = el.links.patch.small;

    cell_patch.classList.add('table__cell');
    cell_name.classList.add('table__cell');
    cell_date.classList.add('table__cell');
    cell_success.classList.add('table__cell');

    const splitedDate = el.date_utc.split('T');
    const date = `${splitedDate[0]} ${splitedDate[1].split(':')[0]}:${
      splitedDate[1].split(':')[1]
    } UTC`;

    cell_patch.appendChild(img);
    cell_name.innerText = el.name;
    cell_date.innerText = date;
    cell_success.innerText = el.success;

    row.appendChild(cell_patch);
    row.appendChild(cell_name);
    row.appendChild(cell_date);
    row.appendChild(cell_success);

    tbody.appendChild(row);
  });
};

//fired when view is change
const changeView = (e, rockets, launches) => {
  const hash = getHash(e.target);
  changeActiveLink(e.target);
  setCurrentViewData(rockets, launches, hash);
};

//fetching functions
const fetchRockets = () => fetch('https://api.spacexdata.com/v4/rockets');
const fetchLaunches = () =>
  fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {},
      options: {
        select: ['name', 'links.patch.small', 'rocket', 'success', 'date_utc'],
        limit: 127,
      },
    }),
  });

//main
document.addEventListener('DOMContentLoaded', async () => {
  let rockets, launches;
  const links = document.querySelectorAll('.nav__list__element > a');
  const hash = window.location.hash.split('#')[1];
  changeActiveLink(getElFromHash(hash)[0]);
  try {
    const data = await fetchRockets();
    rockets = await data.json();

    const launches_data = await fetchLaunches();
    launches = await launches_data.json();

    setCurrentViewData(rockets, launches.docs, hash);
  } catch (e) {
    console.log(e);
  }

  links.forEach((el) => el.addEventListener('click', (e) => changeView(e, rockets, launches.docs)));
});
