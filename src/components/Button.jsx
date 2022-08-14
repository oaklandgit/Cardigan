import React from 'react';
import './Button.css';

export default function Button({ id, label, x, y }) {

  console.log(x, y);

  return (

    <button className="button" style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>{label}</button>
  )
}