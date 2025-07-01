import express from 'express';
import { handlerGetTokenHistoryData, 
    handlerGetTokenPrice, 
    handlerSwap, 
    hanlderWallet 
} from '../handler/handler';

const router = express.Router();

// handling the resolving of 
const routerHandler = (fn: Function) => async (req: any, res: any) => {
    try {
        await fn(req, res);
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

router.post('/swap', routerHandler(handlerSwap));
// router.post('/agent', routerHandler(handlerWeb3Agent));
router.post('/chart', routerHandler(handlerGetTokenHistoryData));
router.post('/wallet', routerHandler(hanlderWallet));
router.post('/tokenprice', routerHandler(handlerGetTokenPrice))

export default router;