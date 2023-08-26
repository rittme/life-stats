const genderSelect = document.getElementById('gender');
const ageInput = document.getElementById('age');
const textOutput = document.getElementById('text-output');
const timeLeft = document.getElementById('time-left');
const genderTooltip = document.getElementById('gender-tooltip');
ageInput.value = '';

const emoji = {
  male: ['👶🏻', '👦🏻', '🧑🏻', '🧔🏻‍♂️', '👨🏻', '👴🏻', '👻'],
  female: ['👶🏻', '👧🏻', '👩🏻', '👩🏻', '👩🏻', '👵🏻', '👻'],
};

function getEmoji(gender, age) {
  if (age === undefined) {
    return emoji[gender][3];
  }
  let index = 0;
  if (age >= expectancy[gender].length) {
    index = 6;
  } else if (age >= 60) {
    index = 5;
  } else if (age >= 40) {
    index = 4;
  } else if (age >= 20) {
    index = 3;
  } else if (age >= 12) {
    index = 2;
  } else if (age >= 5) {
    index = 1;
  }

  return emoji[gender][index];
}

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
  genderSelect.innerHTML = getEmoji(gender, age);
  console.log(age);
  if (!gender || age === undefined) {
    textOutput.innerText = '';
    timeLeft.style.height = `${0}vh`;
    return;
  }

  if (age >= expectancy[gender].length) {
    textOutput.innerText = 'Sorry...';
    timeLeft.style.height = `0vh`;
    return;
  }

  const left = expectancy[gender][age];
  const height = (left * 100) / (left + age);
  timeLeft.style.height = `${height}vh`;
  textOutput.innerText = `Around ${Math.round(left)} years left`;
};

function removeGenderTooltip() {
  genderTooltip.style.opacity = 0;
  setTimeout(() => genderTooltip.remove(), 200);
}

genderSelect.addEventListener('click', () => {
  if (gender === 'male') {
    gender = 'female';
  } else {
    gender = 'male';
  }
  removeGenderTooltip();
  render();
});

ageInput.addEventListener('input', ({ target }) => {
  if (!target.value) {
    age = undefined;
    render();
    return;
  }
  target.value = target.value.replace(/[^0-9]/g, '');
  let numAge = Number(target.value);
  // if (numAge >= expectancy[gender].length) {
  //   numAge = expectancy[gender].length - 1;
  //   target.value = numAge;
  // }
  age = Number(numAge);
  debounce(() => {
    render();
    removeGenderTooltip();
  })();
});

render();