// Add a new command for copying the time
let copyTime = vscode.commands.registerCommand(
  "time-keeper.copyTime",
  function () {
    // Format the current time
    let currentTimeFormatted = formatTime(hours, minutes, seconds);

    // Copy the current time to the clipboard
    vscode.env.clipboard.writeText(currentTimeFormatted).then(
      () => {
        vscode.window.showInformationMessage(
          "Current time copied to clipboard!"
        );
      },
      (error) => {
        vscode.window.showErrorMessage("Failed to copy time to clipboard.");
        console.error(error);
      }
    );
  }
);

// ... (keep the existing code)

// Modify the existing saveReset function to use the new formatTime function
let saveReset = vscode.commands.registerCommand(
  "time-keeper.saveReset",
  function () {
    // ... (keep the existing code)

    // Modify the following lines to use the new formatTime function
    let savedTime = formatTime(hours, minutes, seconds);
    console.log(`Saved time is: ${savedTime} (HH:MM:SS)`);

    // ... (keep the existing code)
  }
);

// Add a new helper function to format the time (HH:MM:SS)
function formatTime(hours, minutes, seconds) {
  let formattedHours = hours <= 9 ? `0${hours}` : `${hours}`;
  let formattedMinutes = minutes <= 9 ? `0${minutes}` : `${minutes}`;
  let formattedSeconds = seconds <= 9 ? `0${seconds}` : `${seconds}`;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// ... (keep the existing code)

// Add the new command to the subscriptions array
context.subscriptions.push(copyTime);

// Push the commands to the page
context.subscriptions.push(start, stop, saveReset, copyTime);
