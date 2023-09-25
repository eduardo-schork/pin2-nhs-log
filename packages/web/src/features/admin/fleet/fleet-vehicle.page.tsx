import FleetVehicleItem from '@/components/fleetVehicle/fleet-vehicle.ui';
import TFleetVehicleModel from '@/models/FleetVehicle.model';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import { styled } from 'styled-components';
import Spacings from '@/styles/tokens/spacing';
import useFleetVehicleLogic from './fleet-vehicle.logic';

function FleetVehiclePage({ ...props }: { fleetVehicles?: TFleetVehicleModel[] }) {
    const { fleetVehicles } = useFleetVehicleLogic();

    console.log({fleetVehicles})

    return (
        <BaseLayout>
            <FleetVehicleContainer {...props}>
                {fleetVehicles.map((fleetVehicle: TFleetVehicleModel) => (
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
