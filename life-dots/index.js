const genderSelect = document.getElementById('gender');
const ageInput = document.getElementById('age');
const environment = document.getElementById('dots');
const retirementInput = document.getElementById('retirement');
const textOutput = document.getElementById('text-output');

genderSelect.value = "";
ageInput.value = "";
retirementInput.value = "";

const debounce = (fn, timeout = 250) => {
  let to = null;
  return (...args) => {
    clearTimeout(to);
    to = setTimeout(() => fn.call(this, ...args), timeout);
  }
}

let gender;
let age;
let retirement;

const render = () => {
  environment.innerHTML = "";
  if (!gender || age === undefined || retirement === undefined) {
    return;
  }

  const active = retirement - age;
  const retired = expectancy[gender][age] - active;

  const dotsGone = age * 52;
  const dotsActive = Math.ceil(active * 52);
  const dotsRetired = Math.ceil(retired * 52);
  const life = Math.floor(parseFloat(age) + expectancy[gender][age]);

  textOutput.innerText = `As a ${age} years old ${gender}, you are expected to live until ${life}.\n You lived ${dotsGone} weeks. If you retire at ${retirement} you will still have to work ${dotsActive} weeks, and will enjoy an expected ${dotsRetired} weeks retired.`;

  for (let x = 0; x < dotsGone; x++) {
    const dot = document.createElement('i');
    dot.classList.add('dot');
    dot.classList.add('dot-gone');
    environment.appendChild(dot);
  }
  for (let x = 0; x < dotsActive; x++) {
    const dot = document.createElement('i');
    dot.classList.add('dot');
    dot.classList.add('dot-active');
    environment.appendChild(dot);
  }

  for (let x = 0; x < dotsRetired; x++) {
    const dot = document.createElement('i');
    dot.classList.add('dot');
    dot.classList.add('dot-retired');
    environment.appendChild(dot);
  }
};

genderSelect.addEventListener("change", ({target}) => {
  gender = target.value;
  render();
})

ageInput.addEventListener("input", debounce(({target}) => {
  age = target.value;
  render();
}));

retirementInput.addEventListener("input", debounce(({target}) => {
  retirement = target.value;
  render();
}));

render();