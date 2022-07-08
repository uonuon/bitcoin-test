import moment from 'moment';
import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { useTrackedState } from '../store';


const HistoryGraph: React.FC = () => {
    const state = useTrackedState();

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{payload[0].value / 100}$</p>
                    <p>{moment(label).format('ll')}</p>
                </div>
            );
        } else {
            return null
        }
    }

    return (<>
        <ResponsiveContainer width={600} maxHeight={270} height={270}>
            <AreaChart data={state.history}>
                <XAxis dy={10} fontSize={12} tickFormatter={(p) => moment(p).format('ll')} dataKey="price" />
                <YAxis
                    dataKey="date"
                    fontSize={12}
                    tickFormatter={(p) => (parseFloat(p) / 100).toString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid vertical={false} />
                <Area
                    type="linear"
                    dataKey="date"
                    stroke="#5546FF"
                    fill="rgba(85, 70, 255, 0.2)"
                />
            </AreaChart>
        </ResponsiveContainer>
    </>)
}

export default HistoryGraph;