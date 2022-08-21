import styles from './menuItem.module.css';

export default function MenuItem({ title }) {

  return (

    <div className={styles.title}>{title}</div>

  )
}