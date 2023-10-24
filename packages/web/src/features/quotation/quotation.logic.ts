import HttpRequestPort from '@/infra/http-request/http-request.port';
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function useQuotationLogic() {
    const navigate = useNavigate();

    const {
        isOpen: isOpenCreateModal,
        onOpen: openCreateModalHandler,
        onClose: closeCreateModalHandler,
    } = useDisclosure();

    function normalizeQuotationWithAddresses(data: any) {
        return {
            quotation: {
                cpf: data.cpf,
                email: data.email,
                currentDate: Date.now(),
            },
            itemRemittance: {
                objectType: data.remittanceType,
                weight: data.remittanceWeight,
            },
            originAddress: data.originAddress,
            destinationAddress: data.destinationAddress,
        };
    }

    async function onSubmitCreateQuotation(data: any) {
        try {
            const normalizedData = normalizeQuotationWithAddresses(data);
            await HttpRequestPort.post({ path: '/api/quotation', body: normalizedData });

            openCreateModalHandler();
        } catch (error) {
            toast.error('Ocorreu um erro ao criar cotação, tente novamente', { position: 'bottom-right' });
        }
    }

    function onSubmitTrackQuotation(value: string) {
        const formattedValue = value.replace(/[^0-9]/g, '');
        console.log({ formattedValue });
        navigate(`/quotation/track/${formattedValue}`);
    }
    return {
        isOpenCreateModal,
        closeCreateModalHandler,
        onSubmitTrackQuotation,
        onSubmitCreateQuotation,
    };
}

export default useQuotationLogic;
