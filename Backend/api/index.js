const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv/config");

const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    httpOnly: true
  })
);

const db = require("../app/models");

db.mongoose.set('strictQuery', false);
db.mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require('../app/routes/auth.routes')(app);
const clientRouter = require("../app/routes/client.routes");
const atelierRouter = require("../app/routes/atelier.routes");
const financeRouter = require("../app/routes/finance.routes");
const voitureRouter = require("../app/routes/voiture.routes");
const composantRouter = require("../app/routes/composant.routes");

app.use("/client", clientRouter);
app.use("/atelier", atelierRouter);
app.use("/finance", financeRouter);
app.use("/voiture", voitureRouter);
app.use("/composant", composantRouter);

app.get("/", (req, resp) => {
  resp.send("gg");
});

module.exports = app;