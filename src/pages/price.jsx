import React, { useEffect, useState } from "react";
import styles from "@/styles/price.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

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

        fetchPrices().then(r => console.log("fetching successful"));
    }, []);

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
                    </div>
                ))}
            </div>

            <p className={styles.footerNote}>
                <Link href='/contact?subject=Custom%20Offers' passHref>contact us for custom offers!</Link>
            </p>
        </div>
    );
}