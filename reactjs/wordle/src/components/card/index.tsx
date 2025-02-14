import React from "react";
import styled from "styled-components";

interface CardProps {
    letter?: string;
    color: string;
}

const Box = styled.p<{ bgColor: string; isEmpty: boolean }>`  
    font-size: 1.5rem;
    text-align: center;
    color: white;
    width: 30px;
    height: 30px;
    font-weight: 800;
    padding: 0.5rem;
    margin: 0.5rem 0.5rem;
    background-color: ${({ bgColor, isEmpty }) => isEmpty ? 'transparent' : bgColor};
    border-radius: 2px;
    border: 1px solid ${props => props.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Card: React.FC<CardProps> = ({ letter = '', color }) => {
    return (
        <Box 
            bgColor={color} 
            isEmpty={!letter}
            aria-label={`Card ${letter ? `with letter ${letter}` : 'empty'}`}
        >
            {letter}
        </Box>
    );
};

export default Card;
