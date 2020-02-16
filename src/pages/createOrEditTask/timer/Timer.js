import React, { useState, useEffect } from 'react';
import ms from 'pretty-ms';
import { displayMsInFractionalHourFormat } from 'utils';
import './Timer.css';

//@TODO: Left off here. Something going on with the timer
const Timer = ({ children, time, setTime }) => {
  const [isActive, setIsActive] = useState(false);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setTime(0);
  }

  useEffect(() => {
    let interval;

    if (isActive) {
      let timeOffset = Date.now() - time;
      interval = setInterval(() => setTime(Date.now() - timeOffset), 25);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [isActive, time]);

  return (
    <div className="timer">
      <div className="timer__display">
        <div className="timer__display__content">
          {`${ms(time)} - hours: ${displayMsInFractionalHourFormat(time)}`}
        </div>

        <div className="timer__buttons">

          {time > 0 && <button className="timer__reset" onClick={reset}>
            reset
          </button>}

          {isActive &&
            (<button className="timer__stop" onClick={toggle}>
              stop
          </button>)}

          {time !== 0 && !isActive && (
            <button className="timer__resume" onClick={toggle}>
              resume
            </button>
          )}

          {time === 0 && !isActive &&
            (<button className="timer__start" onClick={toggle}>
              start
          </button>)}

          {children}

        </div>
      </div>
    </div>
  );
};



export default Timer;