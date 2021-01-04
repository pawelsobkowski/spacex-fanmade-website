const getHash = (e) => e.target.href.split('#')[1];

const changeView = (e) => {
  const hash = getHash(e);
  console.log(hash);
};

document.addEventListener('DOMContentLoaded', (event) => {
  const hash = window.location.hash;

  const a = document.querySelectorAll('.nav__list__element > a');
  a.forEach((el) => el.addEventListener('click', changeView));
});
