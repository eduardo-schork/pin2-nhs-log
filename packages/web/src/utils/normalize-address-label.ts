import TAddressModel from '@shared/models/Address.model';

function normalizeAddressLabel(address?: TAddressModel) {
    if (!address) return;

    const { city, state, number, country } = address;
    if (city && state && number) return `${city}, ${state}, ${country}, Nº ${number}`;

    return '';
}

export default normalizeAddressLabel;
