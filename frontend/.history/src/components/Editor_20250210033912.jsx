import React, { useState } from 'react';
import { Plus, Trash2, Briefcase, GraduationCap, FolderGit2, Wrench, User, Grip } from 'lucide-react';
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
    <div className="h-full overflow-y-auto scrollbar-hide p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-800">
      {/* Personal Information Section */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div 
          onClick={() => toggleSection('personalInfo')}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <User className="text-accent/80 group-hover:text-accent transition-colors" size={20} />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Personal Information
            </h2>
          </div>
          <Grip className="text-gray-400 dark:text-gray-600 opacity-50 group-hover:opacity-100 transition-opacity" size={18} />
        </div>
        
        {expandedSections.personalInfo && (
          <div className="p-4 pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-3">
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
                  className="text-sm rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 transition-all"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
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
                  className="text-sm rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 transition-all"
                />
              ))}
            </div>
            <textarea
              placeholder="Professional Summary"
              className="w-full p-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-accent/50 transition-all duration-300 resize-none"
              rows={4}
              value={data.personalInfo.summary}
              onChange={(e) => setData({
                ...data,
                personalInfo: { ...data.personalInfo, summary: e.target.value }
              })}
            />
          </div>
        )}
      </div>

      {/* Dynamic Sections */}
      {sections.map(({ id, title, icon: Icon, fields, titleField }) => (
        <div 
          key={id} 
          className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div 
            onClick={() => toggleSection(id)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Icon className="text-accent/80 group-hover:text-accent transition-colors" size={20} />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(id);
                }}
                className="text-accent/80 hover:text-accent bg-accent/10 p-1.5 rounded-full transition-colors"
              >
                <Plus size={16} />
              </button>
              <Grip className="text-gray-400 dark:text-gray-600 opacity-50 group-hover:opacity-100 transition-opacity" size={18} />
            </div>
          </div>
          
          {expandedSections[id] && data[id].map((item, index) => (
            <div 
              key={index} 
              className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700 first:border-t-0"
            >
              <div className="space-y-3">
                {fields.map(field => (
                  field === 'description' ? (
                    <textarea
                      key={field}
                      placeholder="Description"
                      className="w-full p-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-accent/50 transition-all duration-300 resize-none"
                      rows={3}
                      value={item[field]}
                      onChange={(e) => updateData(id, index, field, e.target.value)}
                    />
                  ) : field === 'technologies' ? (
                    <InputField
                      key={field}
                      value={item[field].join(', ')}
                      onChange={(v) => updateData(id, index, field, v.split(',').map(t => t.trim()))}
                      placeholder="Technologies (comma-separated)"
                      className="text-sm rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  ) : (
                    <InputField
                      key={field}
                      value={item[field]}
                      onChange={(v) => updateData(id, index, field, v)}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="text-sm rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  )
                ))}
                <button 
                  onClick={() => removeItem(id, index)}
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-950 p-2 rounded-full self-end flex items-center justify-center transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Skills Section */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div 
          onClick={() => toggleSection('skills')}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <Wrench className="text-accent/80 group-hover:text-accent transition-colors" size={20} />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Skills
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setData({ ...data, skills: [...data.skills, ''] });
              }}
              className="text-accent/80 hover:text-accent bg-accent/10 p-1.5 rounded-full transition-colors"
            >
              <Plus size={16} />
            </button>
            <Grip className="text-gray-400 dark:text-gray-600 opacity-50 group-hover:opacity-100 transition-opacity" size={18} />
          </div>
        </div>
        
        {expandedSections.skills && (
          <div className="p-4 pt-0 space-y-3">
            {data.skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <InputField
                  value={skill}
                  onChange={(v) => {
                    const newSkills = [...data.skills];
                    newSkills[index] = v;
                    setData({ ...data, skills: newSkills });
                  }}
                  placeholder="Skill"
                  className="text-sm flex-grow rounded-lg border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-accent/50 transition-all"
                />
                <button
                  onClick={() => removeItem('skills', index)}
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-950 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}