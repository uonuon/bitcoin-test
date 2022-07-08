import React from 'react';
import HTMLReactParser from 'html-react-parser';
import { NewsInterface } from '../store/types';

const NewsCards: React.FC<{news: NewsInterface[]}> = ({news}) => {
    return (
        <div>
            {news.map((article: any, i: number) => {
                return <div key={i.toString()} className='news-card-container'>
                    <div className='news-card'>
                        <h3>{article.title}</h3>
                        {HTMLReactParser(article.description)}
                    </div>
                </div>
            })}
        </div>
    )
}

export default NewsCards;