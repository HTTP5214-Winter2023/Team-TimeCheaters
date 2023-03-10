// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let Interval = null;
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"time-keeper" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  //Function starts the timer function, this is displayed in the bottom left of the page
  let start = vscode.commands.registerCommand("time-keeper.start", function () {
    // comment to show timer has begun
    vscode.window.showInformationMessage("Time started");
    //ensure that the interval is cleared
    clearInterval(Interval);
    // startTimer is defined below - it starts the timer and displays it in the correct format and location
    Interval = setInterval(startTimer, 1000);
  });
  // Pause
  let stop = vscode.commands.registerCommand("time-keeper.stop", function () {
    // comment to show timer has stopped
    vscode.window.showInformationMessage("Time stopped");
    //Clear the interval to stop/pause the timer
    clearInterval(Interval);
  });

  //Function to Stop, Save, and Reset the timer
  let saveReset = vscode.commands.registerCommand(
    "time-keeper.saveReset",
    function () {
      //stops the timer
      clearInterval(Interval);

      //Saves the current time into an object
      let currentTime = {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
      console.log(currentTime);

      //Export saved timer
      //Export object time into formatted time
      let savedTimeSec = "";
      let savedTimeMin = "";
      let savedTimeHr = "";
      //Adds 0 in front of seconds if it is less than 10
      if (currentTime.seconds <= 9) {
        savedTimeSec = `0${currentTime.seconds}`;
      } else {
        savedTimeSec = `${currentTime.seconds}`;
      }
      //Adds 0 in front of minutes if it is less than 10
      if (currentTime.minutes <= 9) {
        savedTimeMin = `0${currentTime.minutes}`;
      } else {
        savedTimeMin = `${currentTime.minutes}`;
      }
      //Adds 0 in front of hours if it is less than 10
      if (currentTime.hours <= 9) {
        savedTimeHr = `0${currentTime.hours}`;
      } else {
        savedTimeHr = `${currentTime.hours}`;
      }
      //print in console a readable time
      let savedTime = `${savedTimeHr}:${savedTimeMin}:${savedTimeSec}`;
      console.log(`Saved time is: ${savedTime} (HH:MM:SS)`);
      //Notification that time was saved
      vscode.window.showInformationMessage(
        `Timer stopped at ${savedTime}. Timer saved and resetted to 00:00:00.`
      );

      //Clear timer once saved
      hours = 0;
      minutes = 0;
      seconds = 0;
      vscode.window.setStatusBarMessage(`0${hours}:0${minutes}:0${seconds}`);
    }
  );

  function startTimer() {
    //Timing definition for seconds
    seconds++;
    if (seconds <= 9) {
      vscode.window.setStatusBarMessage(
        "0" + hours + ":0" + minutes + ":0" + seconds
      );
    }
    if (seconds > 9) {
      vscode.window.setStatusBarMessage(
        "0" + hours + ":0" + minutes + ":" + seconds
      );
    }
    //Definition for minutes
    if (seconds >= 59) {
      minutes++;
      vscode.window.setStatusBarMessage(
        "0" + hours + ":0" + minutes + ":" + seconds
      );
      seconds = 0;
      vscode.window.setStatusBarMessage(
        "0" + hours + ":0" + minutes + ":0" + seconds
      );
    }
    if (minutes > 9) {
      vscode.window.setStatusBarMessage(
        "0" + hours + ":" + minutes + ":" + seconds
      );
    }
    //Definition for hours
    if (minutes >= 59) {
      hours++;
      vscode.window.setStatusBarMessage(
        "0" + hours + ":" + minutes + ":" + seconds
      );
      minutes = 0;
      vscode.window.setStatusBarMessage(
        "0" + hours + ":" + minutes + ":" + seconds
      );
    }
    if (hours > 9) {
      vscode.window.setStatusBarMessage(hours + ":0" + minutes + ":" + seconds);
    }
  }

  //Push the commands to the page
  context.subscriptions.push(start, stop, saveReset);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};


//This is a test message from Ellis 