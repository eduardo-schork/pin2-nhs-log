import { useState } from 'react';
import TextInputWithButton from '@/components/text-input/text-input-with-button.ui';
import t from '@/infra/i18n';
import { Text } from '@chakra-ui/react';
import { FollowQuotationContainer, ImageBackground } from './styles';
import BaseLayout from '../admin/fleets/fleet/nav-bar-fleet.page';

import ErrorModal from './error.modal';
import ConfirmModal from './confirm.modal';
import TDeliveryProcessModel from '@shared/models/DeliveryProcess.model';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import TDeliveryAppointmentModel from '@shared/models/DeliveryAppointment.model';

import { VContainer } from '@/components/container/container.ui';

import Spacings from '@/styles/tokens/spacing';
import { DELIVERY_PROCESS_STATUS } from '@shared/constants/delivery-process-status.const';
import { ContainedButton } from '@/components/button/button.ui';
import DeliveryFeedbackSection from './delivery-feedback-section.ui';
import DeliveryAppointmentList from './delivery-appointment-list.ui';
import { toast } from 'react-toastify';

function DeliveryProcessPage({ ...props }) {
    const [deliveryProcess, setDeliveryProcess] = useState<TDeliveryProcessModel | null>(null);
    const [formDeliveryProcessId, setFormDeliveryProcessId] = useState<string | null>(null);

    const [processAppointments, setProcessAppointments] = useState<TDeliveryAppointmentModel[] | null>(null);
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

    async function fetchDeliveryProcess(id?: string) {
        try {
            if (!id) return;

            const deliveryProcessData = (await HttpRequestPort.get({
                path: `/api/delivery-process/${id}`,
            })) as TDeliveryProcessModel;

            return deliveryProcessData;
        } catch (error) {
            console.log(`Erro ao buscar o processo de entrega: ${error}`);
        }
    }

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
            const deliveryProcessAppointments = (await fetchDeliveryAppointment(value)) as TDeliveryAppointmentModel[];
            const deliveryProcessData = (await fetchDeliveryProcess(value)) as TDeliveryProcessModel;

            if (deliveryProcessData && deliveryProcessAppointments) {
                setDeliveryProcess(deliveryProcessData);
                setProcessAppointments(deliveryProcessAppointments);
            } else {
                setDeliveryProcess(null);
                setProcessAppointments(null);
            }
        } catch (error) {
            setDeliveryProcess(null);
            setProcessAppointments(null);
            toast.error('Remessa não encontrada, insira um novo número.');
        }
    }

    async function onCloseConfirmDeliveryHandler() {
        const deliveryProcessResponse = (await fetchDeliveryProcess(
            formDeliveryProcessId?.toString(),
        )) as TDeliveryProcessModel;

        setDeliveryProcess(deliveryProcessResponse);

        const deliveryAppointmentResponse = (await fetchDeliveryAppointment(
            formDeliveryProcessId?.toString(),
        )) as TDeliveryAppointmentModel[];
        setProcessAppointments(deliveryAppointmentResponse);

        setIsConfirmModalOpen(false);
    }

    const showFeedbackSection = deliveryProcess?.status == DELIVERY_PROCESS_STATUS.DELIVERY_CONFIRMED;
    const showConfirmDeliveryButton = deliveryProcess?.status == DELIVERY_PROCESS_STATUS.DELIVERED;

    async function onSubmitFeedback(data: { comment: string; rating: number }) {
        try {
            await HttpRequestPort.post({
                path: '/api/feedback',
                body: { ...data, deliveryProcessId: formDeliveryProcessId },
            });
            toast.success('O feedback foi enviado com sucesso!');
        } catch (error: any) {
            toast.error('Ocorreu um erro ao enviar feedback, tente novamente...');
        }
    }

    return (
        <BaseLayout {...props}>
            {isConfirmModalOpen && (
                <ConfirmModal
                    deliveryProcessId={formDeliveryProcessId}
                    isOpen={isConfirmModalOpen}
                    onClose={onCloseConfirmDeliveryHandler}
                    message={'Deseja confirmar a entrega do pacote?'}
                />
            )}

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

            {processAppointments && (
                <Text marginBottom={Spacings.MEDIUM} fontWeight={'bold'} fontSize={'2xl'} alignSelf={'center'}>
                    Detalhes da remessa #{formDeliveryProcessId}
                </Text>
            )}

            {showFeedbackSection && <DeliveryFeedbackSection onSubmit={onSubmitFeedback} />}

            {!showFeedbackSection && processAppointments && (
                <VContainer gap={Spacings.LARGE}>
                    {showConfirmDeliveryButton && (
                        <ContainedButton onClick={openConfirmModal}>Confirmar Entrega</ContainedButton>
                    )}

                    <DeliveryAppointmentList data={processAppointments} />
                </VContainer>
            )}
        </BaseLayout>
    );
}

export default DeliveryProcessPage;
