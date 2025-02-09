import React from 'react';

export default function Preview({ data }) {
  return (
    <div className="p-8 bg-white shadow-lg max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        {data.personalInfo.name ? (
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>
        ) : (
          <div className="h-9 bg-gray-100 rounded-lg w-48 mx-auto mb-2" />
        )}
        <div className="text-gray-600 space-y-1">
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
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-3 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-1">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
              <p className="text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-1">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{edu.school}</h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-gray-700">
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-1">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
              <p className="text-gray-600 mb-2 leading-relaxed">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-gray-700">
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
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-4 py-1.5 rounded-full text-gray-700 text-sm"
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