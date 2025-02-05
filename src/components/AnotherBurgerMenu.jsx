import React, {useState} from 'react';
import styles from '@/styles/BurgerMenu.module.css';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuItemClick = (page) => {
        setCurrentPage(page);
        setIsOpen(false);
    };

    return (
        <div className={styles.appBar}>
            <div className={styles.toolbar}>
                <button className={styles.menuButton} onClick={handleMenuToggle}>
                    <img src="/images/burgermenuwhite.png" alt="Menu" style={{width: 24, height: 24}}/>
                </button>
                <h3 className={styles.title}>
                    {currentPage}
                </h3>
            </div>
            {isOpen && (
                <div className={styles.menu}>
                    <a href="/" className={styles.navLink} onClick={() => handleMenuItemClick('home')}>home</a>
                    <a href="/about" className={styles.navLink} onClick={() => handleMenuItemClick('about me')}>about
                        me</a>
                    <a href="/projects" className={styles.navLink}
                       onClick={() => handleMenuItemClick('recent projects')}>recent projects</a>
                    <a href="/price" className={styles.navLink} onClick={() => handleMenuItemClick('price')}>price</a>
                    <a href="/contact" className={styles.navLink}
                       onClick={() => handleMenuItemClick('contact')}>contact</a>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;