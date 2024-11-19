import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'Ok!' });
});

app.listen(3333, () => {
  console.log('Server is running at: http://localhost:3333');
});
