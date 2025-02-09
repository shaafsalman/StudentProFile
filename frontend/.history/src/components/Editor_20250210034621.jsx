import React, { useState } from 'react';
import { Plus, Trash2, Briefcase, GraduationCap, FolderGit2, Wrench, User, Move } from 'lucide-react';
import InputField from '../Ui/InputField';
import Section from '../Ui/Section';
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
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    experience: true,
    education: true,
    projects: true,
    skills: true
  });

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

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Personal Information Section */}
      <Section 
        title="Personal Information" 
        icon={User}
        onAdd={() => toggleSection('personalInfo')}
        addText={expandedSections.personalInfo ? "Collapse" : "Expand"}
      >
        {expandedSections.personalInfo && (
          <ItemCard
            title="Personal Details"
            onDelete={() => {}}
            showDeleteButton={false}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {['name', 'email'].map(field => (
                  <InputField
                    key={field}
                    value={data.personalInfo[field]}
                    onChange={(v) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, [field]: v }
                    })}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field === 'email' ? 'email' : 'text'}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['phone', 'location'].map(field => (
                  <InputField
                    key={field}
                    value={data.personalInfo[field]}
                    onChange={(v) => setData({
                      ...data,
                      personalInfo: { ...data.personalInfo, [field]: v }
                    })}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field === 'phone' ? 'tel' : 'text'}
                  />
                ))}
              </div>
              <InputField
                placeholder="Professional Summary"
                value={data.personalInfo.summary}
                onChange={(v) => setData({
                  ...data,
                  personalInfo: { ...data.personalInfo, summary: v }
                })}
                rows={3}
              />
            </div>
          </ItemCard>
        )}
      </Section>

      {/* Dynamic Sections */}
      {sections.map(({ id, title, icon: Icon, fields, titleField }) => (
        <Section
          key={id}
          title={title}
          icon={Icon}
          onAdd={() => addItem(id)}
          addText={`Add ${title}`}
          onToggle={() => toggleSection(id)}
        >
          {expandedSections[id] && (
            <div className="space-y-4">
              {data[id].map((item, index) => (
                <ItemCard
                  key={index}
                  title={item[titleField] || `${title} ${index + 1}`}
                  onDelete={() => removeItem(id, index)}
                >
                  <div className="space-y-4">
                    {fields.map(field => (
                      field === 'description' ? (
                        <InputField
                          key={field}
                          placeholder="Description"
                          value={item[field]}
                          onChange={(v) => updateData(id, index, field, v)}
                          rows={3}
                        />
                      ) : field === 'technologies' ? (
                        <InputField
                          key={field}
                          value={item[field].join(', ')}
                          onChange={(v) => updateData(id, index, field, v.split(',').map(t => t.trim()))}
                          placeholder="Technologies (comma-separated)"
                        />
                      ) : (
                        <InputField
                          key={field}
                          value={item[field]}
                          onChange={(v) => updateData(id, index, field, v)}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                      )
                    ))}
                  </div>
                </ItemCard>
              ))}
            </div>
          )}
        </Section>
      ))}

      {/* Skills Section */}
      <Section
        title="Skills"
        icon={Wrench}
        onAdd={() => setData({ ...data, skills: [...data.skills, ''] })}
        addText="Add Skill"
      >
        <div className="space-y-4">
          {data.skills.map((skill, index) => (
            <div 
              key={index} 
              className="
                flex items-center gap-3 
                bg-white dark:bg-gray-800 
                p-3 rounded-lg 
                shadow-sm hover:shadow-md 
                transition-all duration-300
                group
              "
            >
              <Move 
                size={16} 
                className="
                  text-gray-300 dark:text-gray-600 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity 
                  cursor-move
                " 
              />
              <InputField
                value={skill}
                onChange={(v) => {
                  const newSkills = [...data.skills];
                  newSkills[index] = v;
                  setData({ ...data, skills: newSkills });
                }}
                placeholder="Skill"
                className="flex-grow"
              />
              <button
                onClick={() => removeItem('skills', index)}
                className="
                  text-red-500 hover:text-red-600 
                  dark:text-red-400 dark:hover:text-red-300 
                  bg-red-50 dark:bg-red-950 
                  p-2 rounded-full 
                  hover:bg-red-100 dark:hover:bg-red-900 
                  transition-colors 
                  group/delete
                "
              >
                <Trash2 
                  size={16} 
                  className="
                    group-hover/delete:rotate-12 
                    transition-transform
                  " 
                />
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}