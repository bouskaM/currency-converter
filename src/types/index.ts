export interface CurrencyRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export type CountryCodeRate = Pick<CurrencyRate, 'country' | 'code' | 'rate'>;