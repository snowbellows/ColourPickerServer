'use strict';

var connection = new signalR.HubConnectionBuilder()
  .withUrl('/chatHub')
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Disable the send button until connection is established.
document.getElementById('colourInput').disabled = true;

connection.on('ReceiveMessage', function (user, message) {
  var li = document.createElement('li');
  document.getElementById('messagesList').appendChild(li);
  // We can assign user-supplied strings to an element's textContent because it
  // is not interpreted as markup. If you're assigning in any other way, you
  // should be aware of possible script injection concerns.
  li.textContent = `${user} chose ${message}`;
});

connection
  .start()
  .then(function () {
    document.getElementById('colourInput').disabled = false;
  })
  .catch(function (err) {
    return console.error(err.toString());
  });

document
  .getElementById('colourInput')
  .addEventListener('change', function (event) {
    var user = document.getElementById('userInput').value;
    var message = document.getElementById('colourInput').value;

    connection.invoke('SendMessage', user, message).catch(function (err) {
      return console.error(err.toString());
    });
    event.preventDefault();
  });
