import { Reducer } from 'react';
import { createContainer } from 'react-tracked';
import { AsyncActionHandlers, useReducerAsync } from 'use-reducer-async';
import { State, Action } from './types';

const initialState: State = {
  history: [],
  currentPrice: { price: 0, stamp: 0 },
  news: [],
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
    case 'SET_PRICE':
      return {
        ...state,
        currentPrice: action.currentPrice,
      };
    case 'SET_NEWS':
      return {
        ...state,
        news: action.news,
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

type AsyncFetchHistory = { type: 'GET_HISTORY', days: number };
type AsyncFetchPrice = { type: 'GET_PRICE' };
type AsyncFetchNews = { type: 'GET_NEWS' };


type AsyncAction = AsyncFetchHistory | AsyncFetchPrice  | AsyncFetchNews;

const asyncActionHandlers: AsyncActionHandlers<
  Reducer<State, Action>,
  AsyncAction
> = {
  GET_HISTORY:
    ({ dispatch, getState }) =>
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
      GET_PRICE:
      ({ dispatch }) =>
      async (action) => {
        try {
          fetch('https://index-api.bitcoin.com/api/v0/cash/price/usd')
          .then((data) => data.json())
          .then((d) => dispatch({ type: 'SET_PRICE', currentPrice: d }))
          
        } catch (error: any) {
          dispatch({ type: 'FAILED', error });
        }
      },
      GET_NEWS:
      ({ dispatch }) =>
      async (action) => {
        try {
          const text = await fetch('https://news.bitcoin.com/feed/').then((r) => r.text());
          const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
          const items = Array.from(xmlDoc.querySelectorAll("item")).map((item: any) => {
              return ({
                  title: item.querySelector("title").textContent,
                  description: item.querySelector("description").childNodes[0].data
              })
          });
          dispatch({ type: 'SET_NEWS', news: items.slice(0, 4) });
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