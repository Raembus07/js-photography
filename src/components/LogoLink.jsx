import React from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/logo-link.module.css';

const LogoLink = ({href, imgSrc, altText}) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
            <img src={imgSrc} alt={altText} className={styles.logoImage}/>
        </a>
    );
};

LogoLink.propTypes = {
    href: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

export default LogoLink;