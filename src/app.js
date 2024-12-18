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

app.get("/all-users", async (req, res) => {
  const users = await User.find();
  res.render("allUsers", { users });
});

app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  const newUSer = await User.create({
    name,
    email,
    image,
  });
  res.redirect("/all-users");
});

app.get("/delete/:id", async (req, res) => {
  const deleteUser = await User.findOneAndDelete({ _id: req.params.id });
  res.redirect("/all-users");
});


export default app;
