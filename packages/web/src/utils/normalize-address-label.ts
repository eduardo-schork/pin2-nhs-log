import TAddressModel from '@shared/models/Address.model';

function normalizeAddressLabel(address?: TAddressModel) {
    if (!address) return;

    const { city, state, number, country, streetAddress } = address;
    if (city && state && number) return `Rua: ${streetAddress}, Nº ${number} - ${city}, ${state}, ${country}`;

    return '';
}

export default normalizeAddressLabel;
