import TBaseModel from "./Base.model";

type TAddressModel = {
    id: number;
    streetAddress: string;
    number: number;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    geoLatitude: number;
    geoLongitude: number;
} & TBaseModel

export default TAddressModel

