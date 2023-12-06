// Implement a function that creates a resumable interval object.

function createResumableInterval(cb, delay) {

  let intervalId;
  let running = true;

  function run() {
    if (run) {
      cb();
      intervalId = setTimeout(run, delay);
    }
  }

  run();

  return {
    pause: () => {
      running = false;
      clearTimeout(intervalId)
    },

    resume: () => {
      if (!running) {
        running = true;
        run();
      }
    }
  }
}


const interval = createResumableInterval(() => {
  console.log('Start');
}, 1000);

setTimeout(() => {
  interval.pause(); // Pauses the interval after 5 seconds
  console.log('Paused');
}, 5000);

setTimeout(() => {
  interval.resume(); // Resumes the interval after another 2 seconds
  console.log('Resumed');
}, 7000);

setTimeout(() => {
  interval.pause(); // Pause the interval after another 5 seconds
  console.log('Paused');
}, 12000);