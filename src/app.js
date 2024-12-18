import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import User from "./models/user.js";

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("create");
});

app.get("/create", async (req, res) => {
  const newUSer = await User.create({
    name: "Mehadi",
    email: "mea@gmail.com",
    password: "1234",
  });
  res.send(newUSer);
});

app.get("/update", async (req, res) => {
  let updateUser = await User.findOneAndUpdate(
    { name: "Mehadi" },
    { email: "mehadi@gmail.com" },
    { new: true }
  );
  res.send(updateUser);
});

export default app;
