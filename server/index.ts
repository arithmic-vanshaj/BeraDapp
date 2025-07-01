import express from 'express';
import cors from 'cors';
import handleRoutes from './routes/handleRoutes';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// defining the general api
app.use('/app', handleRoutes);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(` Server is running at http://localhost:${PORT}`);
})

process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});