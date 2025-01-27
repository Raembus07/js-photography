import styles from "@/styles/price.module.css";
import {FormattedMessage} from "react-intl";
import React from "react";

const PriceItem = ({data, onPackageClick}) => {
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
                    <FormattedMessage
                        id="shootingDuration"
                        values={{
                            boldText: (chunks) => <strong>{chunks}</strong>,
                        }}
                    />
                </p>
                <p className={styles.duration}>
                    <FormattedMessage
                        id="supplyDuration"
                        values={{
                            boldText: (chunks) => <strong>{chunks}</strong>,
                        }}
                    />
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