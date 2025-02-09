import React from 'react';
import { resumeThemes } from './ThemeConfig';

export default function Preview({ data, theme = 'classic' }) {
  const themeStyles = resumeThemes[theme].styles;

  // Helper function to truncate text if it's too long
  const truncateText = (text, maxLength = 500) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div 
      id="resume-preview"
      className={`${themeStyles.container} w-[210mm] min-h-[297mm] max-h-[297mm] overflow-hidden text-[12px] leading-tight mx-auto shadow-lg`}
    >
      {/* Header */}
      <div className={`${themeStyles.header} break-inside-avoid`}>
        <h1 className={`${themeStyles.name} text-center`}>{data.personalInfo.name}</h1>
        <div className={`${themeStyles.contact} text-center`}>
          <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className={`${themeStyles.sectionContainer} break-inside-avoid`}>
          <h2 className={themeStyles.sectionTitle}>Professional Summary</h2>
          <p className={themeStyles.description}>
            {truncateText(data.personalInfo.summary, 300)}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={`${themeStyles.sectionContainer} break-inside-avoid`}>
          <h2 className={themeStyles.sectionTitle}>Experience</h2>
          {data.experience.slice(0, 3).map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                <span className={themeStyles.dates}>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className={themeStyles.itemSubtitle}>{exp.company}</p>
              <p className={`${themeStyles.description} line-clamp-3`}>
                {truncateText(exp.description, 200)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className={`${themeStyles.sectionContainer} break-inside-avoid`}>
          <h2 className={themeStyles.sectionTitle}>Education</h2>
          {data.education.slice(0, 2).map((edu, index) => (
            <div key={index} className="mb-2">
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
        <section className={`${themeStyles.sectionContainer} break-inside-avoid`}>
          <h2 className={themeStyles.sectionTitle}>Projects</h2>
          {data.projects.slice(0, 2).map((project, index) => (
            <div key={index} className="mb-2">
              <h3 className={themeStyles.itemTitle}>
                {project.title}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 ml-2 text-[10px]"
                  >
                    (View Project)
                  </a>
                )}
              </h3>
              <p className={`${themeStyles.description} line-clamp-2`}>
                {truncateText(project.description, 150)}
              </p>
              <p className="mt-1 text-[10px]">
                <span className={themeStyles.itemTitle}>Technologies:</span>{' '}
                {project.technologies.slice(0, 5).join(', ')}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className={`${themeStyles.sectionContainer} break-inside-avoid`}>
          <h2 className={themeStyles.sectionTitle}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.slice(0, 10).map((skill, index) => (
              <span
                key={index}
                className={`${themeStyles.skills} text-[10px] mb-1`}
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