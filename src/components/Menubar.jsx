import React from 'react';
import { menubarItems } from './menubarItems.js';
import './Menubar.css';

export default function Menubar() {

  return (

    <div id="menubar">

      <ul>
        {menubarItems.map((item) => (
          <li key={item.id}> {item.label}</li>
        ))}
      </ul>


    </div>
  )
}