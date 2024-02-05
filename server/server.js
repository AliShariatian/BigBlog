import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import "dotenv/config";

// import schema
import User from "./Schema/User.js";

// ///////////////////////////////////////////////////////////////////

const PORT = 3000;

const FULLNAME_LENGTH = 3;
const PASSWORD_SALT = 10;

// regex
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// ///////////////////////////////////////////////////////////////////

const server = express();
server.use(express.json());

// connection to database
mongoose.connect(process.env.DATABASE_URL, { autoIndex: true });

// ///////////////////////////////////////////////////////////////////

// format data for send to frontend
const formatDataToSend = (user) => {
   const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

   return {
      access_token,
      username: user.personal_info.username,
      fullName: user.personal_info.fullName,
      profile_img: user.personal_info.profile_img,
   };
};

// ///////////////////////////////////////////////////////////////////

// create username from email value
const generateUsername = async (email) => {
   let username = email.split("@")[0];

   // user1 => ali@gmail.com -> username: ali  /  user2 => ali@yahoo.com -> username: ali
   // check username unique or not unique; this return true or false value
   const isUsernameExists = await User.exists({ "personal_info.username": username }).then((result) => result);

   // generate secure URL-friendly unique ID.
   isUsernameExists ? (username += nanoid().substring(0, 5)) : "";

   return username;
};

// ///////////////////////////////////////////////////////////////////

// SIGN-UP handling
server.post("/signup", (req, res) => {
   const { fullName, email, password } = req.body;

   // validating the data that get from frontend

   // fullname check
   if (fullName.length < FULLNAME_LENGTH) {
      return res.status(403).json({ error: `FullName must be at least ${FULLNAME_LENGTH} letters long` });
   }

   // email check
   if (!email.length) {
      return res.status(403).json({ error: "Enter email" });
   }

   if (!EMAIL_REGEX.test(email)) {
      return res.status(403).json({ error: "Email is invalid" });
   }

   // password check
   if (!PASSWORD_REGEX.test(password)) {
      return res.status(403).json({ error: "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" });
   }

   // hashing password
   bcrypt.hash(password, PASSWORD_SALT, async (error, hashed_password) => {
      const username = await generateUsername(email);

      const user = new User({
         personal_info: { fullName, email, username, password: hashed_password },
      });

      // save user to database
      user
         .save()
         .then((u) => {
            // send user to frontend
            return res.status(200).json(formatDataToSend(u));
         })
         .catch((err) => {
            // if email already exists
            if (err.code == 11000) {
               return res.status(500).json({ error: "Email already exists" });
            }

            return res.status(500).json({ error: err.message });
         });
   });
});

// ///////////////////////////////////////////////////////////////////

// SIGN-IN handling
server.post("/signin", (req, res) => {
   const { email, password } = req.body;

   User.findOne({ "personal_info.email": email })
      .then((user) => {
         // if user email not exist
         if (!user) {
            return res.status(403).json({ error: "Email not found" });
         }

         bcrypt.compare(password, user.personal_info.password, (err, result) => {
            if (err) {
               return res.status(403).json({ error: "Error occurred while login, please try again" });
            }

            // if password is incorrect
            if (!result) {
               return res.status(403).json({ error: "Incorrect password" });
            } else {
               return res.status(200).json(formatDataToSend(user));
            }
         });
      })
      .catch((err) => {
         return res.status(500).json({ error: err.message });
      });
});

// ///////////////////////////////////////////////////////////////////

server.listen(PORT, () => {
   console.log("Hello Port -> ", PORT);
});
