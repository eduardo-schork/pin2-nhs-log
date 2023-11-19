import { ContainedButton } from '@/components/button/button.ui';
import { HContainer, PageContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import PageTitleBar from '@/components/page-title-bar.ui';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ManageProcessModal from './manage-process-modal.ui';
import TDeliveryProcessModel from '@shared/models/DeliveryProcess.model';
import t from '@/infra/i18n';
import VisualizeFeedbackModal from './visualize-feedback-modal.ui';
import Spacings from '@/styles/tokens/spacing';
import formatDateToPresent from '@/utils/format-date-to-present';

function AdminManageDeliveryProcessPage({ ...props }) {
    const [deliveryProcesses, setDeliveryProcesses] = useState<TDeliveryProcessModel[]>([]);
    const [selectedDeliveryProcess, setSelectedDeliveryProcess] = useState<TDeliveryProcessModel | null>();

    const {
        isOpen: isOpenProcessModal,
        onOpen: openProcessModalHandler,
        onClose: closeProcessModalHandler,
    } = useDisclosure();

    const {
        isOpen: isVisualizeFeedbackModal,
        onOpen: openVisualizeFeedbackModalHandler,
        onClose: closeVisualizeFeedbackModalHandler,
    } = useDisclosure();

    useEffect(() => {
        (async () => {
            await handleFindAllProcesses();
        })();
    }, []);

    async function handleFindAllProcesses() {
        const response = await HttpRequestPort.get({ path: '/api/delivery-process-opened' });
        setDeliveryProcesses(response as TDeliveryProcessModel[]);
    }

    function onPressProcessHandler(process: TDeliveryProcessModel) {
        setSelectedDeliveryProcess(process);
        openProcessModalHandler();
    }
    function onFeedbackPress(process: TDeliveryProcessModel) {
        setSelectedDeliveryProcess(process);
        openVisualizeFeedbackModalHandler();
    }

    async function onCloseModalHandler() {
        setSelectedDeliveryProcess(null);
        closeProcessModalHandler();
        await handleFindAllProcesses();
    }

    return (
        <BaseLayout {...props}>
            <ManageProcessModal
                isOpen={isOpenProcessModal}
                onClose={onCloseModalHandler}
                deliveryProcess={selectedDeliveryProcess}
            />

            <VisualizeFeedbackModal
                isOpen={isVisualizeFeedbackModal}
                onClose={closeVisualizeFeedbackModalHandler}
                deliveryProcess={selectedDeliveryProcess}
            />

            <PageTitleBar title={t('Dashboard.ManageProcess')} />

            <PageContainer>
                <QuotationItem.ListContainer>
                    {deliveryProcesses?.map((deliveryProcess) => (
                        <DeliveryProcessItem
                            key={deliveryProcess.id}
                            deliveryProcess={deliveryProcess}
                            onItemPress={onPressProcessHandler}
                            onFeedbackPress={onFeedbackPress}
                        />
                    ))}
                </QuotationItem.ListContainer>
            </PageContainer>
        </BaseLayout>
    );
}

function DeliveryProcessItem({
    deliveryProcess,
    onItemPress,
    onFeedbackPress,
}: {
    deliveryProcess: TDeliveryProcessModel;
    onItemPress(deliveryProcess: TDeliveryProcessModel): void;
    onFeedbackPress(deliveryProcess: TDeliveryProcessModel): void;
}) {
    const quotation = deliveryProcess.offer?.quotation;
    const itemRemittance = deliveryProcess.offer?.quotation?.itemRemittances?.[0];
    const itemRemittanceType = itemRemittance?.objectType;
    const itemRemittanceWeight = itemRemittance?.weight;

    return (
        <QuotationItem.Container key={deliveryProcess.id}>
            <QuotationItem.InfoTitle>#{deliveryProcess?.id}</QuotationItem.InfoTitle>

            <Divider />

            <QuotationItem.InfoLabel label={'Horário'} value={formatDateToPresent(deliveryProcess.createdAt)} />
            <QuotationItem.InfoLabel label={'CPF'} value={quotation?.cpf} />
            <QuotationItem.InfoLabel label={'Email'} value={quotation?.email} />

            <QuotationItem.InfoLabel label={'Tipo de Remessa'} value={itemRemittanceType} />
            <QuotationItem.InfoLabel label={'Peso'} value={itemRemittanceWeight} />
            <QuotationItem.InfoLabel label={'Status'} value={deliveryProcess.status} />
            <Divider />

            <HContainer style={{ justifyContent: 'flex-end', gap: Spacings.MEDIUM }}>
                {deliveryProcess?.feedback && (
                    <ContainedButton onClick={() => onFeedbackPress(deliveryProcess)}>Ver feedback</ContainedButton>
                )}
                <ContainedButton onClick={() => onItemPress(deliveryProcess)}>Alterar status</ContainedButton>
            </HContainer>
        </QuotationItem.Container>
    );
}

export default AdminManageDeliveryProcessPage;
