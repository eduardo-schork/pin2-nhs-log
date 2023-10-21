import styled from 'styled-components';
import BaseLayout from '@/components/layout/base-layout/base-layout.ui';
import Spacings from '@/styles/tokens/spacing';
import FontSizes from '@/styles/tokens/font-size';

const RegisterDivMargin = {
    MARGINTOP: '-100px',
    MARGINLEFT: '506.52px',
};

const RegisterTextMargin = {
    MARGINTOP: '-35.7px',
    MARGINLEFT: '170.06px',
};

export const PageContainer = styled(BaseLayout).attrs({
    withoutHeader: true,
})`
    position: relative;
`;

export const FormContainer = styled.div`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
    justify-content: center;

    gap: ${Spacings.MEDIUM};
    padding: ${Spacings.MEDIUM};
    margin-top: ${RegisterDivMargin.MARGINTOP};
    margin-left: ${RegisterDivMargin.MARGINLEFT};
`;

export const ImageContainer = styled.img`
    display: flex;
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
`;

export const TextContainer = styled.div`
    margin-top: ${RegisterTextMargin.MARGINTOP};
    margin-left: ${RegisterTextMargin.MARGINLEFT};
`;

export const LoginText = styled.span`
    font-size: ${FontSizes.DEFAULT};
    font-weight: bold;
`;

export const TableContainer = styled.div`
    width: 70%;
    margin: 0 auto;
`;

export const TableRow = styled.tr``;

export const Table = styled.table`
    width: 10% !important; 
    border-collapse: collapse;
    border: 1px solid #ddd;
`;

export const TableHeader = styled.th`
    width: auto !important; 
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`;

export const TableCell = styled.td`
    width: auto !important; 
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`;

export const MergedTableRow = styled.tr`
    background-color: #f2f2f2;
`;

export const handleEdit = (fleetId: any) => {
    console.log(`Editar frota ${fleetId}`);
};

export const handleDelete = (fleetId: any) => {
    console.log(`Excluir frota ${fleetId}`);
};
