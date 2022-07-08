import React, { useEffect } from 'react';
import Button from '../components/Button';
import HistoryGraph from '../components/HistoryGraph';
import { useDispatch, useTrackedState } from '../store';
import NewsCards from './NewsCards';
import styled from 'styled-components';


const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 16px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1;
    padding: 30px;
    align-items: center;
`

const Price = styled.p`
    font-size: 18px;
    color: #7266ff;
    font-weight: bold;
`

const Feed: React.FC = () => {
    const dispatch = useDispatch();
    const state = useTrackedState();

    useEffect(() => {
        if (state.history.length === 0) {
            dispatch({ type: 'GET_HISTORY', days: 30 })
            dispatch({ type: 'GET_NEWS' })
            dispatch({ type: 'GET_PRICE' })
        }
    }, [state.history, dispatch])

    return (<Container>
        <Price>Current Spot price: {+(state.currentPrice.price) / 100}$</Price>
        {state.pending ? <p>Loading..</p> : <>
            <HistoryGraph />
            <ButtonsContainer>
                <Button fnCall={() => dispatch({ type: 'GET_HISTORY', days: 30 })} title={'One Month'} />
                <Button fnCall={() => dispatch({ type: 'GET_HISTORY', days: 7 })} title={'One Week'} />
                <Button fnCall={() => dispatch({ type: 'GET_HISTORY', days: 1 })} title={'One Day'} />
            </ButtonsContainer>
        </>
        }
        <NewsCards news={state.news.slice(0, 4)} />
    </Container>)
}

export default Feed;