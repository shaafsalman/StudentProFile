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

  const renderDefaultLayout = () => (
    <>
      <header className={themeStyles.header}>
        <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {data.personalInfo.email && (
              <span>{data.personalInfo.email}</span>
            )}
            {data.personalInfo.email && data.personalInfo.phone && (
              <span className="w-1 h-1 rounded-full bg-gray-400" />
            )}
            {data.personalInfo.phone && (
              <span>{data.personalInfo.phone}</span>
            )}
          </div>
          {data.personalInfo.location && (
            <div className="mt-1">{data.personalInfo.location}</div>
          )}
        </div>
      </header>

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

      {data.education.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
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
                <div className="mt-2">
                  <span className="font-medium mr-2">Technologies:</span>
                  {project.technologies.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className={themeStyles.skills}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );


  const renderProfessionalPlusLayout = () => (
    <>
      <div className={themeStyles.sidebar}>
        <div className={themeStyles.sidebarWrapper}>
          <div className={themeStyles.sidebarSection}>
            <h2 className={themeStyles.sidebarTitle}>Contact</h2>
            <div className={themeStyles.sidebarContent}>
              {data.personalInfo.email && (
                <div className="mb-1">{data.personalInfo.email}</div>
              )}
              {data.personalInfo.phone && (
                <div className="mb-1">{data.personalInfo.phone}</div>
              )}
              {data.personalInfo.location && (
                <div>{data.personalInfo.location}</div>
              )}
            </div>
          </div>

          {data.skills.length > 0 && (
            <div className={themeStyles.sidebarSection}>
              <h2 className={themeStyles.sidebarTitle}>Skills</h2>
              <div className={themeStyles.skillsGrid}>
                {data.skills.map((skill, index) => (
                  <span key={index} className={themeStyles.skills}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className={themeStyles.sidebarSection}>
              <h2 className={themeStyles.sidebarTitle}>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className={themeStyles.sidebarItem}>
                  <h3 className="text-white font-medium mb-1">{edu.school}</h3>
                  <p className={themeStyles.sidebarContent}>
                    {edu.degree}
                    {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  </p>
                  <span className="text-gray-500 text-xs">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={themeStyles.mainWrapper}>
        <header className={themeStyles.header}>
          <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
            {data.personalInfo.name || 'Your Name'}
          </h1>
          {data.personalInfo.summary && (
            <p className={themeStyles.description}>{data.personalInfo.summary}</p>
          )}
        </header>

        <main className={themeStyles.main}>
          {data.experience.length > 0 && (
            <section className={themeStyles.mainSection}>
              <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className={themeStyles.experienceHeader}>
                    <div>
                      <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                      <p className={themeStyles.itemSubtitle}>{exp.company}</p>
                    </div>
                    <span className={themeStyles.dates}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className={themeStyles.description}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className={themeStyles.mainSection}>
              <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
                Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className={themeStyles.projectCard}>
                  <div className="flex items-baseline gap-3 mb-2">
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
                    <div className="mt-3">
                      <div className="text-sm text-gray-500">
                        {project.technologies.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </>
  );

  const renderMinimalistCardsLayout = () => (
    <>
      <header className={themeStyles.header}>
        <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.email && data.personalInfo.phone && 
            <span className="w-1 h-1 rounded-full bg-gray-300" />
          }
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{data.personalInfo.location}</span>
            </>
          )}
        </div>
      </header>

      {data.personalInfo.summary && (
        <section className={themeStyles.sectionContainer}>
          <div className={themeStyles.cardHeader}>
            <h2 className={themeStyles.cardTitle}>About</h2>
          </div>
          <p className={themeStyles.description}>{data.personalInfo.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <div className={themeStyles.cardHeader}>
            <h2 className={themeStyles.cardTitle}>Experience</h2>
          </div>
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

      {data.education.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <div className={themeStyles.cardHeader}>
            <h2 className={themeStyles.cardTitle}>Education</h2>
          </div>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
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

      {data.projects.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <div className={themeStyles.cardHeader}>
            <h2 className={themeStyles.cardTitle}>Projects</h2>
          </div>
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
                <div className="mt-2">
                  <span className="font-medium mr-2">Technologies:</span>
                  {project.technologies.join(' • ')}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <div className={themeStyles.cardHeader}>
            <h2 className={themeStyles.cardTitle}>Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className={themeStyles.skills}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );

  const renderDynamicTechLayout = () => (
    <>
      <header className={themeStyles.header}>
        <h1 className={themeStyles.name}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && (
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.location && (
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              {data.personalInfo.location}
            </span>
          )}
        </div>
      </header>

      <div className={themeStyles.mainContent}>
        {data.personalInfo.summary && (
          <div className={themeStyles.featureBox}>
            <p className={themeStyles.description}>
              <span className="font-mono text-blue-300">{'>'}</span>{' '}
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {data.skills.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} border-blue-400`}>
              Technical Proficiencies
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <span key={index} className={themeStyles.skills}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className={themeStyles.separator} />

        {data.experience.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} border-emerald-400`}>
              Professional Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div>
                    <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                    <p className={themeStyles.itemSubtitle}>{exp.company}</p>
                  </div>
                  <span className={themeStyles.dates}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className={themeStyles.description}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} border-purple-400`}>
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {data.projects.map((project, index) => (
                <div key={index} className={themeStyles.featureBox}>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className={themeStyles.itemTitle}>{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                  <p className={themeStyles.description}>{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs text-gray-400 font-mono">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={themeStyles.separator} />

        {data.education.length > 0 && (
          <section className={themeStyles.sectionContainer}>
            <h2 className={`${themeStyles.sectionTitle} border-rose-400`}>
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
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
      </div>
    </>
  );

  const renderMagazineLayout = () => (
    <>
      <header className={themeStyles.header}>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        <h1 className={`${themeStyles.name} ${accentClasses[accentColor]}`}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
      </header>

      <div className={themeStyles.gridLayout}>
        <div className={themeStyles.mainColumn}>
          {data.personalInfo.summary && (
            <div className="mb-16">
              <p className={themeStyles.description}>
                <span className={themeStyles.dropcap}>
                  {data.personalInfo.summary.charAt(0)}
                </span>
                {data.personalInfo.summary.slice(1)}
              </p>
            </div>
          )}

          {data.experience.length > 0 && (
            <section className={themeStyles.sectionContainer}>
              <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-10 last:mb-0">
                  <div className="mb-2">
                    <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                    <div className="flex justify-between items-baseline mt-1">
                      <p className={themeStyles.itemSubtitle}>{exp.company}</p>
                      <span className={themeStyles.dates}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                  </div>
                  <p className={themeStyles.description}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className={themeStyles.sectionContainer}>
              <h2 className={`${themeStyles.sectionTitle} ${accentClasses[accentColor]}`}>
                Selected Projects
              </h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className={themeStyles.itemTitle}>{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm italic hover:underline ${accentClasses[accentColor]}`}
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                  <p className={themeStyles.description}>{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="mt-3">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className={themeStyles.skills}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className={themeStyles.sideColumn}>
          {data.skills.length > 0 && (
            <div className={themeStyles.featureBox}>
              <h2 className="font-serif text-xl font-bold mb-4">Areas of Expertise</h2>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className={themeStyles.skills}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold mb-4">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-6 last:mb-0">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
  const renderWallStreetLayout = () => (
    <div className={themeStyles.innerContainer}>
      <header className={themeStyles.header}>
        <div className={themeStyles.headerBorder}>
          <div className="w-4 h-4 border-t-2 border-l-2 border-gray-900" />
          <div className="w-4 h-4 border-t-2 border-r-2 border-gray-900" />
        </div>
        <h1 className={themeStyles.name}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && (
            <span className="font-serif">{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span className="font-serif">{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.location && (
            <span className="font-serif">{data.personalInfo.location}</span>
          )}
        </div>
      </header>

      {data.personalInfo.summary && (
        <section className={themeStyles.sectionContainer}>
          <div className={themeStyles.contentBox}>
            <p className="font-serif text-gray-700 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex justify-between items-baseline flex-wrap gap-4 mb-2">
                <div>
                  <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                  <p className={themeStyles.itemSubtitle}>{exp.company}</p>
                </div>
                <span className={themeStyles.dates}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </span>
              </div>
              <div className={themeStyles.contentBox}>
                <p className={themeStyles.description}>{exp.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <div className={themeStyles.decorativeLine} />

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          {data.education.length > 0 && (
            <section className={themeStyles.sectionContainer}>
              <h2 className={themeStyles.sectionTitle}>
                Education
              </h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="mb-1">
                    <h3 className={themeStyles.itemTitle}>{edu.school}</h3>
                    <p className={themeStyles.itemSubtitle}>
                      {edu.degree}
                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    </p>
                  </div>
                  <span className={themeStyles.dates}>
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {data.skills.length > 0 && (
            <section className={themeStyles.sectionContainer}>
              <h2 className={themeStyles.sectionTitle}>
                Core Competencies
              </h2>
              <div className="flex flex-wrap">
                {data.skills.map((skill, index) => (
                  <span key={index} className={themeStyles.skills}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {data.projects.length > 0 && (
        <section className={themeStyles.sectionContainer}>
          <h2 className={themeStyles.sectionTitle}>
            Notable Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className={themeStyles.itemTitle}>{project.title}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    View Details →
                  </a>
                )}
              </div>
              <div className={themeStyles.contentBox}>
                <p className={themeStyles.description}>{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Technologies: </span>
                    <span className="text-gray-600">{project.technologies.join(' • ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      <footer className={themeStyles.footer}>
        References Available Upon Request
      </footer>
    </div>
  );
  const renderAppleMinimalLayout = () => (
    <>
      <header className={themeStyles.header}>
        <h1 className={themeStyles.name}>
          {data.personalInfo.name || 'Your Name'}
        </h1>
        <div className={themeStyles.contact}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </header>

      <div className={themeStyles.grid}>
        <div className={themeStyles.mainContent}>
          {data.personalInfo.summary && (
            <section className={`${themeStyles.sectionContainer} ${themeStyles.subtleBox}`}>
              <p className={themeStyles.summaryText}>
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className={themeStyles.sectionContainer}>
              <h2 className={themeStyles.sectionTitle}>Experience</h2>
              <div>
                {data.experience.map((exp, index) => (
                  <div key={index} className={themeStyles.experienceCard}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className={themeStyles.itemTitle}>{exp.position}</h3>
                        <p className={themeStyles.itemSubtitle}>{exp.company}</p>
                      </div>
                      <span className={themeStyles.dates}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section className={themeStyles.sectionContainer}>
              <h2 className={themeStyles.sectionTitle}>Projects</h2>
              <div className="space-y-3">
                {data.projects.map((project, index) => (
                  <div key={index} className={themeStyles.projectCard}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={themeStyles.itemTitle}>{project.title}</h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${themeStyles.button} ${themeStyles.hoverReveal}`}
                        >
                          View →
                        </a>
                      )}
                    </div>
                    <p className={themeStyles.description}>{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className={themeStyles.skills}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={themeStyles.sidebar}>
          {data.skills.length > 0 && (
            <div className={themeStyles.sidebarSection}>
              <h2 className={themeStyles.sidebarTitle}>Skills</h2>
              <div className={themeStyles.skillsGrid}>
                {data.skills.map((skill, index) => (
                  <span key={index} className={themeStyles.skills}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.education.length > 0 && (
            <div className={themeStyles.sidebarSection}>
              <h2 className={themeStyles.sidebarTitle}>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-3 last:mb-0">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
  const renderContent = () => {
    switch (theme) {
      case 'modern':
        return renderModernLayout();
      case 'creative':
        return renderCreativeLayout();
      case 'professionalPlus':
        return renderProfessionalPlusLayout();
      case 'minimalistCards':
        return renderMinimalistCardsLayout();
      case 'dynamicTech':
        return renderDynamicTechLayout();
      case 'magazine':
        return renderMagazineLayout();
      case 'wallStreet':
        return renderWallStreetLayout();
      case 'appleMinimal':
        return renderAppleMinimalLayout();
      default:
        return renderDefaultLayout();
    }
  };

  return (
    <div className={themeStyles.container}>
      {renderContent()}
      
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