import { useState } from 'react';

import './Menu.css';

export default function Menu({ label, items }) {

  const [menuActive, setMenuActive] = useState(false);

  return (

    <div onClick={() => setMenuActive(!menuActive)} className="menuLabel">{label}
    
      {items &&
      <ul className="menu" style={{ display: menuActive ? 'block' : 'none' }}>
        {items.map((item: { label: string, section: boolean }) => 
          <li className={item.section ? 'section': ''}>{item.label}</li>
        )}
      </ul>
      }
    

    </div>
  )
}