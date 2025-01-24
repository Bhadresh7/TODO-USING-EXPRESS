const express = require("express");
const port = process.env.PORT || 8000;
const router = require("./src/routes/route");
const { verfiyUser } = require("./src/middleware/auth");
const {
  connectToMongo,
  mongoConnection,
} = require("./src/helpers/database-connection");

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(async (_, res, next) => {
  try {
    // if (!mongoConnection) {
    //   console.log("Establishing connection to mongo");
    //   await connectToMongo();
    // }
    if (mongoConnection) return;
    console.log("Establishing connection to MONGO");
    await connectToMongo();
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (_, res) => {
  res.send("hello there");
});
app.use("/api/todo", verfiyUser, router);

app.listen(port, () => console.log(`Server started on ${port}`));
