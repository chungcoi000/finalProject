require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./router");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.options('*', cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use('/', router)
app.listen(process.env.PORT || "3000", () => {
  console.log("Server is running at port 3000");
});