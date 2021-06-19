const refs = {
  counter: document.querySelector("#timer-1"),
  days: document.querySelector("[data-value=days]"),
  hours: document.querySelector("[data-value=hours]"),
  mins: document.querySelector("[data-value=mins]"),
  secs: document.querySelector("[data-value=secs]"),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.onTick = onTick;
    this.targetDate = targetDate;
    this.selector = selector;
    this.start();
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021 23:59:59"),
  onTick: updateClockFace,
});
console.log(timer);

function pad(value) {
  return String(value).padStart(2, "0");
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { days, hours, mins, secs };
}

function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `:${hours}`;
  refs.mins.textContent = `:${mins}`;
  refs.secs.textContent = `:${secs}`;
}
