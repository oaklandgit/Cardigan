import styles from './menuTitle.module.css';

export default function MenuTitle({ title, isActive, children }) {

  return (

    <div className={styles.container}>
      <div className={styles.label}>{title}</div>
      {children}
    </div>

  )
}