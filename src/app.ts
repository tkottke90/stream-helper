import express from 'express';
import path from 'path';
import controllers from './controllers';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(path.resolve(__dirname, '..', 'public'));
app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

controllers(app);

export default app;
