import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/price.module.css";

export default function Price() {
    const [priceData, setPriceData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("/priceData.json");
                const data = await response.json();
                setPriceData(data);
            } catch (error) {
                console.error("Error loading price data:", error);
            }
        };

        fetchPrices().then(r => console.log('fetching successfully'));
    }, []);

    const handlePackageClick = (packageTitle) => {
        router.push({
            pathname: "/contact",
            query: {
                subject: `book ${packageTitle}`,
                topic: "book package",
                package: packageTitle,
            },
        }).then(r => console.log('sent to /contact successfully'));
    };

    const handleCustomPackageClick = () => {
        router.push({
            pathname: "/contact",
            query: {
                subject: "book new package",
                topic: "custom package",
            },
        }).then(r => console.log('sent to /contact successfully'));
    };

    return (
        <div className={styles.priceContainer}>
            <h1 className={styles.title}>Price Overview</h1>
            <p className={styles.description}>
                Find our pricing for services below.
            </p>

            <div className={styles.priceList}>
                {priceData.map((item) => (
                    <div key={item.title} className={styles.priceItem}>
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
                                <strong>Shooting Duration:</strong> {item.shootingDuration}
                            </p>
                            <p className={styles.duration}>
                                <strong>Supply Duration:</strong> {item.supplyDuration}
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
                    Contact us for custom offers!
                </span>
            </p>
        </div>
    );
}