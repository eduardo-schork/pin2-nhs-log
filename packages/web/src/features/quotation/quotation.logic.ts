import HttpRequestPort from '@/infra/http-request/http-request.port';
import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useQuotationLogic() {
    const navigate = useNavigate();

    const [itemRemittanceTypes, setItemRemittanceTypes] = useState([]);

    function findAllItemRemittanceTypesHandler() {
        const itemRemittanceTypes = HttpRequestPort.get({ path: '/api/item-remittance-type' });
        return itemRemittanceTypes;
    }

    useEffect(() => {
        (async () => {
            const returndata = await findAllItemRemittanceTypesHandler();
            console.log({ returndata });
            setItemRemittanceTypes(returndata);
        })();
    }, []);

    console.log({ itemRemittanceTypes });

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
        const normalizedData = normalizeQuotationWithAddresses(data);
        console.log({ normalizedData });

        const returndata = await HttpRequestPort.post({ path: '/api/quotation', body: normalizedData });

        console.log({ returndata });
        openCreateModalHandler();
    }

    function onSubmitTrackQuotation(value: string) {
        console.log({ value });
        navigate('/quotation/track');
    }
    return {
        isOpenCreateModal,
        itemRemittanceTypes,
        closeCreateModalHandler,
        onSubmitTrackQuotation,
        onSubmitCreateQuotation,
    };
}

export default useQuotationLogic;
