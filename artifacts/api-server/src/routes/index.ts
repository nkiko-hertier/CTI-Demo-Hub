import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ctiRouter from "./cti";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/cti", ctiRouter);

export default router;
