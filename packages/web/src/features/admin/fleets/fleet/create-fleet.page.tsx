import React, { useEffect, useState } from 'react';
import { Button, Popover, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, Text, Checkbox } from '@chakra-ui/react'; 
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { FormContainer, PageContainer, customTheme } from './create-fleet.style';
import t from '@/infra/i18n';
import BaseLayout from './nav-bar-fleet.page';
import Containers from '@/components/containers.ui';

import CreateVehicleModal from '../fleetVehicle/modal-create-fleet-vehicle.page';
import { useForm } from 'react-hook-form';

type TCreateFleetPageFormValues ={
    fleetName: string;
    fleetVehicles: string[];
};

function CreateFleet({ ...props }) {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const { register, handleSubmit } = useForm<TCreateFleetPageFormValues>();
    const [fleetVehicles, setFleetVehicles] = useState([]);
    const [selectedFleetVehicles, setSelectedFleetVehicles] = useState<string[]>([]); // To store selected values
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
      fetch('http://localhost:8000/api/fleetVehicle')
        .then(response => response.json())
        .then(data => setFleetVehicles(data))
        .catch(error => console.error('Erro ao buscar os veículos:', error));
    }, []);

    const handleCheckboxChange = (vehicleId: string) => {
      if (selectedFleetVehicles.includes(vehicleId)) {
        setSelectedFleetVehicles(selectedFleetVehicles.filter(id => id !== vehicleId));
      } else {
        setSelectedFleetVehicles([...selectedFleetVehicles, vehicleId]);
      }
    };

    async function handleFormSubmit(data: TCreateFleetPageFormValues) {
        
        console.log(data.fleetVehicles);
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
                          <div key={vehicle.pk_fleet_vehicle}>
                            <Checkbox
                              isChecked={selectedFleetVehicles.includes(vehicle.pk_fleet_vehicle)}
                              onChange={() => handleCheckboxChange(vehicle.pk_fleet_vehicle)}
                            >
                              {vehicle.fv_modal}
                            </Checkbox>
                          </div>
                        ))}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
                <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                  <Text>{t('common.Register')}</Text>
                </ContainedButton>

                <ContainedButton onClick={() => setIsErrorModalOpen(true)}>
                  <Text>CADASTRAR VEÍCULO</Text>
                </ContainedButton>
              </FormContainer>
            </PageContainer>
          </Containers.PageActions>
          
          {/* Render the ErrorModal conditionally */}
          {isErrorModalOpen && (
            <CreateVehicleModal errorMessage="Mensagem de erro personalizada" />
          )}
        </BaseLayout>
      );
}

export default CreateFleet;
  