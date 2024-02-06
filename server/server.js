import express, { json } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import cors from "cors";
import aws from "aws-sdk";
import "dotenv/config";

// for auth with google
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "./big-blog-firebase-adminsdk.json" assert { type: "json" };

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
server.use(cors());

// connection to database
mongoose.connect(process.env.DATABASE_URL, { autoIndex: true });

// for auth with google
admin.initializeApp({
   credential: admin.credential.cert(serviceAccountKey),
});

// liara aws connection
const s3 = new aws.S3({
   region: "default",
   // endpoint: process.env.LIARA_ENDPOINT,
   accessKeyId: process.env.LIARA_ACCESS_KEY,
   secretAccessKey: process.env.LIARA_SECRET_KEY,
});

const generateUploadUrl = async () => {
   const date = new Date();
   const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

   return await s3.getSignedUrlPromise("putObject", {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: imageName,
      Expires: 1000,
      ContentType: "image/jpeg",
   });
};

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
   if (!(typeof fullName == "undefined") && fullName.length < FULLNAME_LENGTH) {
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

         // if user not login with google
         if (!user.google_auth) {
            bcrypt.compare(password, user.personal_info.password, (err, result) => {
               if (err) {
                  return res.status(403).json({ error: "Error occurred while login!, please try again" });
               }

               // if password is incorrect
               if (!result) {
                  return res.status(403).json({ error: "Incorrect password" });
               } else {
                  return res.status(200).json(formatDataToSend(user));
               }
            });
         } else {
            return res.status(403).json({ error: "Account was created using google! try logging in with google." });
         }
      })
      .catch((err) => {
         return res.status(500).json({ error: err.message });
      });
});

// ///////////////////////////////////////////////////////////////////

// for auth with google
server.post("/google-auth", async (req, res) => {
   const { access_token } = req.body;

   getAuth()
      .verifyIdToken(access_token)
      .then(async (decodedUser) => {
         let { email, name, picture } = decodedUser;

         // change picture resolution
         picture = picture.replace("s96-c", "s384-c");

         let user = await User.findOne({
            "personal_info.email": email,
         })
            .select("personal_info.fullName personal_info.username personal_info.profile_img google_auth")
            .then((u) => {
               return u || null;
            })
            .catch((err) => {
               return res.status(500).json({ error: err.message });
            });

         if (user) {
            // signin
            if (!user.google_auth) {
               return res.status(403).json({ error: "This email was signed up without google. Please login with password to access the account." });
            }
         } else {
            // signup
            const username = await generateUsername(email);

            user = new User({
               personal_info: { fullName: name, email, username, profile_img: picture, google_auth: true },
            });

            // save user to database
            await user
               .save()
               .then((u) => {
                  user = u;
               })
               .catch((err) => {
                  return res.status(500).json({ error: err.message });
               });
         }

         return res.status(200).json(formatDataToSend(user));
      })
      .catch((err) => {
         return res.status(500).json({ error: "Failed to authenticate you with google! Try another way." });
      });
});

// ///////////////////////////////////////////////////////////////////

// UPLOAD image url
server.get("/get-upload-url", (req, res) => {
   generateUploadUrl()
      .then((url) => {
         return res.status(200).json({ uploadUrl: url });
      })
      .catch((err) => {
         console.log(err.message);
         return res.status(500).json({ error: err.message });
      });
});

// ///////////////////////////////////////////////////////////////////

server.listen(PORT, () => {
   console.log("Hello Port -> ", PORT);
});
