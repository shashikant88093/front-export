import React from 'react';
import styled from 'styled-components';

import './Keyboard.css'

const KeyboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`;

const KeyboardRow = styled.div`
    display: flex;
    gap: 4px;
`;

const KeyboardButton = styled.button<{ bgColor?: string }>`
    padding: .5rem 1rem;
    background-color: ${props => props.bgColor || 'grey'};
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
`;

const keyboardKeys = {
    keyRowOne: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    keyRowTwo: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    keyRowThree: ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M','Backspace']
} as const;

interface KeyboardProps {
    color: string[];
    handleKeyWord: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ color, handleKeyWord }) => {
    return (
        <KeyboardContainer>
            <KeyboardRow>
                {keyboardKeys.keyRowOne.map((key, index) => (
                    <KeyboardButton 
                        bgColor={color[index]} 
                        onClick={handleKeyWord} 
                        key={index}
                    >
                        {key}
                    </KeyboardButton>
                ))}
            </KeyboardRow>
            <KeyboardRow>
                {keyboardKeys.keyRowTwo.map((key, index) => (
                    <KeyboardButton 
                        bgColor={color[index + keyboardKeys.keyRowOne.length]} 
                        onClick={handleKeyWord} 
                        key={index}
                    >
                        {key}
                    </KeyboardButton>
                ))}
            </KeyboardRow>
            <KeyboardRow>
                {keyboardKeys.keyRowThree.map((key, index) => (
                    <KeyboardButton 
                        bgColor={color[index + keyboardKeys.keyRowOne.length + keyboardKeys.keyRowTwo.length]} 
                        onClick={handleKeyWord} 
                        key={index}
                    >
                        {key}
                    </KeyboardButton>
                ))}
            </KeyboardRow>
        </KeyboardContainer>
    );
};

export default Keyboard;