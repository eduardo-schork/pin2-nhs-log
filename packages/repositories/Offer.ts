import Quotation from './Quotation';

import FleetVehicle from './FleetVehicle';

interface Offer {
  pk_offer: number;
  of_status: string;
  of_subtotal: number;
  of_taxes: number;
  of_total: number;
  of_delivery_forecast: Date;
  fk_quotation: number;
  fk_fleet_vehicle: number;
  quotation: Quotation;
  fleetVehicle: FleetVehicle;
}

export default Offer;