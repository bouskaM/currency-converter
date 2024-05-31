import styled from "styled-components";
import { CurrencyRate } from "../types";

const TableWrapper = styled.div`
    overflow: auto;
    max-height: 75vh;
    table{
        border-collapse: collapse;
        width: 100%;
    }
    thead th {
        position: sticky;
        top: 0;
        background-color: #242424;
        box-shadow: inset 1px 1px 0 black, inset 0 -1px 0 black;
    }
    td {
        border: 1px solid black;
        padding: 0.5rem;
    }
`;

interface RatesTableProps {
    rates: CurrencyRate[],
}

function RatesTable({ rates }: RatesTableProps) {
    return (
        <TableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Code</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map(({ country, currency, amount, code, rate }) => (
                        <tr key={code}>
                            <td>{country}</td>
                            <td>{currency}</td>
                            <td>{amount}</td>
                            <td>{code}</td>
                            <td>{rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableWrapper>
    );
}

export default RatesTable