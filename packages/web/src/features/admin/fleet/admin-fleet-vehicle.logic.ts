import HttpRequestPort from '@/infra/http-request/http-request.port';
import TFleetVehicleModel from '@/models/FleetVehicle.model';
import { useEffect, useState } from 'react';

const useFleetVehicleLogic = () => {
    const [fleetVehicles, setFleetVehicles] = useState<TFleetVehicleModel[]>([]);

    useEffect(() => {
        (async () => {
            const data = await HttpRequestPort.get({ path: '/api/fleetVehicle' });

            setFleetVehicles(data as TFleetVehicleModel[]);
        })();
    }, []);

    return {
        fleetVehicles,
    };
};

export default useFleetVehicleLogic;
