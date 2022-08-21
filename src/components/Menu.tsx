import styles from './Menu.module.css';

export default function Menu({ title, isActive, children }) {

  return (

    <div className={styles.menu}>
      <div className={`${styles.title} ${isActive && styles.active}`}>{title}</div>
      <div className={styles.container} style={{ display: !isActive && 'none'}}>
        {children}
      </div>
    </div>

  )
}