import React, {useState} from 'react';
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import styles from "@/styles/Header.module.css";

const BurgerMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHomeClick = () => {
        console.log('Home clicked');
        handleMenuClose();
    };

    const handleAboutClick = () => {
        console.log('About clicked');
        handleMenuClose();
    };

    const handlePortfolioClick = () => {
        console.log('Portfolio clicked');
        handleMenuClose();
    };

    const handlePriceClick = () => {
        console.log('Price clicked');
        handleMenuClose();
    };

    const handleContactClick = () => {
        console.log('Contact clicked');
        handleMenuClose();
    };

    return (
        <AppBar position="static" sx={{backgroundColor: '#000'}}>
            <Toolbar>
                <IconButton edge="start" aria-label="menu" onClick={handleMenuOpen}>
                    <img src="/images/burgermenuwhite.png" alt="Menu" style={{width: 24, height: 24}}/>
                </IconButton>
                <h3>My Portfolio</h3>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    sx={{'& .MuiPaper-root': {backgroundColor: '#444', color: '#fff'}}}
                >
                    <MenuItem onClick={handleHomeClick}><a href="/" className={styles.navLink}>home</a></MenuItem>
                    <MenuItem onClick={handleAboutClick}><a href="/about" className={styles.navLink}>about me</a></MenuItem>
                    <MenuItem onClick={handlePortfolioClick}><a href="/projects" className={styles.navLink}>recent projects</a></MenuItem>
                    <MenuItem onClick={handlePriceClick}><a href="/price" className={styles.navLink}>price</a></MenuItem>
                    <MenuItem onClick={handleContactClick}><a href="/contact" className={styles.navLink}>contact</a></MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default BurgerMenu;