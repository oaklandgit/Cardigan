import { useState } from 'react';
import { menubarItems } from './menubarItems';
import Menu from './Menu';
import styles from './Menubar.module.css';

export default function Menubar({ mode, handleAction }) {

  const [selectedMenuIndex, setSelectedMenuIndex] = useState(null);

  const toggleMenu = (index: number) => {
    if (selectedMenuIndex === index) {
      setSelectedMenuIndex(null);
      return;
    }
    setSelectedMenuIndex(index);
  }

  const hide = (index: number) => {
    setSelectedMenuIndex(null);
  }

  return (

    <div className={`${styles.menubar} ${mode && styles.backgroundMode}`}>
      
      {menubarItems.map((item, index) => (
        <div key={item.id} onClick={() => toggleMenu(index)}>
          <Menu hide={hide} active={index === selectedMenuIndex ? true : false} label={item.label} items={item.items} handleAction={handleAction} />
        </div>
      ))}
    </div>
  )
}