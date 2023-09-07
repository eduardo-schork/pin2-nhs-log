import Address from './Address';

interface Quotation {
  pk_quotation: number;
  qu_cpf: string;
  qu_email: string;
  qu_current_date: Date;
  fk_origin_address: number;
  fk_destination_address: number;
  originAddress: Address;
  destinationAddress: Address;
}

export default Quotation;