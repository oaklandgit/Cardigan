import styles from './Menu.module.css';

export default function Menu({ label, items, active, hide }) {

  return (

    <div onMouseLeave={hide} className={`${styles.label} ${active && styles.active}`}>

      {label}

      {items &&
        <div className={styles.menu} style={{ display: active ? 'block' : 'none' }}>
          {items.map((item: { label: string, section: boolean, shortcut: string }, index: number) =>
            <div
              key={index}
              className={`${styles.item} ${item.section && styles.section}`}>
              {item.label}
              <span className={styles.shortcut}>{item.shortcut}</span>
            </div>
          )}
        </div>
      }


    </div>
  )
}