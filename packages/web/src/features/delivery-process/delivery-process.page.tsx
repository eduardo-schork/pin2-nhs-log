import { useState } from 'react';
import TextInputWithButton from '@/components/text-input/text-input-with-button.ui';
import t from '@/infra/i18n';
import { Text } from '@chakra-ui/react';
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
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ErrorModal from './error.modal';
import ConfirmModal from './confirm.modal';
import TDeliveryProcessModel from '@shared/models/DeliveryProcess.model';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { DELIVERY_APPOINTMENT_STATUS } from '@shared/constants/delivery-appointment-status.const';

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

function formatWithCapitalizedMonth(date: any) {
    const day = format(date, 'd', { locale: pt });
    const monthIndex = date.getMonth();
    const year = format(date, 'yyyy', { locale: pt });
    const month = months[monthIndex];

    return `${day} ${month} ${year}`;
}

function DeliveryProcessPage({ ...props }) {
    const [deliveryProcessData, setDeliveryProcessData] = useState<TDeliveryProcessModel[] | null>(null);
    const [formDeliveryProcessId, setFormDeliveryProcessId] = useState<string | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    async function fetchDeliveryAppointment(id?: string) {
        try {
            if (!id) return;

            const requestData = new URLSearchParams({
                idDelivery: id,
            });

            const response = HttpRequestPort.get({ path: `/api/delivery-appointment-one?${requestData}` });

            return response;
        } catch (error) {
            console.log(`Erro ao buscar o processo de entrega: ${error}`);
        }
    }

    async function handleSubmit(value: string) {
        if (!value || !value.trim()) {
            setError(t('DeliveryProcess.NotFound'));
            setIsErrorModalOpen(true);
            return;
        }

        setFormDeliveryProcessId(value);

        try {
            const deliveryProcessData = (await fetchDeliveryAppointment(value)) as TDeliveryProcessModel[];
            if (deliveryProcessData) {
                setDeliveryProcessData(deliveryProcessData);
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

    async function onCloseConfirmDeliveryHandler() {
        await fetchDeliveryAppointment(formDeliveryProcessId);
        setIsConfirmModalOpen(false);
    }

    const showConfirmDeliveryButton = !deliveryProcessData?.map(
        (delivery) => delivery.status == DELIVERY_APPOINTMENT_STATUS.DELIVERED,
    );

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

            {deliveryProcessData && showConfirmDeliveryButton && (
                <ContainedButton onClick={openConfirmModal}>Confirmar Entrega</ContainedButton>
            )}

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
                                    <Text>Rua - {item.currentAddress.streetAddress}</Text>
                                    <Text>Cidade - {item.currentAddress.city}</Text>
                                    <Text>Estado - {item.currentAddress.state}</Text>
                                    <Text>CEP - {item.currentAddress.zipCode}</Text>
                                </div>
                            </Address>
                        ))}
                    </DividerContainer>
                </GridContainer>
            )}

            {isConfirmModalOpen && (
                <ConfirmModal
                    deliveryProcessId={formDeliveryProcessId}
                    isOpen={isConfirmModalOpen}
                    onClose={onCloseConfirmDeliveryHandler}
                    message={'Deseja confirmar a entrega do pacote?'}
                />
            )}
        </BaseLayout>
    );
}

export default DeliveryProcessPage;
