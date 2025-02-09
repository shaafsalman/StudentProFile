import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Briefcase, GraduationCap, FolderGit2, Wrench, User, ChevronDown } from 'lucide-react';
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
  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(true);

  // Check if user is at the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 10);
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
    }

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4">
      <Section title="Personal Information" icon={User}>
        <div className="space-y-3">
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
            />
          ))}
          <textarea
            placeholder="Professional Summary"
            className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-accent dark:focus:ring-accent transition-all duration-200"
            rows={4}
            value={data.personalInfo.summary}
            onChange={(e) => setData({
              ...data,
              personalInfo: { ...data.personalInfo, summary: e.target.value }
            })}
          />
        </div>
      </Section>

      {sections.map(({ id, title, icon, fields, titleField }) => (
        <Section
          key={id}
          title={title}
          icon={icon}
          onAdd={() => addItem(id)}
          addText={`Add ${title}`}
        >
          <div className="space-y-3">
            {data[id].map((item, index) => (
              <ItemCard
                key={index}
                title={item[titleField] || `${title} ${index + 1}`}
                onDelete={() => removeItem(id, index)}
              >
                <div className="space-y-3">
                  {fields.map(field => (
                    field === 'description' ? (
                      <textarea
                        key={field}
                        placeholder="Description"
                        className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:ring-2 focus:ring-accent dark:focus:ring-accent transition-all duration-200"
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
        </Section>
      ))}

      <Section
        title="Skills"
        icon={Wrench}
        onAdd={() => setData({ ...data, skills: [...data.skills, ''] })}
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
                onClick={() => removeItem('skills', index)}
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