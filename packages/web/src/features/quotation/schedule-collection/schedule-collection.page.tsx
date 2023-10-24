import React, { useState } from 'react';
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import {
    Divs,
  FormContainer,
  PageContainer,
  StyledTab1,
  StyledTab2,
  Title,
} from './styles';

function ScheduleCollectionPage({ ...props }) {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    street: '',
    district: '',
    number: '',
    instructions: '',
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    setActiveTab((prevTab) => prevTab + 1);
  };

  return (
    <BaseLayout {...props}>
      <PageContainer withoutHeader={true}>
        <Title textAlign="center" mt="100px">
          Agendamento de coleta
        </Title>
        <Tabs>
          <TabList>
            <StyledTab1>Agendamento</StyledTab1>
            <StyledTab2>Pagamento</StyledTab2>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormContainer>
                <Divs>
                  <Input
                    placeholder="Horário"
                  />
                  <Input
                    placeholder="País"
                  />
                </Divs>
                <Divs>
                  <Input
                    placeholder="Cidade"
                  />
                  <Input
                    placeholder="Rua"
                  />
                </Divs>
                <Divs>
                  <Input
                    placeholder="Bairro"
                  />
                  <Input
                    placeholder="Número"
                  />
                </Divs>
                <Textarea
                  placeholder="Instruções"
                  mb="2"
                />
              </FormContainer>
              <Button onClick={handleNext}>Próximo</Button>
            </TabPanel>
            <TabPanel>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>
    </BaseLayout>
  );
}

export default ScheduleCollectionPage;
