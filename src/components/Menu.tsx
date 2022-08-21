import styles from './Menu.module.css';

export default function Menu({ children }) {

  return (

    <div className={styles.menu}>
      {children}
    </div>

    //label, items, active, hide, handleAction

    // <div onMouseLeave={hide} className={`${styles.label} ${active && styles.active}`}>

    //   {label}

    //   {items &&
    //     <div className={styles.menu} style={{ display: active ? 'block' : 'none' }}>
    //       {items.map((item: { label: string, section: boolean, shortcut: string, callback: () => void }, index: number) =>
    //         <div
    //           onMouseUp={() => handleAction(item.action)}
    //           key={index}
    //           className={`${styles.item} ${item.section && styles.section}`}>
    //           {item.label}
    //           <span className={styles.shortcut}>{item.shortcut}</span>
    //         </div>
    //       )}
    //     </div>
    //   }


    // </div>
  )
}