class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selector = selector;

    this.refs = {
      days: document.querySelector(`${selector} [data-value=days]`),
      hours: document.querySelector(`${selector} [data-value=hours]`),
      mins: document.querySelector(`${selector} [data-value=mins]`),
      secs: document.querySelector(`${selector} [data-value=secs]`),
    };

    this.start();
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.updateClockFace(time);
    }, 1000);
  }

  updateClockFace({ days, hours, mins, secs }) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `:${hours}`;
    this.refs.mins.textContent = `:${mins}`;
    this.refs.secs.textContent = `:${secs}`;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021 23:59:59"),
});
