import styled from 'styled-components';
import Colors from '../../styles/Colors';

export const ServicesContainer = styled.div`
    background: ${Colors.black};
    padding: 100px 0 100px 0;
    text-align: center;
`;

export const ServicesWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 50px;

    @media screen and (max-width: 768px){
        padding: 0 20px;
    }
`;

export const ServicesCard = styled.div`
    padding: 20px 20px;
    color: ${Colors.black};
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: all 0.2s ease-in-out;
`;

export const ServicesIcon = styled.img`
    height: 160px;
    width: 160px;
    margin-bottom: 10px;  
`;

export const ServicesH1 = styled.h1`
    font-size: 2.5rem;
    color: ${Colors.white};
    margin-bottom: 64px;

    @media screen and (max-width: 480px) {
        font-size: 2rem;
    }
`;

export const ServicesH2 = styled.h2`
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 10px;
`;

export const ServicesP = styled.p`
    font-size: 1.2rem;
    text-align: center;
`;
