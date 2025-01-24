const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
let mongoConnection = null;

const connectToMongo = async () => {
  if (!mongoConnection) {
    mongoConnection = mongoose
      .connect(MONGO_URI)
      .then((mongoConnection) => {
        console.log("Connected to mongo with connection pooling");
        return mongoConnection;
      })
      .catch((e) => {
        console.log("Error connecting mongo", e);
        mongoConnection = null;
        throw e;
      });
  }
  return mongoConnection;
};

module.exports = {
  connectToMongo,
  mongoConnection,
};
