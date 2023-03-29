

// // Stopwatch object
// const stopwatch = {
//     startTime: null,
//     elapsedTime: 0,
//     timerId: null,
  
//     // Start the stopwatch
//     start: function() {
//       if (!this.startTime) {
//         this.startTime = Date.now() - this.elapsedTime;
//       }
  
//       this.timerId = setInterval(() => {
//         this.elapsedTime = Date.now() - this.startTime;
//         this.updateDisplay();
//       }, 10);
//     },
  
//     // Stop the stopwatch
//     stop: function() {
//       clearInterval(this.timerId);
//       this.timerId = null;
//     },
  
//     // Reset the stopwatch
//     reset: function() {
//       this.stop();
//       this.startTime = null;
//       this.elapsedTime = 0;
//       this.updateDisplay();
//     },
  
//     // Update the stopwatch display
//     updateDisplay: function() {
//       const ms = this.elapsedTime % 1000;
//       const sec = Math.floor(this.elapsedTime / 1000) % 60;
//       const min = Math.floor(this.elapsedTime / 60000) % 60;
//       const hours = Math.floor(this.elapsedTime / 3600000);
  
//       const displayText = `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
//       document.querySelector('.display').textContent = displayText;
//     }
//   };
  
//   // Event listeners for buttons
//   document.querySelector('.start').addEventListener('click', () => {
//     stopwatch.start();
//   });
  
//   document.querySelector('.stop').addEventListener('click', () => {
//     stopwatch.stop();
//   });
  
//   document.querySelector('.reset').addEventListener('click', () => {
//     stopwatch.reset();
//   });