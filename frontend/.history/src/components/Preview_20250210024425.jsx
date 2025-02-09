// Preview.jsx
import React from 'react';
import { resumeThemes } from './ThemeConfig';

export default function Preview({ data, theme = 'classic', accentColor }) {
  const themeStyles = resumeThemes[theme]?.styles || resumeThemes.classic.styles;
  
  const accentClasses = {
    'text-blue-600': accentColor === 'blue',
    'text-emerald-600': accentColor === 'emerald',
    'text-purple-600': accentColor === 'purple',
    'text-rose-600': accentColor === 'rose',
    'text-amber-600': accentColor === 'amber',
    'border-blue-600': accentColor === 'blue',
    'border-emerald-600': accentColor === 'emerald',
    'border-purple-600': accentColor === 'purple',
    'border-rose-600': accentColor === 'rose',
    'border-amber-600': accentColor === 'amber',
    'bg-blue-600': accentColor === 'blue',
    'bg-emerald-600': accentColor === 'emerald',
    'bg-purple-600': accentColor === 'purple',
    'bg-rose-600': accentColor === 'rose',
    'bg-amber-600': accentColor === 'amber'
  };

  const renderModernLayout = () => (
    <>
      <header className={themeStyles.header}>
        <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>
      
      <div className={themeStyles.sidebar}>
        {data.skills.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Skills
            </h2>
            <div className="flex flex-col gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className={themeStyles.skills}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        
        {data.education.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
                <p className={themeStyles.itemSubtitle}>
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </p>
                <span className={themeStyles.dates}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </span>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className={themeStyles.main}>
        {data.personalInfo.summary && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Professional Summary
            </h2>
            <p className={themeStyles.description}>{data.personalInfo.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                  <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
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

        {data.projects.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Projects
            </h2>
            {data.projects.map((project, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                  <h3 className={themeStyles.itemTitle}>{project.title}</h3>
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
                  <div className="mt-2 text-sm">
                    <span className="font-medium mr-2">Technologies:</span>
                    {project.technologies.join(' • ')}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );

  const renderCreativeLayout = () => (
    <>
      <header className={themeStyles.header}>
        <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
        </div>
      </header>

      {data.personalInfo.summary && (
        <>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Summary
          </h2>
          <div className={themeStyles.mainContent}>
            <p className={themeStyles.description}>{data.personalInfo.summary}</p>
          </div>
        </>
      )}

      {data.experience.length > 0 && data.experience.map((exp, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Experience
            </h2>
          )}
          <div className={themeStyles.mainContent}>
            <div className="mb-8 last:mb-0">
              <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
              <p className={themeStyles.itemSubtitle}>{exp.company}</p>
              <div className={themeStyles.dates}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </div>
              <p className={themeStyles.description}>{exp.description}</p>
            </div>
          </div>
        </React.Fragment>
      ))}

      {data.education.length > 0 && data.education.map((edu, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Education
            </h2>
          )}
          <div className={themeStyles.mainContent}>
            <div className="mb-6 last:mb-0">
              <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
              <p className={themeStyles.itemSubtitle}>
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </p>
              <div className={themeStyles.dates}>
                {edu.startDate} - {edu.endDate || 'Present'}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}

      {data.skills.length > 0 && (
        <>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Skills
          </h2>
          <div className={themeStyles.mainContent}>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className={themeStyles.skills}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {data.projects.length > 0 && data.projects.map((project, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
              Projects
            </h2>
          )}
          <div className={themeStyles.mainContent}>
            <div className="mb-6 last:mb-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className={themeStyles.itemTitle}>{project.title}</h3>
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
                <div className="mt-2 text-sm">
                  <span className="font-medium mr-2">Technologies:</span>
                  {project.technologies.join(' • ')}
                </div>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );

