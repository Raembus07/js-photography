import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/price.module.css";

export default function Price() {
    const [priceData, setPriceData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("/priceData.json");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPriceData(data);
            } catch (error) {
                console.error("Error loading price data:", error);
            }
        };

        fetchPrices().then(r => console.log("fetching successfully"));
    }, []);

    const handlePackageClick = (packageTitle) => {
        router.push({
            pathname: "/contact",
            query: {
                subject: `book ${packageTitle}`,
                topic: "book package",
                package: packageTitle,
            },
        });
    };

    const handleCustomPackageClick = () => {
        router.push({
            pathname: "/contact",
            query: {
                subject: "book custom package",
                topic: "custom package",
            },
        });
    };

    return (
        <div className={styles.priceContainer}>
            <h1 className={styles.title}>Price Overview</h1>
            <p className={styles.description}>
                Find our pricing for services below.
            </p>

            <div className={styles.priceList}>
                {priceData.map((item) => (
                    <PriceItem
                        key={item.title}
                        data={item}
                        onPackageClick={() => handlePackageClick(item.title)}
                    />
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

const PriceItem = ({ data, onPackageClick }) => {
    return (
        <div className={styles.priceItem}>
            <img
                src={data.image}
                alt={data.title}
                className={styles.packageImage}
            />
            <h2 className={styles.packageTitle}>{data.title}</h2>
            <p className={styles.packageDesc}>{data.description}</p>
            <p className={styles.price}>{data.price}</p>

            <div className={styles.durationContainer}>
                <p className={styles.duration}>
                    <strong>Shooting Duration:</strong> {data.shootingDuration}
                </p>
                <p className={styles.duration}>
                    <strong>Supply Duration:</strong> {data.supplyDuration}
                </p>
            </div>

            {data.bigDescription && (
                <p className={styles.bigDescription}>{data.bigDescription}</p>
            )}

            <button className={styles.packageButton} onClick={onPackageClick}>
                Book This Package
            </button>
        </div>
    );
};