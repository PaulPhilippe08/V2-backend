import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://paulphilippe:PaulPhilippe08@cluster0.ao00o.mongodb.net/projet-final"
    )
    .then(() => console.log("DB Connected "));
};
