const crypto = require('crypto');
const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

app.use(express.json());

const server = createServer(app);
const wss = new WebSocket.Server({ server });




server.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});



// Sample API to show data to clients
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});


// Sample API to get data from clients
app.post('/api/data', (req, res) => {
  const { id } = req.body;
  console.log('Received data:',id);
  res.json({ received: true });

  
wss.on('connection', function(ws) {
  console.log("client joined.");

  // send "hello world" interval
  const textInterval = setInterval(() => ws.send("hello world!"), 500);

  // send random bytes interval
  // const binaryInterval = setInterval(() => ws.send(crypto.randomBytes(8).buffer), 110);

    ws.on('message', function(data) {
      // if (typeof(data) === "string") {
      //   // client sent a string
      //   console.log("string received from client -> '" + data + "'");

      // } else {
      //   console.log("binary received from client -> " + Array.from(data).join(", ") + "");
      // }
    });

    ws.on('close', function() {
      console.log("client left.");
      clearInterval(textInterval);
      clearInterval(binaryInterval);
    });
  });

});
