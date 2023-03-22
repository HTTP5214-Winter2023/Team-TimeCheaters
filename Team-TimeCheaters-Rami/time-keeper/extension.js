// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let seconds= 0;
	let minutes= 0;
	let hours = 0;
	let Interval = null;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"time-keeper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	//Function starts the timer function, this is displayed in the bottom left of the page
	let start = vscode.commands.registerCommand("time-keeper.start",function(){
		// comment to show timer has begun
		vscode.window.showInformationMessage("Time started");
		//ensure that the interval is cleared 
		clearInterval(Interval);
		// startTimer is defined below - it starts the timer and displays it in the correct format and location
		Interval = setInterval(startTimer, 1000);
	})
	// Pause
	let stop = vscode.commands.registerCommand("time-keeper.stop",function(){
		// comment to show timer has stopped
		vscode.window.showInformationMessage("Time stopped");
		//Clear the interval to stop/pause the timer 
		clearInterval(Interval);
	})

	function startTimer(){
		//Timing definition for seconds
		seconds++;
		if(seconds <= 9){
		  vscode.window.setStatusBarMessage("0"+hours + ":0"+minutes+":0"+ seconds);
		}
		if (seconds > 9){
			vscode.window.setStatusBarMessage("0"+hours + ":0"+minutes+":" + seconds);
		} 
		//Definition for minutes 
		if (seconds >= 59) {
		  minutes++;
		  vscode.window.setStatusBarMessage("0"+hours +":0"+minutes+":" + seconds);
		  seconds = 0;
		  vscode.window.setStatusBarMessage("0"+hours +":0"+minutes+":0" + seconds);
		}
		if (minutes > 9){
			vscode.window.setStatusBarMessage("0"+hours +":"+minutes+":" + seconds);
		}
		//Definition for hours
		if(minutes>= 59){
			hours++;
			vscode.window.setStatusBarMessage("0"+hours+":"+minutes+":" + seconds);
			minutes = 0;
			vscode.window.setStatusBarMessage("0" + hours+":"+minutes+":" + seconds);
		}
		if(hours > 9) {
			vscode.window.setStatusBarMessage(hours+":0"+minutes+":" + seconds);
		}
	  }

		  // Add a new command for copying the time
			let copyTime = vscode.commands.registerCommand("time-keeper.copyTime", function () {
				// Format the current time
				let currentTimeFormatted = formatTime(hours, minutes, seconds);
		
				// Copy the current time to the clipboard
				vscode.env.clipboard.writeText(currentTimeFormatted).then(() => {
					vscode.window.showInformationMessage("Current time copied to clipboard!");
				}, (error) => {
					vscode.window.showErrorMessage("Failed to copy time to clipboard.");
					console.error(error);
				});
			});
		
			// ... (keep the existing code)
		
			// Modify the existing saveReset function to use the new formatTime function
			let saveReset = vscode.commands.registerCommand("time-keeper.saveReset", function () {
			  // ... (keep the existing code)

			  // Modify the following lines to use the new formatTime function
			  let savedTime = formatTime(hours, minutes, seconds);
			  console.log(`Saved time is: ${savedTime} (HH:MM:SS)`);

 			 // ... (keep the existing code)
			});
		
			// Add a new helper function to format the time (HH:MM:SS)
			function formatTime(hours, minutes, seconds) {
				let formattedHours = (hours <= 9) ? `0${hours}` : `${hours}`;
				let formattedMinutes = (minutes <= 9) ? `0${minutes}` : `${minutes}`;
				let formattedSeconds = (seconds <= 9) ? `0${seconds}` : `${seconds}`;
		
				return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
			}
		
			// ... (keep the existing code)
		
			// Add the new command to the subscriptions array
			context.subscriptions.push(copyTime);
	
	// Push the commands to the page
  context.subscriptions.push(start, stop, saveReset, copyTime);

}
		
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
