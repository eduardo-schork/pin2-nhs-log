import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { pt as yupPt } from 'yup-locale-pt';
import InputErrorLabel from '@/components/InputErrorLabel.ui';
import { useForm } from 'react-hook-form';
import QuotationItem from '@/components/quotation/quotation-item.ui';
import { Text, Textarea } from '@chakra-ui/react';
import Spacings from '@/styles/tokens/spacing';
import { VContainer } from '@/components/container/container.ui';
import RatingStars from '@/components/rating-stars.ui';
import { ContainedButton } from '@/components/button/button.ui';
import styled from 'styled-components';

yup.setLocale(yupPt);

const schema = yup
    .object()
    .shape({
        rating: yup.number().label('Score').required(),
        comment: yup.string().label('Comentário').required(),
    })
    .required();

function DeliveryFeedbackSection({ onSubmit, ...props }: { onSubmit(data: { score: number; comment: string }): void }) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<{ rating: number; comment: string }>({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data: any) => {
        reset();
        onSubmit(data);
    };

    return (
        <QuotationItem.Container {...props} style={{ width: 'fit-content', alignSelf: 'center' }}>
            <Text alignSelf={'center'} fontSize={'xl'}>
                Queremos saber como tem sido sua experiência com a plataforma:
            </Text>

            <FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
                <VContainer>
                    <RatingStars onChange={(score: number) => setValue('rating', score)} />
                    {errors.rating?.message && <InputErrorLabel error={errors.rating?.message} />}
                </VContainer>

                <Text alignSelf={'center'} fontWeight={'bold'}>
                    Adicione um comentário:
                </Text>

                <VContainer>
                    <Textarea style={{ height: '80px' }} {...register('comment')} />
                    {errors.comment?.message && <InputErrorLabel error={errors.comment?.message} />}
                </VContainer>
                <ContainedButton style={{ width: '150px' }} type={'submit'}>
                    Enviar
                </ContainedButton>
            </FormContainer>
        </QuotationItem.Container>
    );
}

const FormContainer = styled.form`
    justify-content: center;
    flex-direction: column;
    gap: ${Spacings.MEDIUM};
    display: flex;
    width: 100%;
`;
export default DeliveryFeedbackSection;
