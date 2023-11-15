import React, { useState } from 'react';
import TextInputWithButton from '@/components/text-input/text-input-with-button.ui';
import t from '@/infra/i18n';
import { Button, Text } from '@chakra-ui/react';
import {
    Address,
    ContainedButton,
    DateContainer,
    DividerContainer,
    FollowQuotationContainer,
    GridContainer,
    ImageBackground,
} from './styles';
import BaseLayout from '../admin/fleets/fleet/nav-bar-fleet.page';
import TAddressModel from '@shared/models/Address.model';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ErrorModal from './error.modal';
import ConfirmModal from './confirm.modal';

type AddressData = {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
};

type DeliveryProcessData = {
    id: number;
    status: string;
    date: any | null;
    currentAddressId: number;
    addressData: AddressData;
};

async function fetchDeliveryAppointment(id) {
    try {
        const requestData = new URLSearchParams({
            idDelivery: id,
        });

        const res = await fetch(`http://localhost:8000/api/delivery-appointment-one?${requestData}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data as DeliveryProcessData[];
        } else {
            throw new Error(`Erro ao buscar o processo de entrega: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error fetching delivery process data: ${error}`);
    }
}

async function fetchAddress(fkAddress) {
    try {
        const requestAddress = new URLSearchParams({
            idAddress: fkAddress,
        });

        const res = await fetch(`http://localhost:8000/api/address-one?${requestAddress}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            const data = await res.json();
            return data as TAddressModel;
        } else {
            throw new Error(`Erro ao buscar o endereço: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        throw new Error(`Error fetching address data: ${error}`);
    }
}

function DeliveryProcessPage({ ...props }) {
    const [deliveryProcessData, setDeliveryProcessData] = useState<DeliveryProcessData[] | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    async function handleSubmit(value) {
        if (!value || !value.trim()) {
            setError(t('DeliveryProcess.NotFound'));
            setIsErrorModalOpen(true);
            return;
        }

        try {
            const deliveryProcessData = await fetchDeliveryAppointment(value);
            if (deliveryProcessData) {
                const updatedDeliveryData = [];

                for (const item of deliveryProcessData) {
                    const addressData = await fetchAddress(item.currentAddressId);
                    updatedDeliveryData.push({ ...item, addressData });
                }
                setDeliveryProcessData(updatedDeliveryData);
            } else {
                setDeliveryProcessData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setDeliveryProcessData(null);
            setError(t('DeliveryProcess.NotFound'));
            setIsErrorModalOpen(true);
        }
    }

    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    function formatWithCapitalizedMonth(date) {
        const day = format(date, 'd', { locale: pt });
        const monthIndex = date.getMonth();
        const year = format(date, 'yyyy', { locale: pt });
        const month = months[monthIndex];

        return `${day} ${month} ${year}`;
    }

    return (
        <BaseLayout {...props}>
            <ImageBackground {...props}>
                <FollowQuotationContainer>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        Acompanhe sua remessa
                    </Text>

                    <TextInputWithButton
                        placeholder={t('Delivery.Process.Serch')}
                        buttonLabel={t('Delivery.Process.TrackBack')}
                        onButtonClick={handleSubmit}
                        onClose={closeErrorModal}
                    />
                </FollowQuotationContainer>
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
            </ImageBackground>

            {deliveryProcessData && <ContainedButton onClick={openConfirmModal}>Confirmar Entrega</ContainedButton>}

            {deliveryProcessData && (
                <GridContainer>
                    <DateContainer>
                        <div>
                            <center>
                                {deliveryProcessData.map((item) => (
                                    <div className="date" key={item.id}>
                                        {item.date && (
                                            <div>
                                                <Text>{formatWithCapitalizedMonth(new Date(item.date))}</Text>
                                                <Text>{format(new Date(item.date), 'HH:mm')} Horário Local</Text>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </center>
                        </div>
                    </DateContainer>
                    <DividerContainer>
                        {deliveryProcessData.map((item) => (
                            <Address key={item.id} style={{ whiteSpace: 'nowrap' }}>
                                <div className="status">Status - {item.status}</div>
                                <div>
                                    <Text>Rua - {item.addressData.streetAddress}</Text>
                                    <Text>Cidade - {item.addressData.city}</Text>
                                    <Text>Estado - {item.addressData.state}</Text>
                                    <Text>CEP - {item.addressData.zipCode}</Text>
                                </div>
                            </Address>
                        ))}
                    </DividerContainer>
                </GridContainer>
            )}

            {isConfirmModalOpen && (
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    message="Deseja confirmar a entrega do pacote?"
                />
            )}
        </BaseLayout>
    );
}

export default DeliveryProcessPage;
