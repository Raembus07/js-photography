import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {FormattedMessage} from 'react-intl';
import {useForm} from 'react-hook-form';
import styles from '@/styles/contact.module.css';
import {motion} from 'framer-motion';
import Footer from "@/components/Footer";

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
        <motion.div
            className={styles.container}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
        >
            <motion.h1
                className={styles.heading}
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <FormattedMessage id="contactTitle" defaultMessage="Contact Me"/>
            </motion.h1>
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.contactForm}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2, duration: 0.5}}
            >
                <FormField
                    index={0}
                    label={<FormattedMessage id="nameLabel" defaultMessage="Name:"/>}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    register={register}
                />

                <FormField
                    index={1}
                    label={<FormattedMessage id="emailLabel" defaultMessage="Email:"/>}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email address"
                    register={register}
                />

                <FormField
                    index={2}
                    label={<FormattedMessage id="subjectLabel" defaultMessage="Subject:"/>}
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    register={register}
                />

                <motion.div
                    className={styles.formGroup}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3 + 3 * 0.1, duration: 0.5}}
                >
                    <label htmlFor="topic" className={styles.label}>
                        <FormattedMessage id="topicLabel" defaultMessage="Topic:"/>
                    </label>
                    <motion.select
                        id="topic"
                        name="topic"
                        className={styles.select}
                        whileTap={{scale: 0.98}}
                        whileFocus={{scale: 1.02}}
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
                    </motion.select>
                </motion.div>

                {watchTopic === "book package" && (
                    <motion.div
                        className={styles.formGroup}
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.4}}
                    >
                        <label htmlFor="package" className={styles.label}>
                            <FormattedMessage id="packageLabel" defaultMessage="Package:"/>
                        </label>
                        <motion.select
                            id="package"
                            name="package"
                            className={styles.select}
                            whileTap={{scale: 0.98}}
                            whileFocus={{scale: 1.02}}
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
                        </motion.select>
                    </motion.div>
                )}

                <motion.div
                    className={styles.formGroup}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3 + 4 * 0.1, duration: 0.5}}
                >
                    <label htmlFor="message" className={styles.label}>
                        <FormattedMessage id="messageLabel" defaultMessage="Message:"/>
                    </label>
                    <motion.textarea
                        id="message"
                        name="message"
                        className={styles.textarea}
                        placeholder="Your message..."
                        whileFocus={{scale: 1.01, boxShadow: "0 0 8px rgba(0,0,0,0.1)"}}
                        {...register("message", {required: true})}
                    ></motion.textarea>
                </motion.div>

                <motion.button
                    type="submit"
                    className={styles.submitButton}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8, duration: 0.5}}
                    whileHover={{scale: 1.05, backgroundColor: "#333"}}
                    whileTap={{scale: 0.95}}
                >
                    <FormattedMessage id="sendMessage" defaultMessage="Send Message"/>
                </motion.button>
            </motion.form>
            <Footer/>
        </motion.div>
    );
};

// Reusable form field component with animations
const FormField = ({index, label, type, id, name, placeholder, register}) => {
    return (
        <motion.div
            className={styles.formGroup}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3 + index * 0.1, duration: 0.5}}
        >
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <motion.input
                type={type}
                id={id}
                name={name}
                className={styles.input}
                placeholder={placeholder}
                whileFocus={{scale: 1.02, boxShadow: "0 0 8px rgba(0,0,0,0.1)"}}
                {...register(name, {required: true})}
            />
        </motion.div>
    );
};

export default ContactPage;