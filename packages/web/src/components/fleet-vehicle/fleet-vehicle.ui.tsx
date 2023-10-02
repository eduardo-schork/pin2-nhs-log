import { Grid, Text, Input, Button } from '@chakra-ui/react';
import TFleetVehicleModel from '@/models/FleetVehicle.model';

function FleetVehicleForm({ fleetVehicle }: { fleetVehicle: TFleetVehicleModel }) {
    return (
        <div>
            <form onSubmit={handleCadastro}>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Cadastro de Veículo
                </Text>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                    <Input
                        placeholder="ID"
                        value={fleetVehicle.id.toString()}
                        required
                    />
                    <Input
                        placeholder="Model"
                        value={fleetVehicle.model}
                        required 
                    />
                    <Input
                        placeholder="Plate"
                        value={fleetVehicle.plate}
                        required 
                    />
                    <Input
                        placeholder="CPF Driver"
                        value={fleetVehicle.cpfDriver}
                        required 
                    />
                </Grid>
                <Button colorScheme="blue" mt={4} onClick={() => handleCadastro()}>
                    Cadastrar
                </Button>
            </form>
        </div>
    );

    function handleCadastro() {
        
    }
}

export default FleetVehicleForm;
