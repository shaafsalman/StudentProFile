import React from 'react';
import { Plus, Trash2, Briefcase, GraduationCap, FolderGit2, Wrench, User } from 'lucide-react';
import InputField from '../Ui/InputField';
import Section from '../Ui/Section,';
import ItemCard from '../Ui/ItemCard';

const sections = [
  {
    id: 'experience',
    title: 'Experience',
    icon: Briefcase,
    fields: ['company', 'position', 'startDate', 'endDate', 'description'],
    template: { company: '', position: '', startDate: '', endDate: '', description: '' },
    titleField: 'position'
  },
  {
    id: 'education',
    title: 'Education',
    icon: GraduationCap,
    fields: ['school', 'degree', 'startDate', 'endDate'],
    template: { school: '', degree: '', startDate: '', endDate: '' },
    titleField: 'school'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: FolderGit2,
    fields: ['title', 'description', 'technologies'],
    template: { title: '', description: '', technologies: [] },
    titleField: 'title'
  }
];

export default function Editor({ data, setData }) {
  const updateData = (section, index, field, value) => {
    const newData = [...data[section]];
    newData[index] = { ...newData[index], [field]: value };
    setData({ ...data, [section]: newData });
  };

  const addItem = (section) => {
    const template = sections.find(s => s.id === section)?.template || '';
    setData({ ...data, [section]: [...data[section], template] });
  };

  const removeItem = (section, index) => {
    setData({ 
      ...data, 
      [section]: data[section].filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-2 border-r">
      <Section title="Personal Information" icon={User} className="mb-2">
        <ItemCard
          title="Personal Details"
          onDelete={() => {}}
          showDeleteButton={false}
          className="p-2"
        >
          <div className="space-y-2">
            {['name', 'email', 'phone', 'location'].map(field => (
              <InputField
                key={field}
                value={data.personalInfo[field]}
                onChange={(v) => setData({
                  ...data,
                  personalInfo: { ...data.personalInfo, [field]: v }
                })}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                className="text-sm"
              />
            ))}
            <textarea
              placeholder="Professional Summary"
              className="resume-textarea w-full p-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-1 focus:ring-accent dark:focus:ring-accent transition-all duration-200"
              rows={2}
              value={data.personalInfo.summary}
              onChange={(e) => setData({
                ...data,
                personalInfo: { ...data.personalInfo, summary: e.target.value }
              })}
            />
          </div>
        </ItemCard>
      </Section>

      {sections.map(({ id, title, icon, fields, titleField }) => (
        <Section
          key={id}
          title={title}
          icon={icon}
          onAdd={() => addItem(id)}
          addText={`Add ${title}`}
          className="mb-2"
        >
          <div className="space-y-2">
            {data[id].map((item, index) => (
              <ItemCard
                key={index}
                title={item[titleField] || `${title} ${index + 1}`}
                onDelete={() => removeItem(id, index)}
                className="p-2"
              >
                <div className="space-y-2">
                  {fields.map(field => (
                    field === 'description' ? (
                      <textarea
                        key={field}
                        placeholder="Description"
                        className="resume-textarea w-full p-1.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-1 focus:ring-accent dark:focus:ring-accent transition-all duration-200"
                        rows={2}
                        value={item[field]}
                        onChange={(e) => updateData(id, index, field, e.target.value)}
                      />
                    ) : field === 'technologies' ? (
                      <InputField
                        key={field}
                        value={item[field].join(', ')}
                        onChange={(v) => updateData(id, index, field, v.split(',').map(t => t.trim()))}
                        placeholder="Technologies (comma-separated)"
                        className="text-sm"
                      />
                    ) : (
                      <InputField
                        key={field}
                        value={item[field]}
                        onChange={(v) => updateData(id, index, field, v)}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="text-sm"
                      />
                    )
                  ))}
                </div>
              </ItemCard>
            ))}
          </div>
        </Section>
      ))}

      <Section
        title="Skills"
        icon={Wrench}
        onAdd={() => setData({ ...data, skills: [...data.skills, ''] })}
        addText="Add Skill"
        className="mb-2"
      >
        <div className="space-y-2">
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-1">
              <InputField
                value={skill}
                onChange={(v) => {
                  const newSkills = [...data.skills];
                  newSkills[index] = v;
                  setData({ ...data, skills: newSkills });
                }}
                placeholder="Skill"
                className="text-sm flex-grow"
              />
              <button
                onClick={() => removeItem('skills', index)}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-1 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}