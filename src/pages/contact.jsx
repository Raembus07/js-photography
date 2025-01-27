import React, { useState, useEffect } from 'react';
    import { useRouter } from 'next/router';
    import { FormattedMessage } from 'react-intl';
    import styles from '@/styles/contact.module.css';

    const ContactPage = () => {
        const [topics, setTopics] = useState([]);
        const [packages, setPackages] = useState([]);

        const [formData, setFormData] = useState({
            name: '',
            email: '',
            subject: '',
            topic: '',
            package: '',
            message: ''
        });

        const router = useRouter();

        useEffect(() => {
            fetch('/contactTopics.json')
                .then((response) => response.json())
                .then((data) => setTopics(data))
                .catch((err) => console.error(err));

            fetch('/priceData.json')
                .then((response) => response.json())
                .then((data) => setPackages(data))
                .catch((err) => console.error(err));

            const { topic, package: packageParam, subject } = router.query;

            if (topic || packageParam || subject) {
                setFormData((prev) => ({
                    ...prev,
                    topic: topic || prev.topic,
                    package: packageParam || prev.package,
                    subject: subject || prev.subject,
                }));
            }
        }, [router.query]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', topic: '', package: '', message: '' });
                await router.push('/')
            } else {
                alert('There was a problem. Please try again.');
            }
        };

        return (
            <div className={styles.container}>
                <h1 className={styles.heading}>
                    <FormattedMessage id="contactTitle" defaultMessage="Contact Me" />
                </h1>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            <FormattedMessage id="nameLabel" defaultMessage="Name:" />
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            <FormattedMessage id="emailLabel" defaultMessage="Email:" />
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email address"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="subject" className={styles.label}>
                            <FormattedMessage id="subjectLabel" defaultMessage="Subject:" />
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className={styles.input}
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject of your message"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="topic" className={styles.label}>
                            <FormattedMessage id="topicLabel" defaultMessage="Topic:" />
                        </label>
                        <select
                            id="topic"
                            name="topic"
                            className={styles.select}
                            value={formData.topic}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                <FormattedMessage id="selectTopic" defaultMessage="Select a topic" />
                            </option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.title}>
                                    {topic.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {formData.topic === "book package" && (
                        <div className={styles.formGroup}>
                            <label htmlFor="package" className={styles.label}>
                                <FormattedMessage id="packageLabel" defaultMessage="Package:" />
                            </label>
                            <select
                                id="package"
                                name="package"
                                className={styles.select}
                                value={formData.package}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    <FormattedMessage id="selectPackage" defaultMessage="Select a package" />
                                </option>
                                {packages.map((pkg) => (
                                    <option key={pkg.id} value={pkg.title}>
                                        {pkg.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>
                            <FormattedMessage id="messageLabel" defaultMessage="Message:" />
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className={styles.textarea}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message..."
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        <FormattedMessage id="sendMessage" defaultMessage="Send Message" />
                    </button>
                </form>
            </div>
        );
    };

    export default ContactPage;