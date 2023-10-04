import dotenv from 'dotenv';
import http from 'http';
import app from './app';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

const start = () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
