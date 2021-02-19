export const generateTimeLeft = (todo) => {
  if (todo.timeLeft === undefined) {
    if (todo.duration) {
      return Number(todo.duration) * 60000;
    } else {
      null;
    }
  } else {
    return todo.timeLeft;
  }
};

export const findAndSliceTodos = (activeTodos, todo) => {
  const idx = activeTodos.indexOf(todo.id);
  return activeTodos.slice(0, idx).concat(activeTodos.slice(idx + 1));
};

export const timeConvert = (num) => {
  if (num <= 0) return "Time Up!";
  let hours = Math.floor(num / 60000);
  let newHours: string | number = hours;
  if (hours < 10) {
    newHours = `0${hours.toString()}`;
  }
  let minutes = (num % 60000) / 1000;
  let newMinutes: string | number = minutes;
  if (minutes < 10) {
    newMinutes = `0${minutes.toString()}`;
  }
  return `${newHours}:${newMinutes}`;
};
