export interface GraphInterface {
    date: string;
    price: number;
}

export interface PriceInterface {
    stamp: number;
    price: number;
}

export interface NewsInterface {
    title: string;
    description: string;
}

export type State = {
    history: GraphInterface[];
    currentPrice: PriceInterface;
    news: NewsInterface[];
    pending: boolean;
    error: Error | null;
};

export type Action =
    { type: 'FETCHING' }
    | { type: 'SET_HISTORY'; history: GraphInterface[] }
    | { type: 'FAILED'; error: Error }
    | { type: 'SET_PRICE'; currentPrice: PriceInterface }
    | { type: 'SET_NEWS'; news: NewsInterface[] }


