import { Router, type IRouter } from "express";
import healthRouter from "./health";
import storageRouter from "./storage";
import rsvpsRouter from "./rsvps";
import messagesRouter from "./messages";
import photosRouter from "./photos";

const router: IRouter = Router();

router.use(healthRouter);
router.use(storageRouter);
router.use(rsvpsRouter);
router.use(messagesRouter);
router.use(photosRouter);

export default router;
