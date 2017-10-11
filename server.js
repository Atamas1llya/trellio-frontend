import express from 'express';
import path from 'path';

import { port } from './config';

const app = express();

app.use(express.static(__dirname));
app.listen(port, () => {
  console.log(`Listening at ${port}...`);
});

// for ReactJS
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
