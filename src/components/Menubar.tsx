import { menubarItems } from './menubarItems';
import Menu from './Menu';
import styles from './Menubar.module.css';

export default function Menubar({ mode }) {

  return (

    <div className={`${styles.menubar} ${mode && styles.backgroundMode}`}>

      <ul className={styles.label}>
        {menubarItems.map((item) => (
          <li key={item.id}>
            <Menu label={item.label} items={item.items} />
          </li>
        ))}
      </ul>

    </div>
  )
}