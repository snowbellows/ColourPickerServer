let pickerConnection;
let colourString;
let userColours = {};

// p5js function
function setup() {
  createCanvas(windowWidth, windowHeight);
  connectSignalR();
}

// sets up SignalR connection to ColourPickerHub, attaches message handler and then starts connection
async function connectSignalR() {
  pickerConnection = new signalR.HubConnectionBuilder()
    .withUrl('/colourPickerHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();

  pickerConnection.on('ReceiveMessage', function (user, message) {
    // set current colour
    colourString = message;
    // add user and colour to object map or updates colour if user already exists
    userColours[user] = message;
  });
  try {
    await pickerConnection.start();
  } catch (err) {
    console.error(err.toString());
  }
}

// p5js function, called in a loop
function draw() {
  // may not have received message updating colour yet
  if (colourString) {
    fill(colourString);
    stroke(colourString);
  } else {
    noFill();
  }
  circle(50, 50, 30);

  // swatch colours next to user names
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
