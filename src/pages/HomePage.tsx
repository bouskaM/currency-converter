import RatesTable from "../components/RatesTable";

function HomePage() {
    return (
        <div>
            <RatesTable rates={
                [
                    {
                        country: "USA",
                        currency: "Dollar",
                        amount: 1,
                        code: "USD",
                        rate: 22.83,
                    },
                    {
                        country: "EMU",
                        currency: "Euro",
                        amount: 1,
                        code: "EUR",
                        rate: 24.74,
                    },
                    {
                        country: "United Kingdom",
                        currency: "Pound",
                        amount: 0.72,
                        code: "GBP",
                        rate: 29.03,
                    }]} />
        </div>
    );
}

export default HomePage;