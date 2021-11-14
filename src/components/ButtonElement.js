import styled from 'styled-components'
import {Link as LinkS} from 'react-scroll'
import {Link as LinkR} from 'react-router-dom'
import { Colors } from '../styles/Colors';

export const Button = styled(LinkS)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? Colors.primary : Colors.black)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : ' 12px 30px')};
    color: ${({primary}) => (primary ? Colors.colorOnPrimary : Colors.white)};
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? Colors.white : Colors.primary)};
        color: ${({primary}) => (primary ? Colors.black : Colors.colorOnPrimary)};
    }
    &:disabled{
        background: ${Colors.grey};
        color: ${Colors.white};
    }
`;

export const RouterButton = styled(LinkR)`
    text-decoration: none;
    border-radius: 50px;
    background: ${({primary}) => (primary ? Colors.primary : Colors.black)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : ' 12px 30px')};
    color: ${({primary}) => (primary ? Colors.colorOnPrimary : Colors.white)};
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? Colors.white : Colors.primary)};
        color: ${({primary}) => (primary ? Colors.black : Colors.colorOnPrimary)};
    }
    &:disabled{
        background: ${Colors.grey};
        color: ${Colors.white};
    }
`;

export const DefaultButton = styled.button`
    text-decoration: none;
    border-radius: 50px;
    background: ${({primary}) => (primary ? Colors.primary : Colors.black)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : ' 12px 30px')};
    color: ${({primary}) => (primary ? Colors.colorOnPrimary : Colors.white)};
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? Colors.white : Colors.primary)};
        color: ${({primary}) => (primary ? Colors.black : Colors.colorOnPrimary)};
    }

    &:disabled{
        background: ${Colors.grey};
        color: ${Colors.white};
    }
`;