import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Colors from '@/styles/tokens/color';
import { BiSolidDownArrow } from 'react-icons/bi';
import { Icon, Text } from '@chakra-ui/react';
import TDeliveryAppointmentModel from '@shared/models/DeliveryAppointment.model';
import { Address, DateContainer, DividerContainer, GridContainer } from './styles';

import { DELIVERY_APPOINTMENT_STATUS } from '@shared/constants/delivery-appointment-status.const';
import Divider from '@/components/divider';
import QuotationItem from '@/components/quotation/quotation-item.ui';

import { FaBoxOpen } from 'react-icons/fa6';
import { VContainer } from '@/components/container/container.ui';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

function formatWithCapitalizedMonth(date: any) {
    const day = format(date, 'd', { locale: pt });
    1;
    const monthIndex = date.getMonth();
    const year = format(date, 'yyyy', { locale: pt });
    const month = months[monthIndex];

    return `${day} ${month} ${year}`;
}

function DeliveryAppointmentList({ data, ...props }: { data: TDeliveryAppointmentModel[] }) {
    return (
        <QuotationItem.Container style={{ width: 'fit-content', alignSelf: 'center' }}>
            <Text alignSelf={'center'} fontWeight={'bold'}>
                APONTAMENTOS DE ENTREGA
            </Text>

            <Divider />

            {data.map((item: TDeliveryAppointmentModel) => {
                const isDeliveryAppointment = item.status == DELIVERY_APPOINTMENT_STATUS.DELIVERED;
                return (
                    <>
                        <GridContainer key={item.id} {...props}>
                            <DateContainer>
                                <div>
                                    <center>
                                        <div className="date" key={item.id}>
                                            {item.date && (
                                                <div>
                                                    <Text>{formatWithCapitalizedMonth(new Date(item.date))}</Text>
                                                    <Text>{format(new Date(item.date), 'HH:mm')} Horário Local</Text>
                                                </div>
                                            )}
                                        </div>
                                    </center>
                                </div>
                            </DateContainer>

                            <VContainer style={{ justifyContent: 'center' }}>
                                <DividerContainer />
                                {isDeliveryAppointment && (
                                    <Icon boxSize={6} alignSelf={'center'} color={Colors.PRIMARY} as={FaBoxOpen} />
                                )}

                                {!isDeliveryAppointment && (
                                    <Icon
                                        boxSize={6}
                                        alignSelf={'center'}
                                        color={Colors.PRIMARY}
                                        as={BiSolidDownArrow}
                                    />
                                )}
                            </VContainer>

                            <Address key={item.id} style={{ whiteSpace: 'nowrap' }}>
                                <div className="status">Status - {item.status}</div>
                                <div>
                                    <Text>Rua - {item?.currentAddress?.streetAddress}</Text>
                                    <Text>Cidade - {item?.currentAddress?.city}</Text>
                                    <Text>Estado - {item?.currentAddress?.state}</Text>
                                    <Text>CEP - {item?.currentAddress?.zipCode}</Text>
                                </div>
                            </Address>
                        </GridContainer>
                    </>
                );
            })}
        </QuotationItem.Container>
    );
}

export default DeliveryAppointmentList;
