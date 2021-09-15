const timer = deadline => {
  const timerBlock = document.querySelectorAll('.countdown');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor((timeRemaining / 60 / 60) % 24),
          days = Math.floor(timeRemaining / 60 / 60 / 24);
    return {timeRemaining, days, hours, minutes, seconds};
  };

  const updateClock = () => {
    const timer = getTimeRemaining();
    if (timer.timeRemaining > 0) {
      timerBlock.forEach(item => {
        const daysElem = item.querySelector('.count_1 span'),
              hoursElem = item.querySelector('.count_2 span'),
              minutesElem = item.querySelector('.count_3 span'),
              secondsElem = item.querySelector('.count_4 span');

        daysElem.textContent = timer.days < 10 ? `0${timer.days}` : timer.days;
        hoursElem.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
        minutesElem.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
        secondsElem.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
      });
    }
  };
  updateClock();
  setInterval(updateClock, 1000);
};

export default timer;
