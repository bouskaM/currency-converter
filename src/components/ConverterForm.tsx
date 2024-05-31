import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CountryCodeRateAmount } from '../types';
import CurrencySelect from './CurrencySelect';

interface ConverterFormProps {
    rates: CountryCodeRateAmount[]
}

const ConvertorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

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

function ConverterForm({ rates }: ConverterFormProps) {
    const [number, setNumber] = useState<number>(100);
    const [selectedCode, setSelectedCode] = useState<string>(rates[0].code);
    const [selectedRate, setSelectedRate] = useState<number>(rates[0].rate);
    const [selectedAmount, setSelectedAmount] = useState<number>(rates[0].amount);
    const [convertedValue, setConvertedValue] = useState<string>('0.00');

    useEffect(() => {
        const convertedValue = (number / (selectedRate / selectedAmount)).toFixed(3);
        setConvertedValue(convertedValue);
    }, [number, selectedRate]);

    const handleNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setNumber(value);
        }
    }, []);

    const handleCurrencyChange = useCallback((currency: string, rate: number, amount: number) => {
        setSelectedCode(currency);
        setSelectedRate(rate);
        setSelectedAmount(amount);
    }, []);


    return (
        <ConvertorWrapper>
            <div>
                <h2 data-cy="convert-title">Convert</h2>
                <StyledInput data-cy="amount-input" type='number' onChange={handleNumberChange} defaultValue={number} />
                <label data-cy="from-to-label">CZK to</label>
                <CurrencySelect onCodeChange={handleCurrencyChange} options={rates} />
            </div>

            <h2 data-cy="result">= {convertedValue} {selectedCode}</h2>
        </ConvertorWrapper>
    );
};

export default ConverterForm;