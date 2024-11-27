// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const sql = require("mssql");
// const { convertKeysToLowerCase } = require("./utilities/commonutilities");
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sql from "mssql";
import { convertKeysToLowerCaseInArray, addIdToObjects } from "./utilities/commonutilities.js";

// Database Configuration
const config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM dbo.TestPWD WHERE Username = '${username}' AND Password = '${password}'`);
    if (result.recordset.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch Data Route
app.post("/getCrocsData", async (req, res) => {
  try {
    const { page, limit } = req.body;

    const startIndex = (page - 1) * limit
    const endIndex = (page) * limit

    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM  MiscData.dbo.pj_Crocs_Tran`);
    const arrResult = convertKeysToLowerCaseInArray(result.recordset);
    const arrWithId = addIdToObjects(arrResult);
    const newArr = arrWithId.slice(startIndex,endIndex)
    res.json([newArr]);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Server Start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
