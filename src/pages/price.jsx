import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from "@/styles/price.module.css";
import {motion} from "framer-motion";
import Footer from "@/components/Footer";

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
        <motion.div
            className={styles.priceContainer}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
        >
            <motion.h1
                className={styles.title}
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                Price Overview
            </motion.h1>
            <motion.p
                className={styles.description}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.2, duration: 0.5}}
            >
                Find our pricing for services below.
            </motion.p>

            <motion.div
                className={styles.priceList}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.3, duration: 0.5}}
            >
                {priceData.map((item, index) => (
                    <PriceItem
                        key={item.title}
                        data={item}
                        index={index}
                        onPackageClick={() => handlePackageClick(item.title)}
                    />
                ))}
            </motion.div>

            <motion.p
                className={styles.footerNote}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.6, duration: 0.5}}
            >
                <motion.span
                    className={styles.link}
                    onClick={handleCustomPackageClick}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                >
                    Contact us for custom offers!
                </motion.span>
            </motion.p>
            <Footer/>
        </motion.div>
    );
}

const PriceItem = ({data, onPackageClick, index}) => {
    return (
        <motion.div
            className={styles.priceItem}
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3 + (index * 0.1), duration: 0.5}}
            whileHover={{
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
            }}
        >
            <motion.img
                src={data.image}
                alt={data.title}
                className={styles.packageImage}
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.4 + (index * 0.1), duration: 0.5}}
            />
            <motion.h2
                className={styles.packageTitle}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.5 + (index * 0.1), duration: 0.4}}
            >
                {data.title}
            </motion.h2>
            <motion.p
                className={styles.packageDesc}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.6 + (index * 0.1), duration: 0.4}}
            >
                {data.description}
            </motion.p>
            <motion.p
                className={styles.price}
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{delay: 0.7 + (index * 0.1), duration: 0.4}}
            >
                {data.price}
            </motion.p>

            <motion.div
                className={styles.durationContainer}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.8 + (index * 0.1), duration: 0.4}}
            >
                <p className={styles.duration}>
                    <strong>Shooting Duration:</strong> {data.shootingDuration}
                </p>
                <p className={styles.duration}>
                    <strong>Supply Duration:</strong> {data.supplyDuration}
                </p>
            </motion.div>

            {data.bigDescription && (
                <motion.p
                    className={styles.bigDescription}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.9 + (index * 0.1), duration: 0.4}}
                >
                    {data.bigDescription}
                </motion.p>
            )}

            <motion.button
                className={styles.packageButton}
                onClick={onPackageClick}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.0 + (index * 0.1), duration: 0.4}}
                whileHover={{scale: 1.05, backgroundColor: "#333"}}
                whileTap={{scale: 0.95}}
            >
                Book This Package
            </motion.button>
        </motion.div>
    );
};