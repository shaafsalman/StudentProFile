import React from 'react';
import { resumeThemes } from './ThemeConfig';

export default function Preview({ data, theme = 'classic' }) {
  const themeStyles = resumeThemes[theme].styles;

  return (
    <div className={`${themeStyles.container} h-[calc(100vh-100px)] w-screen  overflow-y-auto`}>
      {/* Header */}
      <div className={themeStyles.header}>
        <h1 className={themeStyles.name}>{data.personalInfo.name}</h1>
        <div className={themeStyles.contact}>
          <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>Professional Summary</h2>
          <p className={themeStyles.description}>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                <span className={themeStyles.dates}>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className={themeStyles.itemSubtitle}>{exp.company}</p>
              <p className={themeStyles.description}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
                <span className={themeStyles.dates}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className={themeStyles.itemSubtitle}>
                {edu.degree} in {edu.fieldOfStudy}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className={themeStyles.itemTitle}>
                {project.title}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 ml-2 text-sm"
                  >
                    (View Project)
                  </a>
                )}
              </h3>
              <p className={themeStyles.description}>{project.description}</p>
              <p className="mt-1">
                <span className={themeStyles.itemTitle}>Technologies:</span>{' '}
                {project.technologies.join(', ')}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className={themeStyles.skills}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}