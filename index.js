import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import db from './db/db.js';
import processRoutes from './routes/processRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000

app.use(cors());

app.use(bodyParser.json({limit: '1mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '1mb' ,extended: true}));

app.use('/',processRoutes);

app.listen(port,async () =>{

    try {
        await db();
        console.log(`Server running on PORT = ${port}`);
    } catch (err) {
        console.error(err,'[error in server start]');
    }
});