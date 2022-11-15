
import express from 'express'
import { database } from '../db/conn.js'
const CarritoRoutes = express.Router();

CarritoRoutes.route("/articulos").get(async function(req, res) {
  const articulos = await database
    .collection("articulos")
    .find({})
    .toArray();
  res.send(articulos)
});

CarritoRoutes.route("/articulos").post(async function(req, res) {
  console.log(req.body)
  console.log(req.body)
  const result = await database.collection("articulos").insertMany([req.body])
  if (result.acknowledged) {
    res.json({ requestBody: req.body })
  }
  else {
    res.json({ message: "something wrong" })
  }
});
export default CarritoRoutes
