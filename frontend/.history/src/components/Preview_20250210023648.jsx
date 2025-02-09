import React from 'react';
import { resumeThemes } from './ThemeConfig';

export default function Preview({ data, theme = 'classic', accentColor }) {
  const themeStyles = resumeThemes[theme]?.styles || resumeThemes.classic.styles;
  
  const accentClasses = {
    'text-blue-600': accentColor === 'blue',
    'text-emerald-600': accentColor === 'emerald',
    'text-purple-600': accentColor === 'purple',
    'text-rose-600': accentColor === 'rose',
    'text-amber-600': accentColor === 'amber'
  };

  const accentBgClasses = {
    'bg-blue-600': accentColor === 'blue',
    'bg-emerald-600': accentColor === 'emerald',
    'bg-purple-600': accentColor === 'purple',
    'bg-rose-600': accentColor === 'rose',
    'bg-amber-600': accentColor === 'amber'
  };

  return (
    <div className={themeStyles.container}>
      {/* Header */}
      <header className={themeStyles.header}>
        {data.personalInfo.name ? (
          <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
            {data.personalInfo.name}
          </h1>
        ) : (
          <div className="h-12 bg-gray-100 rounded-lg w-64 mx-auto mb-3" />
        )}
        <div className={themeStyles.contact}>
          {data.personalInfo.email || data.personalInfo.phone ? (
            <p className="flex items-center justify-center gap-2">
              {data.personalInfo.email}
              {data.personalInfo.email && data.personalInfo.phone && 
                <span className="w-1 h-1 rounded-full bg-gray-400" />
              }
              {data.personalInfo.phone}
            </p>
          ) : (
            <div className="h-5 bg-gray-100 rounded w-72 mx-auto mb-2" />
          )}
          {data.personalInfo.location && (
            <p>{data.personalInfo.location}</p>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Professional Summary
          </h2>
          <p className={themeStyles.description}>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                <h3 className={`${themeStyles.itemTitle} ${accentClasses[accentColor]}`}>
                  {exp.position}
                </h3>
                <span className={themeStyles.dates}>
                  {exp.startDate} - {exp.endDate || 'Present'}
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
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                <h3 className={`${themeStyles.itemTitle} ${accentClasses[accentColor]}`}>
                  {edu.school}
                </h3>
                <span className={themeStyles.dates}>
                  {edu.startDate} - {edu.endDate || 'Present'}
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
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                <h3 className={`${themeStyles.itemTitle} ${accentClasses[accentColor]}`}>
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm hover:underline ${accentClasses[accentColor]}`}
                  >
                    View Project →
                  </a>
                )}
              </div>
              <p className={themeStyles.description}>{project.description}</p>
              {project.technologies?.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium mr-2">Technologies:</span>
                  {project.technologies.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className={`${themeStyles.skills} ${
                  theme === 'modern' ? accentBgClasses[accentColor] : ''
                }`}
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
            <p className="text-lg">Start adding your information to preview your resume</p>
            <p className="text-sm mt-2">Your changes will appear here in real-time</p>
          </div>
        )}
    </div>
  );
}