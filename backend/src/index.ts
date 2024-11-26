require('dotenv').config({ path: __dirname + '/../../.env' });
import express from 'express';
import cors from 'cors';
import router from './routes/RideRoutes';
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use('/ride', router);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {});
