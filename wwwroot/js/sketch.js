let pickerConnection;
let colourString;
let userColours = {};

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
    colourString = message;

    userColours[user] = message;
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

  Object.entries(userColours).forEach(([u, c], i) => {
    push();
    translate(50, 100 + 30 * i);
    fill(c);
    stroke(c);
    square(0, 0, 16);
    fill(0);
    noStroke();
    text(u, 24, 16);
    pop();
  });
}
