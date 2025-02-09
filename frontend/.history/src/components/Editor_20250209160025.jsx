import React from 'react';
import { Plus, Trash2, Briefcase, GraduationCap, FolderGit2, Wrench } from 'lucide-react';

export default function Editor({ data, setData }) {
  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...data.education,
        { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' },
      ],
    });
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        { company: '', position: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [...data.projects, { title: '', description: '', technologies: [] }],
    });
  };

  const addSkill = () => {
    setData({
      ...data,
      skills: [...data.skills, ''],
    });
  };

  return (
    <div className="h-full overflow-y-auto divide-y divide-gray-200">
      {/* Personal Information */}
      <section className="p-6 space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={data.personalInfo.name}
            onChange={(e) =>
              setData({
                ...data,
                personalInfo: { ...data.personalInfo, name: e.target.value },
              })
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={data.personalInfo.email}
              onChange={(e) =>
                setData({
                  ...data,
                  personalInfo: { ...data.personalInfo, email: e.target.value },
                })
              }
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={data.personalInfo.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  personalInfo: { ...data.personalInfo, phone: e.target.value },
                })
              }
            />
          </div>
          <input
            type="text"
            placeholder="Location (e.g., City, Country)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={data.personalInfo.location}
            onChange={(e) =>
              setData({
                ...data,
                personalInfo: { ...data.personalInfo, location: e.target.value },
              })
            }
          />
          <textarea
            placeholder="Professional Summary"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            value={data.personalInfo.summary}
            onChange={(e) =>
              setData({
                ...data,
                personalInfo: { ...data.personalInfo, summary: e.target.value },
              })
            }
          />
        </div>
      </section>

      {/* Experience */}
      <section className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-gray-700">Position {index + 1}</h3>
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      experience: data.experience.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...data.experience];
                    newExperience[index] = { ...exp, company: e.target.value };
                    setData({ ...data, experience: newExperience });
                  }}
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperience = [...data.experience];
                    newExperience[index] = { ...exp, position: e.target.value };
                    setData({ ...data, experience: newExperience });
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={exp.startDate}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[index] = { ...exp, startDate: e.target.value };
                      setData({ ...data, experience: newExperience });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={exp.endDate}
                    onChange={(e) => {
                      const newExperience = [...data.experience];
                      newExperience[index] = { ...exp, endDate: e.target.value };
                      setData({ ...data, experience: newExperience });
                    }}
                  />
                </div>
                <textarea
                  placeholder="Description"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                  value={exp.description}
                  onChange={(e) => {
                    const newExperience = [...data.experience];
                    newExperience[index] = { ...exp, description: e.target.value };
                    setData({ ...data, experience: newExperience });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Education</h2>
          </div>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-gray-700">Education {index + 1}</h3>
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      education: data.education.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="School"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={edu.school}
                  onChange={(e) => {
                    const newEducation = [...data.education];
                    newEducation[index] = { ...edu, school: e.target.value };
                    setData({ ...data, education: newEducation });
                  }}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...data.education];
                    newEducation[index] = { ...edu, degree: e.target.value };
                    setData({ ...data, education: newEducation });
                  }}
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={edu.fieldOfStudy}
                  onChange={(e) => {
                    const newEducation = [...data.education];
                    newEducation[index] = { ...edu, fieldOfStudy: e.target.value };
                    setData({ ...data, education: newEducation });
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[index] = { ...edu, startDate: e.target.value };
                      setData({ ...data, education: newEducation });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEducation = [...data.education];
                      newEducation[index] = { ...edu, endDate: e.target.value };
                      setData({ ...data, education: newEducation });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-gray-700">Project {index + 1}</h3>
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      projects: data.projects.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index] = { ...project, title: e.target.value };
                    setData({ ...data, projects: newProjects });
                  }}
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index] = { ...project, description: e.target.value };
                    setData({ ...data, projects: newProjects });
                  }}
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={project.technologies.join(', ')}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index] = {
                      ...project,
                      technologies: e.target.value.split(',').map((t) => t.trim()),
                    };
                    setData({ ...data, projects: newProjects });
                  }}
                />
                <input
                  type="url"
                  placeholder="Project Link (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={project.link || ''}
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index] = { ...project, link: e.target.value };
                    setData({ ...data, projects: newProjects });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          </div>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
          >
            <Plus size={16} /> Add Skill
          </button>
        </div>
        <div className="space-y-3">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Skill"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index] = e.target.value;
                  setData({ ...data, skills: newSkills });
                }}
              />
              <button
                onClick={() =>
                  setData({
                    ...data,
                    skills: data.skills.filter((_, i) => i !== index),
                  })
                }
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}