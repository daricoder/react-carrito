// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";
// Replace the uri string with your connection string.
const {database_name,database_port,database_host} = process.env
const uri = `mongodb://${database_host}:${database_port}`;
// const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let database;

console.log("databaseinfo", database_name)
async function run() {
  try {
    database = client.db(database_name);
    const articulos_collection = database.collection("articulos");
    // Query for a movie that has the title 'Back to the Future'
    // const query = { name: 'Back to the Future' };
    // const movie = await movies.findOne(query);
    const articulos_cursor = await articulos_collection.find();
    // console.log(articulos);
    // for await (const articulo of articulos_cursor) {
    //   console.log(`${pet.name} is a ${pet.kind}!`);
    // }
    let articulos = await articulos_cursor.toArray();
    console.log(articulos)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

export { database, client };
