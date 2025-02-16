import React from 'react';
import {injectIntl} from 'react-intl';
import styles from '@/styles/footer.module.css';
import LogoLink from "@/components/LogoLink";

function Footer({intl}) {
    return (
        <footer className={styles.footer}>
            <p>{intl.formatMessage({id: 'footerText'})}</p>
            <LogoLink
                href="https://www.instagram.com/js_photography_ch"
                imgSrc="/images/instagram-logo.png"
                altText="Instagram"
            />
            <LogoLink
                href="https://www.linkedin.com/in/yourusername"
                imgSrc="/images/linkedin-logo.png"
                altText="LinkedIn"
            />
        </footer>
    );
}

export default injectIntl(Footer);