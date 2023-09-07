interface ItemRemittance {
    pk_item_remittance: number;
    ir_type_object: string;
    ir_weight: number;
    fk_item_remittance_type: number;
  }
  
export default ItemRemittance;