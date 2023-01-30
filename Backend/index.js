const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv/config");

const app = express();

app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: process.env.COOKIE_NAME,
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    sameSite : 'none'
  })
);

const db = require("./api/models");

db.mongoose.set('strictQuery', false);
db.mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require('./api/routes/auth.routes')(app);
const clientRouter = require("./api/routes/client.routes");
const atelierRouter = require("./api/routes/atelier.routes");
const financeRouter = require("./api/routes/finance.routes");
const voitureRouter = require("./api/routes/voiture.routes");
const composantRouter = require("./api/routes/composant.routes");

app.use("/client", clientRouter);
app.use("/atelier", atelierRouter);
app.use("/finance", financeRouter);
app.use("/voiture", voitureRouter);
app.use("/composant", composantRouter);

app.get("/", (req, resp) => {
  resp.send("gg");
});

app.listen();