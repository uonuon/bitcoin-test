export interface GraphInterface {
    date: string;
    price: number;
}

export type State = {
    history: GraphInterface[];
    pending: boolean;
    error: Error | null;
};

export type Action =
    { type: 'FETCHING' }
    | { type: 'SET_HISTORY'; history: GraphInterface[] }
    | { type: 'FAILED'; error: Error };


export const initialState: State = {
    history: [],
    pending: false,
    error: null,
};
