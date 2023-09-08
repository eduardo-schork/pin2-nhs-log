import Database from "../db/dbconfig";
import { IDatabase } from "pg-promise";

class PaymentTypeRepository {
  static async getAllPaymentTypes() {
    try {
      const db: IDatabase<any> | undefined = Database.getDataBaseInstance().getDb();

      if (!db) {
        throw new Error("Database connection is undefined.");
      }

      const query = 'SELECT * FROM payment_type';
      const result = await db.any(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default PaymentTypeRepository;