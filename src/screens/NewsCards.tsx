import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { NewsInterface } from '../store/types';
import styled from 'styled-components';


const CardContainer = styled.div`
    width: 400px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    margin: 16px;
    align-items: center;
    border-radius: 8px;
    text-align: center;
    font-size: 12px
`


const NewsCards: React.FC<{ news: NewsInterface[] }> = ({ news }) => {
    return (
        <>
            {news.map((article: any, i: number) => {
                return <CardContainer key={i.toString()} >
                    <h3>{article.title}</h3>
                    {HTMLReactParser(article.description)}
                </CardContainer>
            })}
        </>
    )
}

export default NewsCards;