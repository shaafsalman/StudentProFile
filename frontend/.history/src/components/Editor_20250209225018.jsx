import React from 'react';
import { Plus, Trash2, Briefcase, GraduationCap, FolderGit2, Wrench } from 'lucide-react';

const InputField = ({ value, onChange, placeholder, type = "text", rows }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Section = ({ title, icon: Icon, children, onAdd, addText }) => (
  <section className="p-4 space-y-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">{title}</h2>
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
          <Plus size={14} /> {addText}
        </button>
      )}
    </div>
    {children}
  </section>
);

const ItemCard = ({ title, onDelete, children }) => (
  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
    <div className="flex justify-between items-center">
      <h3 className="font-medium text-slate-700 dark:text-slate-300">{title}</h3>
      <button onClick={onDelete} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors">
        <Trash2 size={16} />
      </button>
    </div>
    {children}
  </div>
);

export default function Editor({ data, setData }) {
  const updatePersonalInfo = (field, value) => {
    setData({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  return (
    <div className="h-full overflow-y-auto">
      <Section title="Personal Information">
        <div className="space-y-3">
          <InputField 
            value={data.personalInfo.name} 
            onChange={(v) => updatePersonalInfo('name', v)}
            placeholder="Full Name"
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField 
              value={data.personalInfo.email}
              onChange={(v) => updatePersonalInfo('email', v)}
              placeholder="Email"
              type="email"
            />
            <InputField 
              value={data.personalInfo.phone}
              onChange={(v) => updatePersonalInfo('phone', v)}
              placeholder="Phone"
              type="tel"
            />
          </div>
          <InputField 
            value={data.personalInfo.location}
            onChange={(v) => updatePersonalInfo('location', v)}
            placeholder="Location"
          />
          <textarea
            placeholder="Professional Summary"
            className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
            rows={4}
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          />
        </div>
      </Section>

      <Section 
        title="Experience" 
        icon={Briefcase}
        onAdd={() => setData({
          ...data,
          experience: [...data.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
        })}
        addText="Add Experience"
      >
        <div className="space-y-3">
          {data.experience.map((exp, index) => (
            <ItemCard 
              key={index}
              title={`Position ${index + 1}`}
              onDelete={() => setData({
                ...data,
                experience: data.experience.filter((_, i) => i !== index)
              })}
            >
              <div className="space-y-3">
                <InputField 
                  value={exp.company}
                  onChange={(v) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...exp, company: v };
                    setData({ ...data, experience: newExp });
                  }}
                  placeholder="Company"
                />
                <InputField 
                  value={exp.position}
                  onChange={(v) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...exp, position: v };
                    setData({ ...data, experience: newExp });
                  }}
                  placeholder="Position"
                />
                <div className="grid grid-cols-2 gap-3">
                  <InputField 
                    value={exp.startDate}
                    onChange={(v) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...exp, startDate: v };
                      setData({ ...data, experience: newExp });
                    }}
                    placeholder="Start Date"
                  />
                  <InputField 
                    value={exp.endDate}
                    onChange={(v) => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...exp, endDate: v };
                      setData({ ...data, experience: newExp });
                    }}
                    placeholder="End Date"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                  rows={3}
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...exp, description: e.target.value };
                    setData({ ...data, experience: newExp });
                  }}
                />
              </div>
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section 
        title="Education" 
        icon={GraduationCap}
        onAdd={() => setData({
          ...data,
          education: [...data.education, { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }]
        })}
        addText="Add Education"
      >
        <div className="space-y-3">
          {data.education.map((edu, index) => (
            <ItemCard 
              key={index}
              title={`Education ${index + 1}`}
              onDelete={() => setData({
                ...data,
                education: data.education.filter((_, i) => i !== index)
              })}
            >
              <div className="space-y-3">
                <InputField 
                  value={edu.school}
                  onChange={(v) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, school: v };
                    setData({ ...data, education: newEdu });
                  }}
                  placeholder="School"
                />
                <InputField 
                  value={edu.degree}
                  onChange={(v) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, degree: v };
                    setData({ ...data, education: newEdu });
                  }}
                  placeholder="Degree"
                />
                <InputField 
                  value={edu.fieldOfStudy}
                  onChange={(v) => {
                    const newEdu = [...data.education];
                    newEdu[index] = { ...edu, fieldOfStudy: v };
                    setData({ ...data, education: newEdu });
                  }}
                  placeholder="Field of Study"
                />
                <div className="grid grid-cols-2 gap-3">
                  <InputField 
                    value={edu.startDate}
                    onChange={(v) => {
                      const newEdu = [...data.education];
                      newEdu[index] = { ...edu, startDate: v };
                      setData({ ...data, education: newEdu });
                    }}
                    placeholder="Start Date"
                  />
                  <InputField 
                    value={edu.endDate}
                    onChange={(v) => {
                      const newEdu = [...data.education];
                      newEdu[index] = { ...edu, endDate: v };
                      setData({ ...data, education: newEdu });
                    }}
                    placeholder="End Date"
                  />
                </div>
              </div>
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section 
        title="Projects" 
        icon={FolderGit2}
        onAdd={() => setData({
          ...data,
          projects: [...data.projects, { title: '', description: '', technologies: [] }]
        })}
        addText="Add Project"
      >
        <div className="space-y-3">
          {data.projects.map((project, index) => (
            <ItemCard 
              key={index}
              title={`Project ${index + 1}`}
              onDelete={() => setData({
                ...data,
                projects: data.projects.filter((_, i) => i !== index)
              })}
            >
              <div className="space-y-3">
                <InputField 
                  value={project.title}
                  onChange={(v) => {
                    const newProj = [...data.projects];
                    newProj[index] = { ...project, title: v };
                    setData({ ...data, projects: newProj });
                  }}
                  placeholder="Title"
                />
                <textarea
                  placeholder="Description"
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                  rows={3}
                  value={project.description}
                  onChange={(e) => {
                    const newProj = [...data.projects];
                    newProj[index] = { ...project, description: e.target.value };
                    setData({ ...data, projects: newProj });
                  }}
                />
                <InputField 
                  value={project.technologies.join(', ')}
                  onChange={(v) => {
                    const newProj = [...data.projects];
                    newProj[index] = { ...project, technologies: v.split(',').map(t => t.trim()) };
                    setData({ ...data, projects: newProj });
                  }}
                  placeholder="Technologies (comma-separated)"
                />
              </div>
            </ItemCard>
          ))}
        </div>
      </Section>

      <Section 
        title="Skills" 
        icon={Wrench}
        onAdd={() => setData({
          ...data,
          skills: [...data.skills, '']
        })}
        addText="Add Skill"
      >
        <div className="space-y-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <InputField 
                value={skill}
                onChange={(v) => {
                  const newSkills = [...data.skills];
                  newSkills[index] = v;
                  setData({ ...data, skills: newSkills });
                }}
                placeholder="Skill"
              />
              <button
                onClick={() => setData({
                  ...data,
                  skills: data.skills.filter((_, i) => i !== index)
                })}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}