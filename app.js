import express from 'express';
import path from 'node:path';

const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});
