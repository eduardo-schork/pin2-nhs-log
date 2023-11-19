import { useEffect, useState } from 'react';
import { Button, Text, Checkbox } from '@chakra-ui/react';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { FormContainer } from './create-fleet.style';
import t from '@/infra/i18n';
import BaseLayout from './nav-bar-fleet.page';

import CreateVehicleModal from '../fleet-vehicle/modal-create-fleet-vehicle.page';
import { useForm } from 'react-hook-form';
import ErrorModal from './error.modal';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import EditVehicleModal from '../fleet-vehicle/modal-edit-fleet-vehicle.page';
import DeleteVehicleModal from '../fleet-vehicle/modal-delete-fleet-vehicle.page';
import ListFleets from './list-fleet.page';
import TFleetVehicleModel from '@shared/models/FleetVehicle.model';
import { HContainer, VContainer } from '@/components/container/container.ui';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { toast } from 'react-toastify';
import Divider from '@/components/divider';
import Spacings from '@/styles/tokens/spacing';
import PageTitleBar from '@/components/page-title-bar.ui';
import QuotationItem from '@/components/quotation/quotation-item.ui';

type TCreateFleetPageFormValues = {
    fleetName: string;
    fleetVehicles: TFleetVehicleModel[];
};

function CreateFleet({ ...props }) {
    const { register, handleSubmit } = useForm<TCreateFleetPageFormValues>();

    const [fleetVehicles, setFleetVehicles] = useState<TFleetVehicleModel[]>([]);
    const [selectedFleetVehicles, setSelectedFleetVehicles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isCreateVehicleModalOpen, setIsCreateVehicleModalOpen] = useState(false);
    const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false);
    const [isDeleteVehicleModalOpen, setIsDeleteVehicleModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<TFleetVehicleModel | null>(null);

    async function handleFetchFleetVehicles() {
        try {
            const result = await HttpRequestPort.get({ path: '/api/fleetVehicle' });
            setFleetVehicles(result);
        } catch (error) {
            toast.error('Ocorreu um erro ao buscar veículos, recarregue a página');
        }
    }

    useEffect(() => {
        (async () => {
            await handleFetchFleetVehicles();
        })();
    }, []);

    const handleCheckboxChange = (vehicleId: number) => {
        const stringVehicleId = vehicleId.toString();

        if (selectedFleetVehicles.includes(stringVehicleId)) {
            setSelectedFleetVehicles(selectedFleetVehicles.filter((id) => id != stringVehicleId));
        } else {
            setSelectedFleetVehicles([...selectedFleetVehicles, stringVehicleId]);
        }
    };

    const closeErrorModal = () => {
        setError(null);
        setIsErrorModalOpen(false);
    };

    const openCreateVehicleModal = () => {
        setIsCreateVehicleModalOpen(true);
    };

    const selectEditVehicle = (vehicle: TFleetVehicleModel) => {
        setSelectedVehicle(vehicle);
        setIsEditVehicleModalOpen(true);
    };

    const selectDeleteVehicle = (vehicle: TFleetVehicleModel) => {
        setSelectedVehicle(vehicle);
        setIsDeleteVehicleModalOpen(true);
    };

    async function handleFormSubmit(data: TCreateFleetPageFormValues) {
        if (!data.fleetName) {
            setError(t('common.MissingParameter'));
            setIsErrorModalOpen(true);
        } else {
            const requestData = new URLSearchParams({
                fleetName: data?.fleetName,
                fleetVehicles: selectedFleetVehicles,
            });

            try {
                const res = await fetch(`http://localhost:8000/api/fleet/create?${requestData}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status === 200) {
                    window.location.reload();
                } else {
                    setError(t('Register.error'));
                    setIsErrorModalOpen(true);
                }
            } catch (error) {
                console.error(error);
                setError(t('Register.error'));
                setIsErrorModalOpen(true);
            }
        }
    }

    return (
        <BaseLayout {...props}>
            <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />

            {isCreateVehicleModalOpen && (
                <CreateVehicleModal
                    onCreateVehicle={() => handleFetchFleetVehicles()}
                    isOpen={isCreateVehicleModalOpen}
                    onClose={() => setIsCreateVehicleModalOpen(false)}
                />
            )}

            {isEditVehicleModalOpen && (
                <EditVehicleModal
                    vehicle={selectedVehicle}
                    isOpen={isEditVehicleModalOpen}
                    onClose={() => {
                        setIsEditVehicleModalOpen(false);
                        setSelectedVehicle(null);
                    }}
                />
            )}

            {isDeleteVehicleModalOpen && (
                <DeleteVehicleModal
                    isOpen={isDeleteVehicleModalOpen}
                    vehicleId={selectedVehicle?.id}
                    onClose={() => {
                        setIsDeleteVehicleModalOpen(false);
                        setSelectedVehicle(null);
                    }}
                />
            )}

            <PageTitleBar title={'Criar/Listar frotas'} />

            <FormContainer>
                <Text fontSize={'large'} fontWeight={'bold'}>
                    Criar nova frota:
                </Text>

                <TextInput {...register('fleetName')} placeholder={t('Register.fleetName')} />

                <Text alignSelf={'center'} fontWeight={'bold'}>
                    Veículos da frota
                </Text>

                <VContainer style={{ height: '40vh', overflow: 'auto' }}>
                    {fleetVehicles.map((vehicle) => (
                        <VContainer key={vehicle.id}>
                            <HContainer style={{ justifyContent: 'space-between', padding: `${Spacings.SMALL} 0` }}>
                                <Checkbox
                                    isChecked={selectedFleetVehicles.includes(vehicle.id.toString())}
                                    onChange={() => handleCheckboxChange(vehicle.id)}
                                >
                                    {vehicle.plate}
                                </Checkbox>

                                <HContainer style={{ gap: Spacings.SMALL }}>
                                    <Button
                                        onClick={() => selectEditVehicle(vehicle)}
                                        leftIcon={<EditIcon />}
                                        size="sm"
                                        variant="link"
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        onClick={() => selectDeleteVehicle(vehicle)}
                                        leftIcon={<DeleteIcon />}
                                        size="sm"
                                        variant="link"
                                    >
                                        Excluir
                                    </Button>
                                </HContainer>
                            </HContainer>
                            <Divider />
                        </VContainer>
                    ))}
                </VContainer>

                <HContainer style={{ justifyContent: 'space-between' }}>
                    <ContainedButton onClick={openCreateVehicleModal}>
                        <Text>CADASTRAR VEÍCULO</Text>
                    </ContainedButton>

                    <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                        <Text>{t('common.Register')}</Text>
                    </ContainedButton>
                </HContainer>
            </FormContainer>

            <ListFleets />
        </BaseLayout>
    );
}

export default CreateFleet;
