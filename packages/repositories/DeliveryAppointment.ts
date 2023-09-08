import Address from "./Address";

import DeliveryProcess from "./DeliveryProcess";

interface DeliveryAppointment {
  pk_delivery_appointment: number;
  da_status: string;
  da_appointment_date: Date;
  fk_current_address: number;
  fk_delivery_process: number;
  currentAddress: Address;
  deliveryProcess: DeliveryProcess;
}

export default DeliveryAppointment;