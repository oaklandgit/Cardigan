import styles from './menuItem.module.css';

export default function MenuItem({ title, shortcut, section }) {

  return (

    <div
      className={`${styles.title} ${section && styles.section}` }>
      {title}
      <span className={styles.shortcut}>{shortcut}</span>
    </div>

  )
}