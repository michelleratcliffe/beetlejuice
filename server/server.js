// server.js
// import our packages
import express, { response } from "express"; //make express api
import cors from "cors"; //request endpoint from client = its the bridge that connects the server and client for resource sharing
import pg from "pg"; // connects to the db
import dotenv from "dotenv"; //hide secrets

// setup the server
const app = express(); //the app is the express app
app.use(cors()); //connect to the client
app.use(express.json()); //so we can accept info in the body of our request
dotenv.config();

// connect to our database
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

//home route/endpoint
app.get("/", (req, res) => {
  //request && result
  res.send("You are looking at my root route. How roude."); //white screen
  //res.json      black screen
});

//quotes endpoint
app.get("/quotes", async (req, res) => {
  const quotes = await db.query("SELECT * FROM quotes"); //direct sql call to db
  res.json(quotes.rows);
});

//post is for insertion
app.post("/quotes", async (req, res) => {
  console.log(request.body);
  //get teh bits of info from request that we ned
  const who = req.body.who;
  const what = req.body.what;

  const newQuote = await db.query(
    "INSERT INTO quotes (who, what) VALUES (who, what)", //insert into db
    [who, what] //sanitising the data in case there is something dodgy like bobby droptables
  );
  //send back response from the db
  res.json(newQuote.rows[0]); //starting the rows from zero... wipe... reset


});



app.listen(8080, function () {
  console.log(`Server is running on port 8080`);
});
