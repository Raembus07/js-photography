import styles from '@/styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <a href="/" className={styles.navLink}>home</a>
                <a href="/about" className={styles.navLink}>about me</a>
                <a href="/projects" className={styles.navLink}>recent projects</a>
                {/* <a href="/calendar" className={styles.navLink}>calendar</a> */}
                <a href="/price" className={styles.navLink}>price</a>
                <a href="/contact" className={styles.navLink}>contact</a>
            </nav>
        </header>
    );
}