import React from 'react';

const Button: React.FC<{ fnCall: (args: any) => void, title: string }> = ({ fnCall, title }) => {
    return (
        <div onClick={fnCall} className='button'>
            <p>{title}</p>
        </div>
    )
}

export default Button;