import React from 'react';
const Notes: React.FC = () => {
    return (
    <div>
        <div className="top-bar">
            <h1 className='top-bar-text'>Нотатки АКД</h1>
            {/* Нотатки, можна сказати конспект*/}
        </div>
        <div className='notes-container'>
            <label htmlFor='text'>Text</label>
            <br/>
            <textarea></textarea>
        </div>
    </div>
    );
}
export default Notes;
