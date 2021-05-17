/* eslint-disable no-console */
import { app } from './app';

const port = process.env.port || 3333;

app.listen(port, () => {
  console.log('Server listening 🚀');
});
