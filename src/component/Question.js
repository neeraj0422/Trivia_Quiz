import React from 'react';

const Question = ({ question, options, onSelect }) => {
  return (
    <div>
      <h3>{question}</h3>
      {options.map((option, index) => (
        <button key={index} onClick={() => onSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
