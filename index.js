const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");

const connectDatabase = require("./config/DbConnection");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.use(bodyParser.json());
app.use(session({ secret: process.env.COOKIE_SECRET }));

dotenv.config();

// function call to connect to the mongo database
connectDatabase();

app.get("/", (request, response) => {
  response.status(200).send("Hello..! This is just to test.");
});

app.post(
  "/push_notifications_from_message_queue",
  async (request, response) => {
    // const messageRequestBody = request.body;

    // let twiml = new Twilio.twiml.MessagingResponse();
    // // response to the user in thw whats app bot
    // result.forEach((message) => {
    //   twiml.message(message);
    // });

    // response.end(twiml.toString());

    response.send("Hello..! This is just to test.");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
