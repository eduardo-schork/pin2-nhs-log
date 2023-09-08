interface Address {
    pk_address: number;
    ad_street_address: string;
    ad_number: number;
    ad_city: string;
    ad_state: string;
    ad_country: string;
    ad_zip_code: string;
    ad_geo_latitude?: number | null;
    ad_geo_longitude?: number | null;
  }
  
export default Address;
  