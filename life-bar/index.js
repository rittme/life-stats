const genderSelect = document.getElementById('gender');
const ageInput = document.getElementById('age');
const textOutput = document.getElementById('text-output');
const timeLeft = document.getElementById('time-left');

ageInput.value = '';

const debounce = ((fn, timeout = 250) => {
  let to = null;
  return (...args) => {
    clearTimeout(to);
    to = setTimeout(() => fn.call(this, ...args), timeout);
  };
}).bind(this);

let gender = 'male';
let age;

const render = () => {
  if (!gender || age === undefined) {
    textOutput.innerText = '';
    timeLeft.style.height = `${0}vh`;
    return;
  }

  const left = expectancy[gender][age];
  // left + age - 100
  // left - x
  // x = left + 100 / (left + age)
  console.log(`${age}`);
  console.log(`${left}`);
  console.log(`${left} * 100`);
  console.log(`${left * 100} `);
  console.log(`${left + age}`);

  const height = (left * 100) / (left + age);
  timeLeft.style.height = `${height}vh`;
  console.log(height);
  // expectancy[gender][age] - 100
  // left - x

  // const dotsGone = age * 52;
  // const time = Math.ceil(left * 52);
  // const life = Math.floor(parseFloat(age) + expectancy[gender][age]);

  // textOutput.innerText = `As a ${age} years old ${gender}, you are expected to live until ${life}.\n You lived ${dotsGone} weeks. If you retire at ${retirement} you will still have to work ${dotsActive} weeks, and will enjoy an expected ${dotsRetired} weeks retired.`;
  textOutput.innerText = `Around ${Math.round(left)} years left`;
};

genderSelect.addEventListener('click', () => {
  console.log('ok');
  if (gender === 'male') {
    gender = 'female';
    genderSelect.innerHTML = '👩🏻';
  } else {
    gender = 'male';
    genderSelect.innerHTML = '👨🏻';
  }
  render();
});

ageInput.addEventListener('input', ({ target }) => {
  target.value = target.value.replace(/([^0-9.])/g, '');
  let numAge = Number(target.value);
  if (numAge >= expectancy[gender].length) {
    numAge = expectancy[gender].length - 1;
    target.value = numAge;
  }
  debounce(() => {
    age = Number(numAge);
    render();
  })();
});

render();