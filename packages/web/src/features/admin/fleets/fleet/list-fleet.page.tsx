import { IconButton, Table, TableContainer } from '@chakra-ui/react';
import TFleetModel from '@shared/models/Fleet.model';
import { useEffect, useState } from 'react';
import { MergedTableRow, TableCell, TableHeader, TableRow } from './create-fleet.style';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import HttpRequestPort from '@/infra/http-request/http-request.port';
import { toast } from 'react-toastify';
import Spacings from '@/styles/tokens/spacing';
import { HContainer } from '@/components/container/container.ui';
import DeleteFleetModal from './delete-fleet-modal';
import EditFleetModal from './edit-fleet-modal.ui';

function ListFleets({ ...props }) {
    const [fleets, setFleets] = useState<TFleetModel[]>([]);
    const [selectedFleet, setSelectedFleet] = useState<TFleetModel | null>(null);

    const [isEditFleetModalOpen, setIsEditFletModalOpen] = useState<boolean>(false);
    const [isDeleteFleetModalOpen, setIsDeleteFletModalOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                const result = await HttpRequestPort.get({ path: '/api/fleet' });
                setFleets(result);
            } catch (error) {
                toast.error('Ocorreu um erro ao buscar frotas, recarregue a página');
            }
        })();
    }, []);

    const openDeleteFleetModal = (fleet: TFleetModel) => {
        setSelectedFleet(fleet);
        setIsDeleteFletModalOpen(true);
    };

    const openEditFleetModel = (fleet: TFleetModel) => {
        setSelectedFleet(fleet);
        setIsEditFletModalOpen(true);
    };

    return (
        <HContainer style={{ width: '100%', display: 'flex', marginBottom: Spacings.EXTRA_LARGE }}>
            {isDeleteFleetModalOpen && (
                <DeleteFleetModal
                    fleet={selectedFleet}
                    isOpen={isDeleteFleetModalOpen}
                    onClose={() => setIsDeleteFletModalOpen(false)}
                />
            )}

            {isEditFleetModalOpen && (
                <EditFleetModal
                    className={'edit-fleet-modal'}
                    fleet={selectedFleet}
                    isOpen={isEditFleetModalOpen}
                    onClose={() => setIsEditFletModalOpen(false)}
                />
            )}

            <TableContainer className='fleet-list' style={{ width: '80%', margin: 'auto' }} {...props}>
                <Table>
                    <thead>
                        <MergedTableRow>
                            <TableHeader colSpan="3">
                                <center>Listagem de Frotas</center>
                            </TableHeader>
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
                                <TableCell>{fleet.vehicles?.length}</TableCell>

                                <TableCell>
                                    <HContainer style={{ gap: Spacings.SMALL }}>
                                        <IconButton
                                            icon={<EditIcon />}
                                            className='edit-fleet-button'
                                            aria-label="Editar"
                                            onClick={() => openEditFleetModel(fleet)}
                                        />
                                        <IconButton
                                            icon={<DeleteIcon />}
                                            className='delete-fleet-button'
                                            aria-label="Excluir"
                                            onClick={() => openDeleteFleetModal(fleet)}
                                        />
                                    </HContainer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </HContainer>
    );
}

export default ListFleets;
