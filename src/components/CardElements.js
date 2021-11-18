import styled from 'styled-components'
import Paper from '@mui/material/Paper'
import { Colors } from '../styles/Colors';

export const Card = styled(Paper)`
    padding: 20px;
    box-shadow: 0px 11px 15px -7px ${Colors.shadow},0px 24px 38px 3px ${Colors.shadow},0px 9px 46px 8px ${Colors.shadow};
`;

export const CardContainer = styled.div`
    display: inline-block;
    text-align: left;
    padding: 20px; 
    vertical-align: top;
    width: 100%;
    max-width: 340px;
`;
