
import express from 'express'
import { database } from '../db/conn.js'
import path from 'path'
import { fileURLToPath } from 'url';
// const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const adminRoutes = express.Router();

adminRoutes.route("/").get(async function(req, res) {
  const articulos = await database
    .collection("articulos")
    .find({})
    .toArray();
  res.sendFile(path.join(__dirname, '../static/admin/index.html'));
  // res.render("index.html")
});

export default adminRoutes
