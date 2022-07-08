import React, { useEffect } from 'react';
import Button from '../components/Button';
import HistoryGraph from '../components/HistoryGraph';
import { useDispatch, useTrackedState } from '../store';
import NewsCards from './NewsCards';

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

    return (<div className='feed'>
        {state.pending ? <p>Loading..</p> : <>
            <HistoryGraph />
            <div className='buttons-container'>
                <Button fnCall={() => dispatch({ type: 'GET_HISTORY', days: 30 })} title={'One Month'} />
                <Button fnCall={() => dispatch({ type: 'GET_HISTORY', days: 7 })} title={'One Week'} />
                <Button fnCall={() => dispatch({ type: 'GET_HISTORY', days: 1 })} title={'One Day'} />
            </div>
        </>
        }
        <p>{+(state.currentPrice.price) / 100}$</p>
        <NewsCards news={state.news.slice(0, 4)} />
    </div>)
}

export default Feed;