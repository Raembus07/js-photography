import React from 'react';
import { useRouter } from 'next/router';
import { IntlProvider, FormattedMessage, useIntl } from 'react-intl';
import styles from '@/styles/unpublishedProjects.module.css';
import en from '@/messages/en.json';

const UnpublishedProjects = ({ locale }) => {
  const router = useRouter();
  const messages = locale === 'de' ? de : en;
  const intl = useIntl();

  const videoProjects = [
    {
      id: 1,
      title: intl.formatMessage({ id: 'videoProject1Title' }),
      description: intl.formatMessage({ id: 'videoProject1Description' }),
      videoUrl: intl.formatMessage({ id: 'videoProject1VideoUrl' })
    },
    {
      id: 2,
      title: intl.formatMessage({ id: 'videoProject2Title' }),
      description: intl.formatMessage({ id: 'videoProject2Description' }),
      videoUrl: intl.formatMessage({ id: 'videoProject2VideoUrl' })
    },
    {
      id: 3,
      title: intl.formatMessage({ id: 'videoProject3Title' }),
      description: intl.formatMessage({ id: 'videoProject3Description' }),
      videoUrl: intl.formatMessage({ id: 'videoProject3VideoUrl' })
    }
  ];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <main className={styles.container}>
        <h1 className={styles.pageTitle}>
          <FormattedMessage id="unpublishedProjectsTitle" />
        </h1>

        <div className={styles.projectsContainer}>
          {videoProjects.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.videoContainer}>
                <iframe
                  src={project.videoUrl}
                  className={styles.video}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              </div>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <p className={styles.projectDescription}>{project.description}</p>
            </div>
          ))}
        </div>
      </main>
    </IntlProvider>
  );
};

UnpublishedProjects.getInitialProps = async ({ locale }) => {
  return { locale };
};

export default UnpublishedProjects;