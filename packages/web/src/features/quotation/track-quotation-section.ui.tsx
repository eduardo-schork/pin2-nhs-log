import { HContainer, VContainer } from '@/components/container/container.ui';
import TextInputWithButton from '@/components/text-input/text-input-with-button.ui';
import t from '@/infra/i18n';
import Colors from '@/styles/tokens/color';
import Spacings from '@/styles/tokens/spacing';
import { Text } from '@chakra-ui/react';
import styled from 'styled-components';

function TrackQuotationSection({ onSubmit, ...props }: { onSubmit: (value: string) => void }) {
    return (
        <ImageBackground {...props}>
            <FollowQuotationContainer>
                <Text fontSize={'2xl'} fontWeight={'bold'}>
                    Acompanhe sua cotação
                </Text>

                <TextInputWithButton
                    placeholder={t('Quotation.NewQuotationForm.InsertQuotationCPF')}
                    buttonLabel={t('Quotation.NewQuotationForm.Follow')}
                    onButtonClick={onSubmit}
                />
            </FollowQuotationContainer>
        </ImageBackground>
    );
}

const ImageBackground = styled(HContainer)`
    min-height: 550px;
    width: 100vw;
    margin-bottom: ${Spacings.MEDIUM};
    justify-content: center;
    background-size: cover;
    background-image: url('https://images.unsplash.com/photo-1513646981453-ffb069114476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80');
`;

const FollowQuotationContainer = styled(VContainer)`
    padding: ${Spacings.EXTRA_LARGE};
    background-color: ${Colors.WHITE_TRANSPARENT};
    border-radius: ${Spacings.SMALL};
    width: 40%;
    align-self: center;
`;

export default TrackQuotationSection;
