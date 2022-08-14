import React from 'react';
import Button from './Button';
import './Card.css';

export default function Card({ id, title, elements }) {

  return (

    <div id="card">
      {elements.map((el) =>
        el.type === "button" && <Button key={el.id} id={el.id} label="New Button" x={el.pos[0]} y={el.pos[1]} />
      )}

    </div>
  )
}