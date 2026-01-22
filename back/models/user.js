import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    account: {
      type: String,
      required: [true, "帳號必填"],
      minlength: [4, "帳號最少4個字"],
      unique: true,
      trim: true,
      validate: {
        validator(value) {
          return validator.isAlphanumeric(value);
        },
        message: "帳號需為英數字",
      },
    },
    password: {
      type: String,
      required: [true, "密碼必填"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    tokens: {
      type: [String],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    let message = "";
    if (user.password.length < 4) {
      message = "密碼最少4個字";
    } else if (!validator.isAlphanumeric(user.password)) {
      message = "密碼需為英數字";
    }
    if (message) {
      const error = new Error.ValidationError();
      error.addError("password", new Error.ValidatorError({ message }));
      throw error;
    }

    user.password = await bcrypt.hash(user.password, 10);
  }

  if (user.isModified("tokens") && user.tokens.length > 10) {
    user.tokens.shift();
  }
});

export default model("Users", schema);
