import express from 'express'
// import cors from 'cors'
import * as env from './env/index.js'
import * as data from './db/conn.js'
import AdminRoutes from './routes/Admin.js'
import CarritoRoutes from './routes/Carrito.js'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// test all variables from your environment
const app = express();
const port = process.env.port || 5000;

// config static files
app.use('/static', express.static(path.join(__dirname, 'static')))
// config views
app.set('views', './views')
// post body
app.use(express.json())
// app.set('Access-Control-Allow-Origin', '*');

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// app.use(cors());
app.use(express.json());
app.use('/admin', AdminRoutes);
app.use('/carrito', CarritoRoutes);

app.listen(port, () => {
  console.log(`server running in port ${port}`)
});
