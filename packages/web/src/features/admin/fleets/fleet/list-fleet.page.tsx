import { Heading, IconButton, Table, TableContainer } from '@chakra-ui/react';
import TFleetModel from '@shared/models/Fleet.model';
import { useEffect, useState } from 'react';
import { MergedTableRow, TableCell, TableHeader, TableRow, handleDelete, handleEdit } from './create-fleet.style';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteVehicleModal from './delete-fleet.page';

function ListFleets() {
    const [fleets, setFleets] = useState<TFleetModel[]>([]);
    const [error, setError] = useState(null);
    const [isDeleteVehicleModalOpen, setIsDeleteVehicleModalOpen] = useState(false);

    console.log(fleets);
    useEffect(() => {
        fetch('http://localhost:8000/api/fleet')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar as frotas');
                }
                return response.json();
            })
            .then((data) => setFleets(data))
            .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Erro: {error}</div>;
    }

    const openDeleteVehicleModal = (fleetId) => {
        setIsDeleteVehicleModalOpen(true);
        setSelectedFleetId(fleetId);
    };
      
    return (
        <TableContainer>
            <Table>
            <thead>
                <MergedTableRow>
                    <TableHeader colSpan="3"><center>Listagem de Frotas</center></TableHeader>
                </MergedTableRow>
                <TableRow>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>Veículos</TableHeader>
                    <TableHeader>Ações</TableHeader> 
                </TableRow>
            </thead>
            <tbody>
                {fleets.map((fleet) => (
                    <TableRow key={fleet.name}>
                        <TableCell>{fleet.name}</TableCell>
                        <TableCell>{fleet.fleetVehicleId}</TableCell>
                        <TableCell>
                            <IconButton
                                icon={<EditIcon />}
                                aria-label="Editar"
                                onClick={() => handleEdit(fleet.id)} 
                            />
                            <IconButton
                                icon={<DeleteIcon />}
                                aria-label="Excluir"
                                onClick={() => openDeleteVehicleModal(fleet.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </tbody>
            </Table>
        </TableContainer>
    );
    {isDeleteVehicleModalOpen && (
        <DeleteVehicleModal
        isOpen={isDeleteVehicleModalOpen}
        onClose={() => setIsDeleteVehicleModalOpen(false)}
        vehicleId={undefined}
      />  
    )}
}

export default ListFleets;
function setSelectedFleetId(fleetId: any) {
    throw new Error('Function not implemented.');
}

