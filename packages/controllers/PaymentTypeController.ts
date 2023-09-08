import { Request, Response } from 'express';
import PaymentTypeRepository from '../repositories/PaymentTypeRepository';

class PaymentTypeController {
  static async getAllPaymentTypes(req: Request, res: Response) {
    try {
      const paymentTypes = await PaymentTypeRepository.getAllPaymentTypes();
      res.status(200).json(paymentTypes);
    } catch (error) {
      console.error('Error in getAllPaymentTypes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default PaymentTypeController;