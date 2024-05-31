import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CountryCodeRate } from '../types';
import CurrencySelect from './CurrencySelect';

interface ConverterFormProps {
    rates: CountryCodeRate[]
}

const StyledInput = styled.input`
    padding: 5px;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #242424;
    color: rgba(255, 255, 255, 0.87);
    margin-right: 8px;
    margin-left: 8px;
    width: 100px;
`;

export default function ConverterForm({ rates }: ConverterFormProps) {
    const [number, setNumber] = useState<number>(100);
    const [selectedCode, setSelectedCode] = useState<string>(rates[0].code);
    const [selectedRate, setSelectedRate] = useState<number>(rates[0].rate);
    const [convertedValue, setConvertedValue] = useState<string>('0.00');

    useEffect(() => {
        const convertedValue = (number / selectedRate).toFixed(2);
        setConvertedValue(convertedValue);
    }, [number, selectedRate]);

    const handleNumberChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setNumber(value);
        }
    });

    const handleCurrencyChange = ((currency: string, rate: number) => {
        setSelectedCode(currency);
        setSelectedRate(rate);
    });


    return (
        <>
            <StyledInput type='number' onChange={handleNumberChange} defaultValue={number} />
            <label>CZK to</label>
            <CurrencySelect onCodeChange={handleCurrencyChange} options={
                [{
                    country: "USA",
                    code: "USD",
                    rate: 22.83
                },
                {
                    country: "EMU",
                    code: "EUR",
                    rate: 24.74
                },
                {
                    country: "United Kingdom",
                    code: "GBP",
                    rate: 29.03

                }]
            } />

            <h2>{convertedValue} {selectedCode}</h2>
        </>
    );
};
