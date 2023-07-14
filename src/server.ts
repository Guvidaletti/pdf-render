import app from './app';
import { API_PORT } from './config/constants';

app.listen(API_PORT, () => {
  console.log('BACK TA ON NA PORTA ', API_PORT);
});
