import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import Database from '../dbconfig';
import PaymentType from "../../models/ PaymentType";
import Address from '../../models/Address';
import CollectionSchedule from '../../models/CollectionSchedule';
import DeliveryAppointment from '../../models/DeliveryAppointment';
import DeliveryAppointmentStatus from '../../models/DeliveryAppointmentStatus';
import DeliveryProcess from '../../models/DeliveryProcess';
import DeliveryProcessStatus from '../../models/DeliveryProcessStatus';
import Feedback from '../../models/Feedback';
import Fleet from '../../models/Fleet';
import FleetVehicle from '../../models/FleetVehicle';
import ItemRemittance from '../../models/ItemRemittance';
import ItemRemittanceType from '../../models/ItemRemittanceType';
import Offer from '../../models/Offer';
import OfferStatus from '../../models/OfferStatus';
import PaymentStatus from '../../models/PaymentStatus';
import Quotation from '../../models/Quotation';
import RemittanceTypeTax from '../../models/RemittanceTypeTax';
import User from '../../models/User';

dotenv.config();

(async () => {
    const db = Database.getDataBaseInstance();
    try {
        const models = [
            PaymentType,
            // Address,
            // CollectionSchedule,
            // DeliveryAppointment,
            // DeliveryAppointmentStatus,
            // DeliveryProcess,
            // DeliveryProcessStatus,
            // Feedback,
            // Fleet,
            // FleetVehicle,
            // ItemRemittance,
            // ItemRemittanceType,
            // Offer,
            // OfferStatus,
            // PaymentStatus,
            // Quotation,
            // RemittanceTypeTax,
            // User,
        ];
        db.sequelize.addModels(models);
        await db.sequelize.sync();
        console.log('Tables were successfully created');
    } catch (err) {
        console.error('Error when trying to create all the tables:', err);
    }
})();
