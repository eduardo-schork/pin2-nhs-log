import TBaseModel from "./Base.model";

type TAddressModel = {
    id: number;
    streetAddress: string;
    number: number;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    geoLatitude: number | null;
    geoLongitude: number | null;
} & TBaseModel;

export default TAddressModel;
