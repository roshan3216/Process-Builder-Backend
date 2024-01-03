import express from 'express';

import { getProcess, automatedProcess ,submitProcess } from '../controller/processController.js';

const router = express.Router();

router.get('/',getProcess);
router.post('/auto',automatedProcess);
router.post('/submit',submitProcess);

export default router;