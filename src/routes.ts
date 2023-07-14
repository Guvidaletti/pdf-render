import { Router } from 'express';
import { postPDFGenerator } from './controllers/pdf.controller';

const routes = Router();

routes.delete('/all', () => {});
routes.post('/', postPDFGenerator);

export default routes;
