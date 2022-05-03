// Получение рандомного элемента из массива

export function getRandomItem(arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
}

// Получение рандомного числа

export function getRandomNumber (minValue, maxValue) {
  if (minValue < 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

// Получение рандоиного числа с плавающей точкой

export function getRandomValue (minValue, maxValue, range) {
  if (minValue <= 0) {
    throw new Error('Укажите минимальное значение больше 0');
  }

  const rundomNumber = Math.random() * (maxValue - minValue + 1) + minValue;
  return Number(rundomNumber.toFixed(range));
}

// console.log('sdkfslkflsk');