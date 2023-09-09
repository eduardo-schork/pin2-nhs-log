import FleetVehicleItem from '@/components/fleetVehicle/fleet-vehicle.ui';
import FleetVehicleMock from '../../../../../shared/src/fixtures/fleetVehicle-item.mock.json';
import TFleetVehicleModel from '@/models/FleetVehicle.model';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { styled } from 'styled-components';
import Spacings from '@/styles/tokens/spacing';

const mock = [FleetVehicleMock];

function FleetVehiclePage({ fleetVehicles = mock, ...props }: { fleetVehicles?: TFleetVehicleModel[] }) {
    return (
        <BaseLayout>
            <FleetVehicleContainer {...props}>
                {fleetVehicles.map((fleetVehicle) => (
                    <FleetVehicleItem fleetVehicle={fleetVehicle} />
                ))}
            </FleetVehicleContainer>
        </BaseLayout>
    );
}

const FleetVehicleContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    gap: ${Spacings.MEDIUM};
`;

export default FleetVehiclePage;
