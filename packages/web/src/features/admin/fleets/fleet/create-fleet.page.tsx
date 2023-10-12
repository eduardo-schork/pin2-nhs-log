import React, { useEffect, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, Text, Checkbox } from '@chakra-ui/react'; 
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { FormContainer, PageContainer } from './create-fleet.style';
import t from '@/infra/i18n';
import BaseLayout from './nav-bar-fleet.page';
import Containers from '@/components/containers.ui';

import CreateVehicleModal from '../fleetVehicle/modal-create-fleet-vehicle.page';
import { useForm } from 'react-hook-form';
import ErrorModal from './error.modal';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import EditVehicleModal from '../fleetVehicle/modal-edit-fleet-vehicle.page';
import DeleteVehicleModal from '../fleetVehicle/modal-delete-fleet-vehicle.page';
import { useNavigate } from 'react-router-dom';

type TCreateFleetPageFormValues ={
    fleetName: string;
    fleetVehicles: any[];
};

function CreateFleet({ ...props }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<TCreateFleetPageFormValues>();
    const [fleetVehicles, setFleetVehicles] = useState([]);
    const [selectedFleetVehicles, setSelectedFleetVehicles] = useState<string[]>([]); 
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isCreateVehicleModalOpen, setIsCreateVehicleModalOpen] = useState(false);
    const [isEditVehicleModalOpen, setIsEditVehicleModalOpen] = useState(false); 
    const [isDeleteVehicleModalOpen, setIsDeleteVehicleModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
      fetch('http://localhost:8000/api/fleetVehicle')
        .then(response => response.json())
        .then(data => setFleetVehicles(data))
        .catch(error => console.error('Erro ao buscar os veículos:', error));
    }, []);

    const handleCheckboxChange = (vehicleId) => {
      if (selectedFleetVehicles.includes(vehicleId)) {
        setSelectedFleetVehicles(selectedFleetVehicles.filter((id) => id !== vehicleId));
      } else {
        setSelectedFleetVehicles([...selectedFleetVehicles, vehicleId]);
      }
    };
    


    const closeErrorModal = () => {
      setError(null);
      setIsErrorModalOpen(false);
    };

    const openCreateVehicleModal = () => {
      setIsCreateVehicleModalOpen(true);
    };

    const selectEditVehicle = (vehicleId) => {
      setSelectedVehicle(vehicleId);
      setIsEditVehicleModalOpen(true);
  };

  const selectDeleteVehicle = (vehicleId) => {
      setSelectedVehicle(vehicleId);
      setIsDeleteVehicleModalOpen(true);
  };

    async function handleFormSubmit(data: TCreateFleetPageFormValues) {
      console.log(data);
      if(!data.fleetName) {
        setError(t('common.MissingParameter'));
        setIsErrorModalOpen(true);
      } else {
          const requestData = new URLSearchParams({
              fleetName: data.fleetName,
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
                  console.log(res);
                  navigate('/admin/fleet');
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

    const togglePopover = () => {
      setIsPopoverOpen(!isPopoverOpen);
    };

    return (
        <BaseLayout {...props}>
          <Containers.PageActions>
            <PageContainer>
              <FormContainer>
                <TextInput {...register('fleetName')} placeholder={t('Register.fleetName')} />
                <div style={{ position: 'relative' }}>  
                  <Button onClick={togglePopover} style={{background: 'white', color: '#718096', padding: '0.375rem 9.798rem',}}>Veículos</Button>
                  <Popover isOpen={isPopoverOpen} onOpen={togglePopover} onClose={togglePopover}>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Veículos</PopoverHeader>
                      <PopoverBody>
                        {fleetVehicles.map((vehicle) => (
                          <div key={vehicle.pk_fleet_vehicle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Checkbox
                              isChecked={selectedFleetVehicles.includes(vehicle.pk_fleet_vehicle)}
                              onChange={() => handleCheckboxChange(vehicle.pk_fleet_vehicle)} 
                          >
                              {vehicle.pk_fleet_vehicle}
                          </Checkbox>
                          <Button
                              onClick={() => selectEditVehicle(vehicle.pk_fleet_vehicle)} 
                              leftIcon={<EditIcon />}
                              size="sm"
                              variant="link"
                          >
                              Editar
                          </Button>
                          <Button
                              onClick={() => selectDeleteVehicle(vehicle.pk_fleet_vehicle)}
                              leftIcon={<DeleteIcon />}
                              size="sm"
                              variant="link"
                          >
                              Excluir
                          </Button>
                      </div>
                        ))}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
                <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                  <Text>{t('common.Register')}</Text>
                </ContainedButton>
                <ContainedButton onClick={openCreateVehicleModal}>
                  <Text>CADASTRAR VEÍCULO</Text>
                </ContainedButton>
                <ErrorModal isOpen={isErrorModalOpen} onClose={closeErrorModal} errorMessage={error || ''} />
                { }
                {isCreateVehicleModalOpen && (
                  <CreateVehicleModal />
                )}
                {isEditVehicleModalOpen && (
                  <EditVehicleModal isOpen={isEditVehicleModalOpen} onClose={() => setIsEditVehicleModalOpen(false)} />
                )}
                {isDeleteVehicleModalOpen && (
                  <DeleteVehicleModal isOpen={isDeleteVehicleModalOpen} onClose={() => setIsDeleteVehicleModalOpen(false)} />
                )}
              </FormContainer>
            </PageContainer>
          </Containers.PageActions>
        </BaseLayout>
      );
}

export default CreateFleet;
