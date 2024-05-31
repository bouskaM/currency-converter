import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CountryCodeRate } from '../types';

interface CurrencySelectProps {
    options: CountryCodeRate[];
    onCodeChange: (currency: string, rate: number) => void;
}

const Select = styled.select`
    padding: 5px;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #242424;
    color: rgba(255, 255, 255, 0.87);
    width: 200px;
    margin-left: 8px;
`;

function CurrencySelect({ options, onCodeChange }: CurrencySelectProps) {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        const selectedOption = options.find(option => option.code === selectedCode);
        if (selectedOption) {
            onCodeChange(selectedOption.code, selectedOption.rate);
        }
    }, [options, onCodeChange]);

    return (
        <Select data-cy="currency-select" onChange={handleChange}>
            {options.map(({ country, code }) => (
                <option key={code} value={code}>
                    {country} ({code})
                </option>
            ))}
        </Select>
    );
};

export default CurrencySelect;