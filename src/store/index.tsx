import { Reducer } from 'react';
import { createContainer } from 'react-tracked';
import { AsyncActionHandlers, useReducerAsync } from 'use-reducer-async';
import { State, Action } from './types';

const initialState: State = {
  history: [],
  pending: false,
  error: null,
};


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        pending: true,
      };
    case 'SET_HISTORY':
      return {
        ...state,
        pending: false,
        history: action.history,
      };
    case 'FAILED':
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

type AsyncFetchData = { type: 'GET_HISTORY', days: number };


type AsyncAction = AsyncFetchData;

const asyncActionHandlers: AsyncActionHandlers<
  Reducer<State, Action>,
  AsyncAction
> = {
  GET_HISTORY:
    ({ dispatch, getState }) =>
      async (action) => {
        try {
          const state = getState()
          if (state.history.length === 0) {
            dispatch({ type: 'FETCHING' });
          }
          fetch('https://index-api.bitcoin.com/api/v0/cash/history')
            .then((data) => data.json())
            .then((d) => {
              const history = d.reverse().filter((d: any, i: number) => i % action.days === 0).map((x: any) => {
                return { price: x[0], date: x[1] }
              })
              dispatch({ type: 'SET_HISTORY', history })
            })
        } catch (error: any) {
          dispatch({ type: 'FAILED', error });
        }
      },
};

const useValue = () =>
  useReducerAsync<Reducer<State, Action>, AsyncAction>(
    reducer,
    initialState,
    asyncActionHandlers,
  );

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);