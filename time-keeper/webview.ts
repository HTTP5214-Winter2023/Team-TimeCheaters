import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Define a command that will trigger the webview panel
  const commandId = 'time-keeper.showTimer';
  context.subscriptions.push(vscode.commands.registerCommand(commandId, () => {
    // Create and show the webview panel
    const panel = vscode.window.createWebviewPanel(
      'timeKeeper',
      'Time Keeper',
      vscode.ViewColumn.One,
      {}
    );

    // Load the webview panel's content
    panel.webview.html = getWebviewContent();

    // Handle messages sent from the webview panel
    panel.webview.onDidReceiveMessage(message => {
      switch (message.command) {
        case 'startTimer':
          // Start the timer
          break;
        case 'stopTimer':
          // Stop the timer
          break;
        case 'resetTimer':
          // Reset the timer
          break;
      }
    });
  }));
}

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Time Keeper</title>
    </head>
    <body>
      <h1>Time Keeper</h1>
      <button onclick="startTimer()">Start</button>
      <button onclick="stopTimer()">Stop</button>
      <button onclick="resetTimer()">Reset</button>
      <script>
        function startTimer() {
          vscode.postMessage({ command: 'startTimer' });
        }

        function stopTimer() {
          vscode.postMessage({ command: 'stopTimer' });
        }

        function resetTimer() {
          vscode.postMessage({ command: 'resetTimer' });
        }
      </script>
    </body>
    </html>
  `;
}