import * as dotenv from "dotenv";

import PaymentTypeServ from "../../../services/PaymentTypeService";
import OfferStatusServ from "../../../services/OfferStatusService";
import ItemRemittanceTypeServ from "../../../services/ItemRemittanceTypeService";
import DeliveryAppointmentStatusServ from "../../../services/DeliveryAppointmentStatusService";
import DeliveryProcessStatusServ from "../../../services/DeliveryProcessStatusService";
import PaymentStatusServ from "../../../services/PaymentStatusService";
import RemittanceTypeTaxServ from "../../../services/RemittanceTypeTaxService";
import DatabasePort from "../database.port";

dotenv.config();

function seedSequelizeDatabase() {
    const db = DatabasePort;
    db.sequelize?.sync();

    const paymentTypeService = new PaymentTypeServ();
    paymentTypeService.initializePaymentTypes();

    const offerStatusService = new OfferStatusServ();
    offerStatusService.initializeOfferStatus();
    
    const itemRemittanceTypeService = new ItemRemittanceTypeServ();
    itemRemittanceTypeService.initializeItemRemittanceType();
    
    const deliveryAppointmentStatusService = new DeliveryAppointmentStatusServ();
    deliveryAppointmentStatusService.initializeDeliveryAppointmentStatus();
    
    const deliveryProcessStatusService = new DeliveryProcessStatusServ();
    deliveryProcessStatusService.initializeDeliveryProcessStatus();
    
    const paymentStatusService = new PaymentStatusServ();
    paymentStatusService.initializePaymentStatus();
    
    const remittanceTypeTaxService = new RemittanceTypeTaxServ();
    remittanceTypeTaxService.initializeRemittanceTypeTax();
}

export default seedSequelizeDatabase