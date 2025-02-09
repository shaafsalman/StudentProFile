import React from 'react';
import 

export default function Preview({ data, theme, accentColor }) {
  // Get theme-specific styles
  const themeStyles = resumeThemes[theme]?.styles || resumeThemes.classic.styles;

  return (
    <div className={`${themeStyles.container}`}>
      {/* Header */}
      <div className={`${themeStyles.header}`}>
        {data.personalInfo.name ? (
          <h1 className={`${themeStyles.name} ${accentColor}`}>{data.personalInfo.name}</h1>
        ) : (
          <div className="h-9 bg-gray-100 rounded-lg w-48 mx-auto mb-2" />
        )}
        <div className={themeStyles.contact}>
          {data.personalInfo.email || data.personalInfo.phone ? (
            <p>
              {data.personalInfo.email}
              {data.personalInfo.email && data.personalInfo.phone && ' | '}
              {data.personalInfo.phone}
            </p>
          ) : (
            <div className="h-5 bg-gray-100 rounded w-64 mx-auto" />
          )}
          {data.personalInfo.location ? (
            <p>{data.personalInfo.location}</p>
          ) : (
            <div className="h-5 bg-gray-100 rounded w-32 mx-auto" />
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentColor}`}>
            Professional Summary
          </h2>
          <p className={themeStyles.description}>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentColor}`}>Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`${themeStyles.itemTitle} ${accentColor}`}>{exp.position}</h3>
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
          <h2 className={`${themeStyles.sectionTitle} ${accentColor}`}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`${themeStyles.itemTitle} ${accentColor}`}>{edu.school}</h3>
                <span className={themeStyles.dates}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className={themeStyles.itemSubtitle}>
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentColor}`}>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className={`${themeStyles.itemTitle} ${accentColor} mb-2`}>
                {project.title}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-2 text-sm font-normal"
                  >
                    (View Project)
                  </a>
                )}
              </h3>
              <p className={themeStyles.description}>{project.description}</p>
              {project.technologies.length > 0 && (
                <p className={themeStyles.itemSubtitle}>
                  <span className="font-medium">Technologies:</span>{' '}
                  {project.technologies.join(', ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentColor}`}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className={`${themeStyles.skills} ${accentColor}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!data.personalInfo.name &&
        !data.experience.length &&
        !data.education.length &&
        !data.projects.length &&
        !data.skills.length && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg">Start adding your information to see the preview</p>
          </div>
        )}
    </div>
  );
}

