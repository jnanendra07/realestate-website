import React, { useEffect, useState } from 'react';

const Countdown = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const endDate = new Date('2023-12-31T00:00:00'); // Replace with your end date

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTime({
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
      } else {
        const hours = padZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = padZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = padZero(Math.floor((distance % (1000 * 60)) / 1000));

        setTime({
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const padZero = (num) => (num < 10 ? '0' : '') + num;

  return (
    <div>
      <div>{time.hours}</div>
      <div>{time.minutes}</div>
      <div>{time.seconds}</div>
    </div>
  );
};

export default Countdown;
