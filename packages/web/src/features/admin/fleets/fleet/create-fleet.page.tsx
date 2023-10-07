import React, { useState } from 'react'; // Importe o useState
import { Text } from '@chakra-ui/react';
import RegisterBackground from '@/assets/register-page.png';
import { ContainedButton } from '@/components/button/button.ui';
import TextInput from '@/components/text-input/text-input.ui';
import { LoginText, TextContainer, FormContainer, PageContainer } from './create-fleet.style';
import { useForm } from 'react-hook-form';
import t from '@/infra/i18n';
import { useNavigate } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';
import BaseLayout from './nav-bar-fleet.page';
import Containers from '@/components/containers.ui';

import CreateVehicleModal from '../fleetVehicle/modal-create-fleet-vehicle.page';

type TCreateFleetPageFormValues ={
    fleetName: string;
    fleetVehicle: string;
};

function CreateFleet({ ...props }) {
    const navigate = useNavigate();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const { register, handleSubmit } = useForm<TCreateFleetPageFormValues>();

    async function handleFormSubmit(data: TCreateFleetPageFormValues) {
        
    }    

    return (
        <BaseLayout {...props}>
          <Containers.PageActions>
            <PageContainer>
              <FormContainer>
                <TextInput {...register('fleetName')} placeholder={t('Register.fleetName')} />
                <TextInput {...register('fleetVehicle')} placeholder={t('Register.fleetVehicle')} />
      
                <ContainedButton onClick={handleSubmit(handleFormSubmit)}>
                  <Text>{t('common.Register')}</Text>
                </ContainedButton>
      
                <ContainedButton onClick={() => setIsErrorModalOpen(true)}>
                  <Text>CADASTRAR VEÍCULO</Text> {}
                </ContainedButton>
              </FormContainer>
            </PageContainer>
          </Containers.PageActions>
          
          {/* Renderize o modal ErrorModal condicionalmente */}
          {isErrorModalOpen && (
            <CreateVehicleModal errorMessage="Mensagem de erro personalizada" />
          )}
        </BaseLayout>
      );
}

export default CreateFleet;
