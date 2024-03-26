var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 80;

app.post( '/*',function (req, res) {
   console.log("-------------- New TradingView Alert --------------");
   console.log("Headers: " + JSON.stringify(req.headers, null, 3));
   console.log("Body: " + JSON.stringify(req.body, null, 3));

   // Extract relevant information from the TradingView alert message
   var alertMessage = req.body.message;

   // Extract exchange, ticker, and closing price using regular expressions
   var match = alertMessage.match(/(.+?):(.+?),\s*price\s*=\s*(.+)/);
   if (match) {
       var ticker = match[1].trim();
       var closePrice = match[2].trim();

       // Do something with the extracted information, for example, log it
       console.log("Ticker: " + ticker);
       console.log("Closing Price: " + closePrice);
   } else {
       console.log("Failed to parse the TradingView alert message.");
   }

   // Respond to the TradingView alert
   res.json({ message: "Received TradingView alert" });
});

app.listen(port, function () {
   console.log(`Webhook listener for TradingView alerts listening at ${port}`);
});
