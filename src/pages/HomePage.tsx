import { parseRates } from "../utils/ratesParser";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { fetchRates } from "../api/fetchRates";
import ConverterForm from "../components/ConverterForm";
import RatesTable from "../components/RatesTable";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const Heading = styled.h1`
    font-size: 3.2em;
    line-height: 1.1;
`

function HomePage() {

    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchRates(),
        queryKey: ["rates"],
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (!data) {
        return <p>Failed to fetch rates</p>
    }

    const [rates, date] = parseRates(data);

    return (
        <>
            <Heading data-cy="main-heading">Currency converter</Heading>
            <ContentWrapper>
                <div>
                    <h2 data-cy="table-title">Rates for {date.toLocaleDateString()}</h2>
                    <RatesTable rates={rates} />
                </div>
                <ConverterForm rates={rates} />
            </ContentWrapper>
        </>
    );
}

export default HomePage