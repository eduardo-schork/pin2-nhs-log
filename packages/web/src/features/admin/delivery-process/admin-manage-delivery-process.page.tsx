import { ContainedButton } from '@/components/button/button.ui';
import { PageContainer } from '@/components/container/container.ui';
import Divider from '@/components/divider';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import PageTitleBar from '@/components/page-title-bar.ui';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ManageProcessModal from './manage-process-modal.ui';
import TDeliveryProcessModel from '@shared/models/DeliveryProcess.model';

function AdminManageDeliveryProcessPage({ ...props }) {
    const [deliveryProcesses, setDeliveryProcesses] = useState<TDeliveryProcessModel[]>([]);
    const [selectedDeliveryProcess, setSelectedDeliveryProcess] = useState<TDeliveryProcessModel | null>();

    const {
        isOpen: isOpenProcessModal,
        onOpen: openProcessModalHandler,
        onClose: closeProcessModalHandler,
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
            <PageTitleBar title={'Gerenciar Processos'} />

            <PageContainer>
                <QuotationItem.ListContainer>
                    {deliveryProcesses?.map((deliveryProcess) => (
                        <DeliveryProcessItem deliveryProcess={deliveryProcess} onItemPress={onPressProcessHandler} />
                    ))}
                </QuotationItem.ListContainer>
            </PageContainer>
        </BaseLayout>
    );
}

function DeliveryProcessItem({
    deliveryProcess,
    onItemPress,
}: {
    deliveryProcess: TDeliveryProcessModel;
    onItemPress(deliveryProcess: TDeliveryProcessModel): void;
}) {
    const quotation = deliveryProcess.offer?.quotation;
    const itemRemittance = deliveryProcess.offer?.quotation?.itemRemittances?.[0];
    const itemRemittanceType = itemRemittance?.objectType;
    const itemRemittanceWeight = itemRemittance?.weight;

    return (
        <QuotationItem.Container key={deliveryProcess.id}>
            <QuotationItem.InfoTitle>#{deliveryProcess?.id}</QuotationItem.InfoTitle>

            <Divider />
            <QuotationItem.InfoLabel label={'Horário'} value={deliveryProcess.createdAt} />
            <QuotationItem.InfoLabel label={'CPF'} value={quotation?.cpf} />
            <QuotationItem.InfoLabel label={'Email'} value={quotation?.email} />

            <QuotationItem.InfoLabel label={'Tipo de Remessa'} value={itemRemittanceType} />
            <QuotationItem.InfoLabel label={'Peso'} value={itemRemittanceWeight} />
            <QuotationItem.InfoLabel label={'Status'} value={deliveryProcess.status} />
            <Divider />

            <ContainedButton onClick={() => onItemPress(deliveryProcess)}>Alterar status</ContainedButton>
        </QuotationItem.Container>
    );
}

export default AdminManageDeliveryProcessPage;
