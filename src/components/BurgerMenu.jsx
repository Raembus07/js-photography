import React, {useEffect, useState} from 'react';
import styles from '@/styles/BurgerMenu.module.css';
import {useRouter} from 'next/router';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const path = router.pathname;
        switch (path) {
            case '/about':
                setCurrentPage('about me');
                break;
            case '/projects':
                setCurrentPage('recent projects');
                break;
            case '/price':
                setCurrentPage('price');
                break;
            case '/contact':
                setCurrentPage('contact');
                break;
            default:
                setCurrentPage('home');
        }
    }, [router.pathname]);

    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuItemClick = (page, href) => {
        setCurrentPage(page);
        setIsOpen(false);
        router.push(href);
    };

    return (
        <div className={styles.appBar}>
            <div className={styles.toolbar}>
                <button id="menuButton" onClick={handleMenuToggle}>
                    <img src="/images/burgermenuwhite.png" alt="Menu" style={{width: 24, height: 24}}/>
                </button>
                <h3 className={styles.title}>
                    {currentPage}
                </h3>
            </div>
            {isOpen && (
                <div className={styles.menu}>
                    <a className={styles.navLink} onClick={() => handleMenuItemClick('home', '/')}>home</a>
                    <a className={styles.navLink} onClick={() => handleMenuItemClick('about me', '/about')}>about me</a>
                    <a className={styles.navLink} onClick={() => handleMenuItemClick('recent projects', '/projects')}>recent
                        projects</a>
                    <a className={styles.navLink} onClick={() => handleMenuItemClick('price', '/price')}>price</a>
                    <a className={styles.navLink} onClick={() => handleMenuItemClick('contact', '/contact')}>contact</a>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;