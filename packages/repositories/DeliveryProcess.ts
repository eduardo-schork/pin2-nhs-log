interface DeliveryProcess {
    pk_delivery_process: number;
    dp_status: string;
    fk_offer: number;
    fk_feedback: number;
  }
  
export default DeliveryProcess;