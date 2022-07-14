require("dotenv").config();
const setup = require("./setup");
const express = require("express");
const app = express();

setup(app);
