import React, {useEffect, useState} from "react";
import styles from "@/styles/price.module.css";
import {useRouter} from "next/router";

export default function Price() {
    const router = useRouter();
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("/priceData.json");
                const data = await response.json();
                setPriceData(data);
            } catch (error) {
                console.error("error loading price data:", error);
            }
        };

        fetchPrices().then(() => console.log("fetching successful"));
    }, []);

    const handlePackageClick = (packageTitle) => {
        router.push({
            pathname: "/contact",
            query: {topic: "book package", package: packageTitle},
        }).then(r => `/contact with parameter book package and ${packageTitle} called`);
    };

    const handleCustomPackageClick = () => {
        router.push({
            pathname: "/contact",
            query: {topic: "custom package"},
        }).then(r => console.log('/contact with parameter custom package called'));
    }

    return (
        <div className={styles.priceContainer}>
            <h1 className={styles.title}>price overview</h1>
            <p className={styles.description}>
                find our pricing for services below.
            </p>

            <div className={styles.priceList}>
                {priceData.map((item, index) => (
                    <div key={index} className={styles.priceItem}>
                        <img
                            src={item.image}
                            alt={item.title}
                            className={styles.packageImage}
                        />

                        <h2 className={styles.packageTitle}>{item.title}</h2>
                        <p className={styles.packageDesc}>{item.description}</p>
                        <p className={styles.price}>{item.price}</p>

                        <div className={styles.durationContainer}>
                            <p className={styles.duration}>
                                <strong>shooting duration:</strong> {item.shootingDuration}
                            </p>
                            <p className={styles.duration}>
                                <strong>supply duration:</strong> {item.supplyDuration}
                            </p>
                        </div>

                        <p className={styles.bigDescription}>
                            {item.bigDescription}
                        </p>

                        <button
                            className={styles.packageButton}
                            onClick={() => handlePackageClick(item.title)}
                        >
                            Book This Package
                        </button>
                    </div>
                ))}
            </div>

            <p className={styles.footerNote}>
                <span
                    className={styles.link}
                    onClick={handleCustomPackageClick}
                >
                    contact us for custom offers!
                </span>
            </p>
        </div>
    );
}