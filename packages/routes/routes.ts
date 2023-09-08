import express from 'express';
import PaymentTypeController from '../controllers/PaymentTypeController';

const router = express.Router();

router.get('/payment-types', PaymentTypeController.getAllPaymentTypes);

export default router;
