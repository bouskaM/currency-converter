export interface CurrencyRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export type CountryCodeRateAmount = Pick<CurrencyRate, 'country' | 'code' | 'rate' | 'amount'>;