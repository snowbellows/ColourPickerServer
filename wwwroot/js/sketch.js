let pickerConnection;
let userString;
let colourString;

function setup() {
  createCanvas(windowWidth, windowHeight);
  connectSignalR();
}

async function connectSignalR() {
  pickerConnection = new signalR.HubConnectionBuilder()
    .withUrl('/colourPickerHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  pickerConnection.on('ReceiveMessage', function (user, message) {
    userString = user;
    colourString = message;
  });
  try {
    await pickerConnection.start();
  } catch (err) {
    console.error(err.toString());
  }
}

function draw() {
  if (colourString) {
    fill(colourString);
    stroke(colourString);
  } else {
    noFill();
  }
  circle(50, 50, 30);
}
