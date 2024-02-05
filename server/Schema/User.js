import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
   {
      personal_info: {
         fullName: {
            type: String,
            lowercase: true,
            required: true,
            minLength: [3, "Full Name must be 3 letters long"],
         },
         email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
         },
         password: String,
         username: {
            type: String,
            minLength: [3, "Username must be 3 letters long"],
            unique: true,
         },
         bio: {
            type: String,
            maxLength: [200, "Bio should not be more than 200"],
            default: "",
         },
         profile_img: {
            type: String,
            default: () => {
               return "/src/imgs/userProfile.jpg";
            },
         },
      },
      social_links: {
         youtube: {
            type: String,
            default: "",
         },
         instagram: {
            type: String,
            default: "",
         },
         facebook: {
            type: String,
            default: "",
         },
         twitter: {
            type: String,
            default: "",
         },
         github: {
            type: String,
            default: "",
         },
         website: {
            type: String,
            default: "",
         },
      },
      account_info: {
         total_posts: {
            type: Number,
            default: 0,
         },
         total_reads: {
            type: Number,
            default: 0,
         },
      },
      google_auth: {
         type: Boolean,
         default: false,
      },
      github_auth: {
         type: Boolean,
         default: false,
      },
      blogs: {
         type: [Schema.Types.ObjectId],
         ref: "blogs",
         default: [],
      },
   },
   {
      timestamps: {
         createdAt: "joinedAt",
      },
   }
);

export default mongoose.model("users", userSchema);
