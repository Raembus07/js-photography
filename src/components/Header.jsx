import React from 'react';
import { useMediaQuery } from '@mui/material';
import BurgerMenu from '@/components/BurgerMenu';
import styles from '@/styles/Header.module.css';

export default function Header() {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <header className={styles.header}>
            {isMobile ? (
                <BurgerMenu />
            ) : (
                <nav className={styles.navbar}>
                    <a href="/" className={styles.navLink}>home</a>
                    <a href="/about" className={styles.navLink}>about me</a>
                    <a href="/projects" className={styles.navLink}>recent projects</a>
                    {/* <a href="/calendar" className={styles.navLink}>calendar</a> */}
                    <a href="/price" className={styles.navLink}>price</a>
                    <a href="/contact" className={styles.navLink}>contact</a>
                </nav>
            )}
        </header>
    );
}