import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {FormattedMessage} from 'react-intl';
import {useForm} from 'react-hook-form';
import styles from '@/styles/contact.module.css';

import topics from '../../public/contactTopics.json';
import priceData from '../../public/priceData.json';

const ContactPage = () => {
    const {register, handleSubmit, setValue, watch, reset} = useForm();
    const router = useRouter();
    const watchTopic = watch("topic");

    useEffect(() => {
        const {topic, package: packageParam, subject} = router.query;

        if (topic || packageParam || subject) {
            setValue("topic", topic || "");
            setValue("package", packageParam || "");
            setValue("subject", subject || "");
        }
    }, [router.query, setValue]);

    const onSubmit = async (data) => {
        console.log("submitting form", data);
        const response = await fetch('/api/send', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });

        console.log(response);

        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            reset();
            await router.push('/');
        } else {
            alert('There was a problem. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                <FormattedMessage id="contactTitle" defaultMessage="Contact Me"/>
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        <FormattedMessage id="nameLabel" defaultMessage="Name:"/>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={styles.input}
                        placeholder="Your name"
                        {...register("name", {required: true})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        <FormattedMessage id="emailLabel" defaultMessage="Email:"/>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.input}
                        placeholder="Your email address"
                        {...register("email", {required: true})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                        <FormattedMessage id="subjectLabel" defaultMessage="Subject:"/>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        className={styles.input}
                        placeholder="Subject of your message"
                        {...register("subject", {required: true})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="topic" className={styles.label}>
                        <FormattedMessage id="topicLabel" defaultMessage="Topic:"/>
                    </label>
                    <select
                        id="topic"
                        name="topic"
                        className={styles.select}
                        {...register("topic", {required: true})}
                    >
                        <option value="" disabled>
                            <FormattedMessage id="selectTopic" defaultMessage="Select a topic"/>
                        </option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.title}>
                                {topic.title}
                            </option>
                        ))}
                    </select>
                </div>

                {watchTopic === "book package" && (
                    <div className={styles.formGroup}>
                        <label htmlFor="package" className={styles.label}>
                            <FormattedMessage id="packageLabel" defaultMessage="Package:"/>
                        </label>
                        <select
                            id="package"
                            name="package"
                            className={styles.select}
                            {...register("package", {required: true})}
                        >
                            <option value="" disabled>
                                <FormattedMessage id="selectPackage" defaultMessage="Select a package"/>
                            </option>
                            {priceData.map((pkg) => (
                                <option key={pkg.id} value={pkg.title}>
                                    {pkg.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                        <FormattedMessage id="messageLabel" defaultMessage="Message:"/>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className={styles.textarea}
                        placeholder="Your message..."
                        {...register("message", {required: true})}
                    ></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
                    <FormattedMessage id="sendMessage" defaultMessage="Send Message"/>
                </button>
            </form>
        </div>
    );
};

export default ContactPage;