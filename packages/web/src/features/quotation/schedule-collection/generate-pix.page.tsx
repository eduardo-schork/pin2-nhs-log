import React, { useState, useEffect } from 'react';
import { Divs } from './styles';
import { VContainer } from '@/components/container/container.ui';
import FormTextInput from '@/components/form/text-input/form-text-input.ui';
import Spacings from '@/styles/tokens/spacing';
import { useForm } from 'react-hook-form';
import QRCode from 'qrcode.react';

function GeneratePix() {
  const methods = useForm({});
  const [randomPixKey, setRandomPixKey] = useState('');

  const generateRandomPixKey = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = 20; 

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    setRandomPixKey(result);
  };

  useEffect(() => {
    generateRandomPixKey();
  }, []); 

  return (
    <Divs>
      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
        <FormTextInput label="Chave PIX" name="pixKey" methods={methods} value={randomPixKey} disabled={true}/>
      </VContainer>
      <VContainer gap={Spacings.MEDIUM} style={{ width: '50%', margin: '0px 20px 0px 0px' }}>
         <QRCode value={randomPixKey} size={256} style={{ margin: '35px 0px 0px 20%' }} />
      </VContainer>
    </Divs>
  );
}

export default GeneratePix;
