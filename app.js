var express = require('express');
var axios = require('axios');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 80;

app.all('/*', function (req, res) {
   console.log("-------------- New Request --------------");
   console.log("Headers:"+ JSON.stringify(req.headers, null, 3));
   console.log("Body:"+ JSON.stringify(req.body, null, 3));

   // Check if request is coming from pricealerts.tradingview.com
   if (req.headers.referer && req.headers.referer.startsWith("https://pricealerts.tradingview.com")) {
       // Make a GET request to Google.com
       axios.get('http://api.callmebot.com/start.php?source=web&user=+905302189431&text=tradingviewebak&lang=en-US')
       .then(response => {
           console.log("GET request to Google.com successful");
       })
       .catch(error => {
           console.error("Error making GET request to Google.com:", error);
       });
   } else {
       console.log("Request not from pricealerts.tradingview.com, skipping processing.");
   }

   res.json({ message: "Thank you for the message" });
});

app.listen(port, function () {
   console.log(`Example app listening at ${port}`);
});
