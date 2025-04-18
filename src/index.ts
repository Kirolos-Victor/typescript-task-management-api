import dotenv from 'dotenv';
import express from 'express';
import logger from './utils/logger';

import taskRoute from './api/v1/routes/task.route';
import authRoute from "./api/v1/routes/auth.route";
import {requireAuth} from "./api/v1/middlewares/auth.middleware";
import {errorHandler} from "./api/v1/middlewares/error-handler.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.get('', (req, res) => {
    res.send('Server running')
})
// API v1 routes
app.get('/api/v1', (req, res) => {
    res.send('API v1 running')
})
app.use('/api/v1/auth', authRoute)

//check for auth
app.use(requireAuth)
app.use('/api/v1/tasks', taskRoute);
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
});
