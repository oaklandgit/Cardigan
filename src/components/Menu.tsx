import { useState } from 'react';

import styles from './Menu.module.css';

export default function Menu({ label, items }) {

  const [menuActive, setMenuActive] = useState(false);

  return (

    <div onClick={() => setMenuActive(!menuActive)} className="menuLabel">{label}
    
      {items &&
      <ul className={styles.menu} style={{ display: menuActive ? 'block' : 'none' }}>
        {items.map((item: { label: string, section: boolean }) => 
          <li className={item.section && styles.section}>{item.label}</li>
        )}
      </ul>
      }
    

    </div>
  )
}