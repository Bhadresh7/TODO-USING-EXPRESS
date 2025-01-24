const mongoose = require("mongoose");
const { DB_NAME } = require("../constants/constants");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

//always add index for frequently accessing fields
// schema.index({ email: 1 });

const UserModel = mongoose.connection.useDb(DB_NAME).model("user", schema);

module.exports = UserModel;
