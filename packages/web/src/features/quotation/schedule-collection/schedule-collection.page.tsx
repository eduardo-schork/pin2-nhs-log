import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { Text } from '@chakra-ui/react';

function ScheduleCollectionPage({ ...props }) {
    return (
        <BaseLayout {...props}>
            <Text>Agendamento de coleta</Text>
        </BaseLayout>
    );
}

export default ScheduleCollectionPage;
