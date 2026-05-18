import React, { useState, useEffect } from 'react';
import { Download, ChevronLeft, ChevronRight, Save, Upload, Trash2, Eye, EyeOff, User, GraduationCap, Briefcase, Zap, FileText } from 'lucide-react';
import styles from './ResumeBuilderPage.module.css';
import { generatePDF } from '../../../utility/pdfExporter';
import type { Template } from '../../../types/resume';
import nalaPreview from '../../../assets/templates/nala-preview.png';
import masterPreview from '../../../assets/templates/master-preview.png';
import modernPreview from '../../../assets/templates/modern-preview.png';
import professionalPreview from '../../../assets/templates/professional-preview.png';
import twoColumnPreview from '../../../assets/templates/two-column-preview.png';
import minimalPreview from '../../../assets/templates/minimal-preview.png';
import creativePreview from '../../../assets/templates/creative-preview.png';
import classicPreview from '../../../assets/templates/classic-preview.png';
import wozberPreview from '../../../assets/templates/wozber-preview.png';
import sofaaPreview from '../../../assets/templates/sofaa-preview.png';

// Types
interface PersonalInfo {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    portfolio: string;
    summary: string;
}

interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string;
}

interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    responsibilities: string;
}

interface Skill {
    id: string;
    category: string;
    items: string;
}

interface ResumeData {
    personal: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: Skill[];
}

const TEMPLATE_DATA = {
    nala: {
        color: '#7a1f2b',
        preview: nalaPreview
    },
    master: {
        color: '#1a4fbf',
        preview: masterPreview
    },
    modern: {
        color: '#1D9E75',
        preview: modernPreview
    },
    professional: {
        color: '#34586bff',
        preview: professionalPreview
    },
    'two-column': {
        color: '#534AB7',
        preview: twoColumnPreview
    },
    minimal: {
        color: '#909033ff',
        preview: minimalPreview
    },
    creative: {
        color: '#993C1D',
        preview: creativePreview
    },
    classic: {
        color: '#000000',
        preview: classicPreview
    },
    wozber: {
        color: '#7dd8cfff',
        preview: wozberPreview
    },
    sofaa: {
        color: '#E6E6E6',
        preview: sofaaPreview
    },
};

const TEMPLATE_COLORS = Object.fromEntries(
    Object.entries(TEMPLATE_DATA).map(([key, val]) => [key, val.color])
);

const STEPS = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'preview', label: 'Preview & Export', icon: FileText },
];

const ProfessionalSection = ({ title, children }: any) => {
    return (
        <section className={styles.cvProfessionalSection}>
            <h3 className={styles.cvProfessionalTitle}>
                {title.toUpperCase()}
            </h3>

            <div className={styles.cvProfessionalLine} />

            {children}
        </section>
    );
};

export default function ResumeBuilderPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTemplate, setSelectedTemplate] = useState<Template>('nala');
    const [showPreview, setShowPreview] = useState(true);
    const [resumeData, setResumeData] = useState<ResumeData>({
        personal: {
            fullName: '',
            jobTitle: '',
            email: '',
            phone: '',
            location: '',
            linkedIn: '',
            portfolio: '',
            summary: '',
        },
        education: [],
        experience: [],
        skills: [],
    });

    useEffect(() => {
        const saved = localStorage.getItem('prolink-resume-draft');
        if (saved) {
            try {
                setResumeData(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load saved data');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('prolink-resume-draft', JSON.stringify(resumeData));
    }, [resumeData]);

    // Personal Info handlers
    const updatePersonal = (field: keyof PersonalInfo, value: string) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value },
        }));
    };

    // Education handlers
    const addEducation = () => {
        const newEd: Education = {
            id: Date.now().toString(),
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            achievements: '',
        };
        setResumeData(prev => ({ ...prev, education: [...prev.education, newEd] }));
    };

    const updateEducation = (id: string, field: keyof Education, value: any) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(ed =>
                ed.id === id ? { ...ed, [field]: value } : ed
            ),
        }));
    };

    const removeEducation = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(ed => ed.id !== id),
        }));
    };

    // Experience handlers
    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            responsibilities: '',
        };
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const updateExperience = (id: string, field: keyof Experience, value: any) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            ),
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id),
        }));
    };

    // Skills handlers
    const addSkill = () => {
        const newSkill: Skill = {
            id: Date.now().toString(),
            category: '',
            items: '',
        };
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    };

    const updateSkill = (id: string, field: keyof Skill, value: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map(skill =>
                skill.id === id ? { ...skill, [field]: value } : skill
            ),
        }));
    };

    const removeSkill = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.id !== id),
        }));
    };

    // Navigation
    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Export handlers
    const handleExport = () => {
        // Validate that we have at least a name
        if (!resumeData.personal.fullName.trim()) {
            alert('Please enter your name before exporting');
            return;
        }

        try {
            generatePDF(resumeData, selectedTemplate);
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const handleSaveData = () => {
        const dataStr = JSON.stringify(resumeData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume-data.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleLoadData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target?.result as string);
                    setResumeData(data);
                } catch (err) {
                    alert('Invalid file format');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleClearAll = () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            setResumeData({
                personal: {
                    fullName: '',
                    jobTitle: '',
                    email: '',
                    phone: '',
                    location: '',
                    linkedIn: '',
                    portfolio: '',
                    summary: '',
                },
                education: [],
                experience: [],
                skills: [],
            });
            localStorage.removeItem('prolink-resume-draft');
        }
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.headerTitle}>Resume Builder</h1>
                        <p className={styles.headerSub}>Build your professional CV step by step</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            className={styles.headerBtn}
                            onClick={() => setShowPreview(!showPreview)}
                            title={showPreview ? 'Hide preview' : 'Show preview'}
                        >
                            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span className={styles.headerBtnLabel}>
                                {showPreview ? 'Hide' : 'Show'} Preview
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div className={styles.progressBar}>
                <div className={styles.progressInner}>
                    {STEPS.map((step, index) => (
                        <div
                            key={step.id}
                            className={`${styles.progressStep} ${index === currentStep ? styles.progressStepActive : ''
                                } ${index < currentStep ? styles.progressStepComplete : ''
                                }`}
                            onClick={() => setCurrentStep(index)}
                        >
                            <div className={styles.progressIcon}>
                                <step.icon size={18} />
                            </div>

                            <span className={styles.progressLabel}>
                                {step.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className={styles.content}>
                <div className={styles.contentInner}>
                    {/* Form panel */}
                    <div className={styles.formPanel}>
                        <div className={styles.formScroll}>
                            {/* Step 0: Personal Details */}
                            {currentStep === 0 && (
                                <div className={styles.step}>
                                    <h2 className={styles.stepTitle}>Personal Details</h2>
                                    <p className={styles.stepDesc}>
                                        Start with your contact information and a brief professional summary
                                    </p>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Full Name *</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                value={resumeData.personal.fullName}
                                                onChange={e => updatePersonal('fullName', e.target.value)}
                                                placeholder="e.g. Zandile Myendeki"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Job Title *</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                value={resumeData.personal.jobTitle}
                                                onChange={e => updatePersonal('jobTitle', e.target.value)}
                                                placeholder="e.g. Software Engineer"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Email Address *</label>
                                            <input
                                                type="email"
                                                className={styles.input}
                                                value={resumeData.personal.email}
                                                onChange={e => updatePersonal('email', e.target.value)}
                                                placeholder="e.g. zandile.myendeki@email.com"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Phone Number *</label>
                                            <input
                                                type="tel"
                                                className={styles.input}
                                                value={resumeData.personal.phone}
                                                onChange={e => updatePersonal('phone', e.target.value)}
                                                placeholder="e.g. 071 234 5678"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Location *</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                value={resumeData.personal.location}
                                                onChange={e => updatePersonal('location', e.target.value)}
                                                placeholder="e.g. Cape Town, Western Cape"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>LinkedIn (optional)</label>
                                            <input
                                                type="url"
                                                className={styles.input}
                                                value={resumeData.personal.linkedIn}
                                                onChange={e => updatePersonal('linkedIn', e.target.value)}
                                                placeholder="e.g. www.linkedin.com/in/your-name-0123456789"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Portfolio/Website (optional)</label>
                                            <input
                                                type="url"
                                                className={styles.input}
                                                value={resumeData.personal.portfolio}
                                                onChange={e => updatePersonal('portfolio', e.target.value)}
                                                placeholder="e.g. yourportfolio.com"
                                            />
                                        </div>

                                        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                            <label className={styles.label}>Professional Summary *</label>
                                            <textarea
                                                className={styles.textarea}
                                                rows={4}
                                                value={resumeData.personal.summary}
                                                onChange={e => updatePersonal('summary', e.target.value)}
                                                placeholder="A brief statement about your professional background, skills, and career goals (5-7 sentences)"
                                            />
                                            <span className={styles.hint}>
                                                Keep it concise and focused on your key strengths
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 1: Education */}
                            {currentStep === 1 && (
                                <div className={styles.step}>
                                    <h2 className={styles.stepTitle}>Education</h2>
                                    <p className={styles.stepDesc}>
                                        Add your qualifications, starting with the most recent
                                    </p>

                                    {resumeData.education.map((edu, index) => (
                                        <div key={edu.id} className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <h3 className={styles.cardTitle}>
                                                    {edu.degree || `Education ${index + 1}`}
                                                </h3>
                                                <button
                                                    className={styles.removeBtn}
                                                    onClick={() => removeEducation(edu.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            <div className={styles.formGrid}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Degree/Qualification *</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={edu.degree}
                                                        onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                                                        placeholder="e.g. BSc Computer Science"
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Institution *</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={edu.institution}
                                                        onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                                                        placeholder="e.g. University of Cape Town"
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Location</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={edu.location}
                                                        onChange={e => updateEducation(edu.id, 'location', e.target.value)}
                                                        placeholder="e.g. Cape Town, Western Cape"
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Start Date</label>
                                                    <input
                                                        type="month"
                                                        className={styles.input}
                                                        value={edu.startDate}
                                                        onChange={e => updateEducation(edu.id, 'startDate', e.target.value)}
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>End Date</label>
                                                    <input
                                                        type="month"
                                                        className={styles.input}
                                                        value={edu.endDate}
                                                        onChange={e => updateEducation(edu.id, 'endDate', e.target.value)}
                                                        disabled={edu.current}
                                                    />
                                                    <label className={styles.checkbox}>
                                                        <input
                                                            type="checkbox"
                                                            checked={edu.current}
                                                            onChange={e => updateEducation(edu.id, 'current', e.target.checked)}
                                                        />
                                                        <span>Currently studying</span>
                                                    </label>
                                                </div>

                                                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                                    <label className={styles.label}>Achievements (optional)</label>
                                                    <textarea
                                                        className={styles.textarea}
                                                        rows={3}
                                                        value={edu.achievements}
                                                        onChange={e => updateEducation(edu.id, 'achievements', e.target.value)}
                                                        placeholder="Notable achievements, awards, or relevant coursework"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button className={styles.addBtn} onClick={addEducation}>
                                        + Add Education
                                    </button>
                                </div>
                            )}

                            {/* Step 2: Experience */}
                            {currentStep === 2 && (
                                <div className={styles.step}>
                                    <h2 className={styles.stepTitle}>Work Experience</h2>
                                    <p className={styles.stepDesc}>
                                        List your work history, internships, and relevant positions
                                    </p>

                                    {resumeData.experience.map((exp, index) => (
                                        <div key={exp.id} className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <h3 className={styles.cardTitle}>
                                                    {exp.jobTitle || `Position ${index + 1}`}
                                                </h3>
                                                <button
                                                    className={styles.removeBtn}
                                                    onClick={() => removeExperience(exp.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            <div className={styles.formGrid}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Job Title *</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={exp.jobTitle}
                                                        onChange={e => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                                        placeholder="e.g. Software Developer Intern"
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Company *</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={exp.company}
                                                        onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                                                        placeholder="e.g. ABC Research Centre"
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Location</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={exp.location}
                                                        onChange={e => updateExperience(exp.id, 'location', e.target.value)}
                                                        placeholder="e.g. Johannesburg, Gauteng"
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Start Date</label>
                                                    <input
                                                        type="month"
                                                        className={styles.input}
                                                        value={exp.startDate}
                                                        onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                                                    />
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>End Date</label>
                                                    <input
                                                        type="month"
                                                        className={styles.input}
                                                        value={exp.endDate}
                                                        onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                                                        disabled={exp.current}
                                                    />
                                                    <label className={styles.checkbox}>
                                                        <input
                                                            type="checkbox"
                                                            checked={exp.current}
                                                            onChange={e => updateExperience(exp.id, 'current', e.target.checked)}
                                                        />
                                                        <span>Currently working here</span>
                                                    </label>
                                                </div>

                                                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                                    <label className={styles.label}>Key Responsibilities & Achievements *</label>
                                                    <textarea
                                                        className={styles.textarea}
                                                        rows={4}
                                                        value={exp.responsibilities}
                                                        onChange={e => updateExperience(exp.id, 'responsibilities', e.target.value)}
                                                        placeholder="• Managed social media campaigns&#10;• Increased engagement by 40%&#10;• Collaborated with design team"
                                                    />
                                                    <span className={styles.hint}>
                                                        Use bullet points and focus on achievements with numbers where possible
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button className={styles.addBtn} onClick={addExperience}>
                                        + Add Experience
                                    </button>

                                    {resumeData.experience.length === 0 && (
                                        <div className={styles.emptyState}>
                                            <p>No experience yet? No problem!</p>
                                            <span>Include internships, volunteer work, or relevant university projects</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Skills */}
                            {currentStep === 3 && (
                                <div className={styles.step}>
                                    <h2 className={styles.stepTitle}>Skills</h2>
                                    <p className={styles.stepDesc}>
                                        List your technical skills, soft skills, and languages
                                    </p>

                                    {resumeData.skills.map((skill, index) => (
                                        <div key={skill.id} className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <h3 className={styles.cardTitle}>
                                                    {skill.category || `Skill Category ${index + 1}`}
                                                </h3>
                                                <button
                                                    className={styles.removeBtn}
                                                    onClick={() => removeSkill(skill.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>

                                            <div className={styles.formGrid}>
                                                <div className={styles.formGroup}>
                                                    <label className={styles.label}>Category *</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={skill.category}
                                                        onChange={e => updateSkill(skill.id, 'category', e.target.value)}
                                                        placeholder="e.g. Technical Skills, Languages, Soft Skills"
                                                    />
                                                </div>

                                                <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                                                    <label className={styles.label}>Skills *</label>
                                                    <input
                                                        type="text"
                                                        className={styles.input}
                                                        value={skill.items}
                                                        onChange={e => updateSkill(skill.id, 'items', e.target.value)}
                                                        placeholder="e.g. Microsoft Excel, PowerPoint, Data Analysis"
                                                    />
                                                    <span className={styles.hint}>
                                                        Separate skills with commas
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button className={styles.addBtn} onClick={addSkill}>
                                        + Add Skill Category
                                    </button>

                                    <div className={styles.skillsSuggestions}>
                                        <p className={styles.suggestionTitle}>Common categories:</p>
                                        <div className={styles.suggestionTags}>
                                            <span className={styles.tag}>Technical Skills</span>
                                            <span className={styles.tag}>Languages</span>
                                            <span className={styles.tag}>Soft Skills</span>
                                            <span className={styles.tag}>Certifications</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Preview & Export */}
                            {currentStep === 4 && (
                                <div className={styles.step}>
                                    <h2 className={styles.stepTitle}>Preview & Export</h2>
                                    <p className={styles.stepDesc}>
                                        Choose a template and download your CV as a PDF
                                    </p>

                                    {/* Template selector */}
                                    <div className={styles.templateSection}>
                                        <h3 className={styles.subsectionTitle}>Choose a template</h3>
                                        <div className={styles.templateGrid}>
                                            {Object.keys(TEMPLATE_COLORS).map((template) => (
                                                <button
                                                    key={template}
                                                    className={`${styles.templateOption} ${selectedTemplate === template ? styles.templateOptionActive : ''
                                                        }`}
                                                    onClick={() => setSelectedTemplate(template as Template)}
                                                >
                                                    <div
                                                        className={styles.templatePreview}
                                                        style={{ borderColor: TEMPLATE_COLORS[template as Template] }}
                                                    >
                                                        <img
                                                            src={TEMPLATE_DATA[template as keyof typeof TEMPLATE_DATA].preview}
                                                            alt={`${template} template`}
                                                            className={styles.templateImage}
                                                        />
                                                    </div>
                                                    <span className={styles.templateName}>
                                                        {template.charAt(0).toUpperCase() + template.slice(1)}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Export actions */}
                                    <div className={styles.exportSection}>
                                        <h3 className={styles.subsectionTitle}>Export your CV</h3>
                                        <div className={styles.exportActions}>
                                            <button className={styles.exportBtn} onClick={handleExport}>
                                                <Download size={16} />
                                                Download as PDF
                                            </button>
                                            <button className={styles.secondaryBtn} onClick={handleSaveData}>
                                                <Save size={16} />
                                                Save Data
                                            </button>
                                            <label className={styles.secondaryBtn}>
                                                <Upload size={16} />
                                                Load Data
                                                <input
                                                    type="file"
                                                    accept=".json"
                                                    onChange={handleLoadData}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                            <button className={styles.dangerBtn} onClick={handleClearAll}>
                                                <Trash2 size={16} />
                                                Clear All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation buttons */}
                        <div className={styles.navButtons}>
                            {currentStep > 0 && (
                                <button className={styles.navBtn} onClick={prevStep}>
                                    <ChevronLeft size={16} />
                                    Previous
                                </button>
                            )}
                            {currentStep < STEPS.length - 1 && (
                                <button className={`${styles.navBtn} ${styles.navBtnPrimary}`} onClick={nextStep}>
                                    Next
                                    <ChevronRight size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Preview panel */}
                    {showPreview && (
                        <div className={styles.previewPanel}>
                            <div className={styles.previewHeader}>
                                <h3 className={styles.previewTitle}>Live Preview</h3>
                                <span className={styles.previewBadge}>
                                    {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Template
                                </span>
                            </div>
                            <div className={styles.previewScroll}>
                                <div
                                    className={styles.cvPreview}
                                    style={{ '--accent-color': TEMPLATE_COLORS[selectedTemplate] } as React.CSSProperties}
                                >
                                    {/* CV Preview Render */}
                                    <CVPreview data={resumeData} template={selectedTemplate} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// CV Preview Component
function CVPreview({ data, template }: { data: ResumeData; template: Template }) {
    const accentColor = TEMPLATE_COLORS[template];

    if (template === 'two-column') {
        return (
            <div className={styles.cvTwoColumn}>
                {/* Left column */}
                <div className={styles.cvSidebar} style={{ background: accentColor }}>
                    <div className={styles.cvSection}>
                        <h2 className={styles.cvSidebarName}>
                            {data.personal.fullName || 'Your Name'}
                        </h2>

                        {data.personal.jobTitle && (
                            <p className={styles.cvSidebarJobTitle}>
                                {data.personal.jobTitle}
                            </p>
                        )}
                        <div className={styles.cvContact}>
                            {data.personal.phone && <p>{data.personal.phone}</p>}
                            {data.personal.email && <p>{data.personal.email}</p>}
                            {data.personal.location && <p>{data.personal.location}</p>}
                            {data.personal.linkedIn && <p>{data.personal.linkedIn}</p>}
                            {data.personal.portfolio && <p>{data.personal.portfolio}</p>}
                        </div>
                    </div>

                    {data.skills.length > 0 && (
                        <div className={styles.cvSection}>
                            <h3 className={styles.cvSidebarHeading}>Skills</h3>
                            {data.skills.map(skill => (
                                <div key={skill.id} className={styles.cvSkillGroup}>
                                    <p className={styles.cvSkillCategory}>{skill.category}</p>
                                    <p className={styles.cvSkillItems}>{skill.items}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right column */}
                <div className={styles.cvMain}>
                    {data.personal.summary && (
                        <div className={styles.cvSection}>
                            <h3 className={styles.cvHeading} style={{ color: accentColor }}>
                                Professional Summary
                            </h3>
                            <p className={styles.cvText}>{data.personal.summary}</p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className={styles.cvSection}>
                            <h3 className={styles.cvHeading} style={{ color: accentColor }}>
                                Work Experience
                            </h3>
                            {data.experience.map(exp => (
                                <div key={exp.id} className={styles.cvItem}>
                                    <div className={styles.cvItemHeader}>
                                        <h4 className={styles.cvItemTitle}>{exp.jobTitle}</h4>
                                        <span className={styles.cvItemDate}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className={styles.cvItemSubtitle}>
                                        {exp.company}
                                        {exp.location && ` | ${exp.location}`}
                                    </p>
                                    <ul className={styles.cvList}>
                                        {exp.responsibilities.split('\n').map((item, i) => (
                                            item.trim() && <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div className={styles.cvSection}>
                            <h3 className={styles.cvHeading} style={{ color: accentColor }}>
                                Education
                            </h3>
                            {data.education.map(edu => (
                                <div key={edu.id} className={styles.cvItem}>
                                    <div className={styles.cvItemHeader}>
                                        <h4 className={styles.cvItemTitle}>{edu.degree}</h4>
                                        <span className={styles.cvItemDate}>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>
                                    <p className={styles.cvItemSubtitle}>
                                        {edu.institution}
                                        {edu.location && ` | ${edu.location}`}
                                    </p>
                                    {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (template === 'classic') {
        return (
            <div className={styles.cvClassic}>
                {/* Header */}
                <div className={styles.cvClassicHeader}>
                    <h1>{data.personal.fullName || 'Your Name'}</h1>
                    {data.personal.jobTitle && (
                        <p className={styles.cvProfessionalTitle}>
                            {data.personal.jobTitle}
                        </p>
                    )}
                    <div className={styles.cvClassicContact}>
                        {[
                            data.personal.phone,
                            data.personal.email,
                            data.personal.location,
                            data.personal.linkedIn,
                            data.personal.portfolio,
                        ]
                            .filter(Boolean)
                            .map((item, index, array) => (
                                <React.Fragment key={index}>
                                    <span>{item}</span>
                                    {index < array.length - 1 && <span>•</span>}
                                </React.Fragment>
                            ))}
                    </div>
                </div>

                {/* Summary */}
                {data.personal.summary && (
                    <section>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{data.personal.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section>
                        <h3>EXPERIENCE</h3>
                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvClassicItem}>
                                <div className={styles.cvClassicRow}>
                                    <strong>{exp.jobTitle}</strong>
                                    <span>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className={styles.cvClassicSub}>
                                    {exp.company}{exp.location && ` | ${exp.location}`}
                                </div>
                                <ul>
                                    {exp.responsibilities.split('\n').map((item, i) => (
                                        item.trim() && <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section>
                        <h3>EDUCATION</h3>
                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvClassicItem}>
                                <div className={styles.cvClassicRow}>
                                    <strong>{edu.degree}</strong>
                                    <span>
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <div className={styles.cvClassicSub}>
                                    {edu.institution}{edu.location && ` | ${edu.location}`}
                                </div>
                                {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section>
                        <h3>SKILLS</h3>
                        {data.skills.map(skill => (
                            <p key={skill.id}>
                                <strong>{skill.category}:</strong> {skill.items}
                            </p>
                        ))}
                    </section>
                )}
            </div>
        );
    }

    if (template === 'nala') {
        return (
            <div className={styles.cvNala}>
                {/* TOP BAR */}
                <div className={styles.cvNalaTopBar} />

                {/* HEADER */}
                <div className={styles.cvNalaHeader}>
                    <div>
                        <h1>{data.personal.fullName || 'Your Name'}</h1>
                        <p className={styles.cvNalaTitle}>
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    {/* CONTACT WITH VERTICAL LABELS */}
                    <div className={styles.cvNalaContact}>
                        {/* LABEL COLUMN */}
                        <div className={styles.cvNalaContactLabels}>
                            {data.personal.phone && <span>T</span>}
                            {data.personal.email && <span>E</span>}
                            {data.personal.location && <span>A</span>}
                            {data.personal.portfolio && <span>W</span>}
                            {data.personal.linkedIn && <span>L</span>}
                        </div>

                        {/* VALUES COLUMN */}
                        <div className={styles.cvNalaContactValues}>
                            {data.personal.phone && <p>{data.personal.phone}</p>}
                            {data.personal.email && <p>{data.personal.email}</p>}
                            {data.personal.location && <p>{data.personal.location}</p>}
                            {data.personal.portfolio && <p>{data.personal.portfolio}</p>}
                            {data.personal.linkedIn && <p>{data.personal.linkedIn}</p>}
                        </div>
                    </div>
                </div>

                {/* SUMMARY */}
                {data.personal.summary && (
                    <section className={styles.cvNalaSection}>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{data.personal.summary}</p>
                    </section>
                )}

                {/* EXPERIENCE */}
                {data.experience.length > 0 && (
                    <section className={styles.cvNalaSection}>
                        <h3>WORK EXPERIENCE</h3>

                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvNalaItem}>
                                <div className={styles.cvNalaRow}>
                                    <div>
                                        <strong>{exp.company}</strong>
                                        <div className={styles.cvNalaSub}>
                                            {exp.jobTitle}
                                            {exp.location && ` | ${exp.location}`}
                                        </div>
                                    </div>

                                    <span>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>

                                <ul>
                                    {exp.responsibilities.split('\n').map((item, i) =>
                                        item.trim() && <li key={i}>{item}</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* EDUCATION */}
                {data.education.length > 0 && (
                    <section className={styles.cvNalaSection}>
                        <h3>EDUCATION</h3>

                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvNalaItem}>
                                <div className={styles.cvNalaRow}>
                                    <div>
                                        <strong>{edu.institution}</strong>
                                        <div className={styles.cvNalaSub}>
                                            {edu.degree}
                                            {edu.location && ` | ${edu.location}`}
                                        </div>
                                    </div>

                                    <span>
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* SKILLS */}
                {data.skills.length > 0 && (
                    <section className={styles.cvNalaSection}>
                        <h3>KEY SKILLS</h3>

                        <ul className={styles.cvNalaSkills}>
                            {data.skills.map((skill, i) => (
                                <li key={i}>
                                    {skill.category
                                        ? `${skill.category}: ${skill.items}`
                                        : skill.items}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* BOTTOM BAR */}
                <div className={styles.cvNalaBottomBar} />
            </div>
        );
    }

    if (template === 'master') {
        return (
            <div className={styles.cvMaster}>
                {/* HEADER */}
                <div className={styles.cvMasterHeader}>
                    <div>
                        <h1>{data.personal.fullName || 'Your Name'}</h1>
                        <p className={styles.cvMasterTitle}>
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    <div className={styles.cvMasterContact}>
                        {data.personal.phone && <p>{data.personal.phone}</p>}
                        {data.personal.email && <p>{data.personal.email}</p>}
                        {data.personal.linkedIn && <p>{data.personal.linkedIn}</p>}
                        {data.personal.location && <p>{data.personal.location}</p>}
                        {data.personal.portfolio && <p>{data.personal.portfolio}</p>}
                    </div>

                </div>

                {/* SUMMARY */}
                {data.personal.summary && (
                    <section className={styles.cvMasterSection}>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{data.personal.summary}</p>
                    </section>
                )}

                {/* EXPERIENCE */}
                {data.experience.length > 0 && (
                    <section className={styles.cvMasterSection}>
                        <h3>EXPERIENCE</h3>

                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvMasterRow}>
                                <div className={styles.cvMasterDate}>
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </div>

                                <div className={styles.cvMasterContent}>
                                    <strong>{exp.jobTitle}</strong>

                                    <div className={styles.cvMasterSub}>
                                        {exp.company}
                                        {exp.location && ` | ${exp.location}`}
                                    </div>

                                    <ul>
                                        {exp.responsibilities.split('\n').map((item, i) =>
                                            item.trim() && <li key={i}>{item}</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* EDUCATION */}
                {data.education.length > 0 && (
                    <section className={styles.cvMasterSection}>
                        <h3>EDUCATION</h3>

                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvMasterRow}>
                                <div className={styles.cvMasterDate}>
                                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                </div>

                                <div className={styles.cvMasterContent}>
                                    <strong>{edu.degree}</strong>

                                    <div className={styles.cvMasterSub}>
                                        {edu.institution}
                                        {edu.location && ` | ${edu.location}`}
                                    </div>
                                    {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* SKILLS */}
                {data.skills.length > 0 && (
                    <section className={styles.cvMasterSection}>
                        <h3>SKILLS</h3>

                        {data.skills.map(skill => (
                            <p key={skill.id}>
                                <strong>{skill.category}:</strong> {skill.items}
                            </p>
                        ))}
                    </section>
                )}
            </div>
        );
    }

    if (template === 'wozber') {
        return (
            <div className={styles.cvWozber}>
                {/* Header */}
                <div className={styles.cvWozberHeader}>
                    <div>
                        <h1>{data.personal.fullName || 'Your Name'}</h1>
                        <p className={styles.cvWozberTitle}>
                            {data.personal.jobTitle}
                        </p>
                    </div>

                    <div className={styles.cvWozberContact}>
                        {data.personal.phone && <p>{data.personal.phone}</p>}
                        {data.personal.email && <p>{data.personal.email}</p>}
                        {data.personal.location && <p>{data.personal.location}</p>}
                        {data.personal.linkedIn && <p>{data.personal.linkedIn}</p>}
                        {data.personal.portfolio && <p>{data.personal.portfolio}</p>}
                    </div>
                </div>

                {/* Summary */}
                {data.personal.summary && (
                    <section className={styles.cvWozberSection}>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{data.personal.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience.length > 0 && (
                    <section className={styles.cvWozberSection}>
                        <h3>EXPERIENCE</h3>
                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvWozberItem}>
                                <div className={styles.cvWozberRow}>
                                    <strong>{exp.jobTitle}</strong>
                                    <span>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className={styles.cvClassicSub}>
                                    {exp.company}{exp.location && ` | ${exp.location}`}
                                </div>
                                <ul>
                                    {exp.responsibilities.split('\n').map((item, i) => (
                                        item.trim() && <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className={styles.cvWozberSection}>
                        <h3>EDUCATION</h3>
                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvWozberItem}>
                                <div className={styles.cvWozberRow}>
                                    <strong>{edu.degree}</strong>
                                    <span>
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <div className={styles.cvClassicSub}>
                                    {edu.institution}{edu.location && ` | ${edu.location}`}
                                </div>
                                {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {data.skills.length > 0 && (
                    <section className={styles.cvWozberSection}>
                        <h3>SKILLS</h3>
                        {data.skills.map(skill => (
                            <p key={skill.id}>
                                <strong>{skill.category}:</strong> {skill.items}
                            </p>
                        ))}
                    </section>
                )}
            </div>
        );
    }

    if (template === 'professional') {
        return (
            <div className={styles.cvProfessional}>
                {/* HEADER */}
                <div className={styles.cvProfessionalHeader}>
                    <h1>{data.personal.fullName || 'Your Name'}</h1>

                    {data.personal.jobTitle && (
                        <p className={styles.cvProfessionalTitle}>
                            {data.personal.jobTitle}
                        </p>
                    )}

                    {/* CONTACT */}
                    <div className={styles.cvProfessionalContact}>
                        {data.personal.email && (
                            <div className={styles.cvProfessionalContactRow}>
                                <span className={styles.icon}>✉</span>
                                <span>{data.personal.email}</span>
                            </div>
                        )}

                        {data.personal.phone && (
                            <div className={styles.cvProfessionalContactRow}>
                                <span className={styles.icon}>☎</span>
                                <span>{data.personal.phone}</span>
                            </div>
                        )}

                        {data.personal.location && (
                            <div className={styles.cvProfessionalContactRow}>
                                <span className={styles.icon}>📍</span>
                                <span>{data.personal.location}</span>
                            </div>
                        )}

                        {data.personal.linkedIn && (
                            <div className={styles.cvProfessionalContactRow}>
                                <span className={styles.icon}> in </span>
                                <span>{data.personal.linkedIn}</span>
                            </div>
                        )}

                        {data.personal.portfolio && (
                            <div className={styles.cvProfessionalContactRow}>
                                <span className={styles.icon}> 🌐 </span>
                                <span>{data.personal.portfolio}</span>
                            </div>
                        )}

                    </div>
                </div>

                <div className={styles.cvProfessionalDivider} />

                {/* SUMMARY */}
                {data.personal.summary && (
                    <section className={styles.cvProfessionalSection}>
                        <ProfessionalSection title="Professional Summary">
                            <p>{data.personal.summary}</p>
                        </ProfessionalSection>
                    </section>
                )}

                {/* EXPERIENCE */}
                {data.experience.length > 0 && (
                    <section className={styles.cvProfessionalSection}>
                        <ProfessionalSection title="Professional Experience">
                            {data.experience.map(exp => (
                                <div key={exp.id} className={styles.cvProfessionalItem}>
                                    <div className={styles.cvProfessionalRow}>
                                        <strong>{exp.jobTitle}</strong>
                                        <span>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>

                                    <div className={styles.cvProfessionalSub}>
                                        {exp.company}
                                        {exp.location && ` | ${exp.location}`}
                                    </div>

                                    <ul>
                                        {exp.responsibilities
                                            .split('\n')
                                            .map((item, i) =>
                                                item.trim() ? <li key={i}>{item}</li> : null
                                            )}
                                    </ul>
                                </div>
                            ))}
                        </ProfessionalSection>
                    </section>
                )}

                {/* EDUCATION */}
                {data.education.length > 0 && (
                    <section className={styles.cvProfessionalSection}>
                        <ProfessionalSection title="Education">
                            {data.education.map(edu => (
                                <div key={edu.id} className={styles.cvProfessionalItem}>
                                    <div className={styles.cvProfessionalRow}>
                                        <strong>{edu.degree}</strong>
                                        <span>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>
                                    <div className={styles.cvProfessionalSub}>
                                        {edu.institution}
                                        {edu.location && ` | ${edu.location}`}
                                    </div>
                                    {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                                </div>
                            ))}
                        </ProfessionalSection>
                    </section>
                )}

                {/* SKILLS */}
                {data.skills.length > 0 && (
                    <section className={styles.cvProfessionalSection}>
                        <ProfessionalSection title="Core Skills">
                            {data.skills.map(skill => (
                                <p key={skill.id}>
                                    <strong>{skill.category}:</strong> {skill.items}
                                </p>
                            ))}
                        </ProfessionalSection>
                    </section>
                )}
            </div>
        );
    }

    if (template === 'creative') {
        return (
            <div className={styles.cvCreative}>
                {/* LEFT COLUMN */}
                <aside className={styles.cvCreativeSidebar}>
                    <h1>{data.personal.fullName || 'Your Name'}</h1>

                    <p className={styles.cvCreativeTitle}>
                        {data.personal.jobTitle}
                    </p>

                    <div className={styles.cvCreativeContact}>
                        {data.personal.email && <p>{data.personal.email}</p>}
                        {data.personal.phone && <p>{data.personal.phone}</p>}
                        {data.personal.location && <p>{data.personal.location}</p>}
                        {data.personal.linkedIn && <p>{data.personal.linkedIn}</p>}
                        {data.personal.portfolio && <p>{data.personal.portfolio}</p>}
                    </div>

                    {data.skills.length > 0 && (
                        <div className={styles.cvCreativeSection}>
                            <h3>CORE SKILLS</h3>
                            {data.skills.map(skill => (
                                <p key={skill.id}>
                                    <strong>{skill.category}:</strong> {skill.items}
                                </p>
                            ))}
                        </div>
                    )}
                </aside>

                {/* RIGHT COLUMN */}
                <main className={styles.cvCreativeMain}>
                    {data.personal.summary && (
                        <section className={styles.cvCreativeSection}>
                            <h3>PROFESSIONAL SUMMARY</h3>
                            <p>{data.personal.summary}</p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section className={styles.cvCreativeSection}>
                            <h3>PROFESSIONAL EXPERIENCE</h3>

                            {data.experience.map(exp => (
                                <div key={exp.id} className={styles.cvCreativeItem}>
                                    <div className={styles.cvCreativeRow}>
                                        <strong>{exp.jobTitle}</strong>
                                        <span>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>

                                    <div className={styles.cvCreativeSub}>
                                        {exp.company}{exp.location && ` | ${exp.location}`}
                                    </div>

                                    <ul>
                                        {exp.responsibilities.split('\n').map((item, i) => (
                                            item.trim() && <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section className={styles.cvCreativeSection}>
                            <h3>EDUCATION</h3>

                            {data.education.map(edu => (
                                <div key={edu.id} className={styles.cvCreativeItem}>
                                    <div className={styles.cvCreativeRow}>
                                        <strong>{edu.degree}</strong>
                                        <span>
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>

                                    <div className={styles.cvCreativeSub}>
                                        {edu.institution}{edu.location && ` | ${edu.location}`}
                                    </div>
                                    {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                                </div>
                            ))}
                        </section>
                    )}
                </main>
            </div>
        );
    }

    if (template === 'minimal') {
        return (
            <div className={styles.cvMinimal}>
                {/* HEADER */}
                <header className={styles.cvMinimalHeader}>
                    <h1>{data.personal.fullName || 'Your Name'}</h1>

                    {data.personal.jobTitle && (
                        <p className={styles.cvMinimalTitle}>
                            {data.personal.jobTitle}
                        </p>
                    )}

                    <div className={styles.cvMinimalContact}>
                        {(() => {
                            const contact = [
                                data.personal.email,
                                data.personal.phone,
                                data.personal.location,
                                data.personal.linkedIn,
                                data.personal.portfolio,
                            ].filter(Boolean).join(' • ');

                            return <span>{contact}</span>;
                        })()}
                    </div>
                </header>

                {/* SUMMARY */}
                {data.personal.summary && (
                    <section className={styles.cvMinimalSection}>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{data.personal.summary}</p>
                    </section>
                )}

                {/* EXPERIENCE */}
                {data.experience.length > 0 && (
                    <section className={styles.cvMinimalSection}>
                        <h3>EXPERIENCE</h3>

                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvMinimalItem}>
                                <div className={styles.cvMinimalRow}>
                                    <strong>{exp.jobTitle}</strong>
                                    <span>
                                        {exp.startDate} -{' '}
                                        {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>

                                <p className={styles.cvMinimalSub}>
                                    {exp.company}
                                    {exp.location && ` • ${exp.location}`}
                                </p>

                                <ul>
                                    {exp.responsibilities.split('\n').map((item, i) => (
                                        item.trim() && <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* EDUCATION */}
                {data.education.length > 0 && (
                    <section className={styles.cvMinimalSection}>
                        <h3>EDUCATION</h3>

                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvMinimalItem}>
                                <div className={styles.cvMinimalRow}>
                                    <strong>{edu.degree}</strong>
                                    <span>
                                        {edu.startDate} -{' '}
                                        {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>

                                <p className={styles.cvMinimalSub}>
                                    {edu.institution}
                                    {edu.location && ` • ${edu.location}`}
                                </p>
                                {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* SKILLS */}
                {data.skills.length > 0 && (
                    <section className={styles.cvMinimalSection}>
                        <h3>SKILLS</h3>

                        {data.skills.map(skill => (
                            <p key={skill.id}>
                                <strong>{skill.category}:</strong> {skill.items}
                            </p>
                        ))}
                    </section>
                )}
            </div>
        );
    }

    if (template === 'sofaa') {
        return (
            <div className={styles.cvSofaa}>
                <div className={styles.cvSofaaHeader}>
                    <h1>{data.personal.fullName || 'Your Name'}</h1>

                    <div className={styles.cvSofaaContactLine}>
                        {[
                            data.personal.email,
                            data.personal.phone,
                            data.personal.location,
                            data.personal.linkedIn,
                            data.personal.portfolio
                        ]
                            .filter(Boolean)
                            .join(' | ')}
                    </div>
                </div>

                {data.personal.summary && (
                    <section className={styles.cvSofaaSection}>
                        <h3>PROFESSIONAL SUMMARY</h3>
                        <p>{data.personal.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section className={styles.cvSofaaSection}>
                        <h3>EXPERIENCE</h3>

                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvSofaaItem}>
                                <div className={styles.cvSofaaRow}>
                                    <strong className={styles.cvSofaaTitle}>
                                        {exp.jobTitle}
                                    </strong>

                                    <span className={styles.cvSofaaDate}>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>

                                <div className={styles.cvSofaaDivider} />

                                <div className={styles.cvSofaaSub}>
                                    {exp.company}{exp.location && ` | ${exp.location}`}
                                </div>

                                <ul>
                                    {exp.responsibilities
                                        .split('\n')
                                        .map((item, i) =>
                                            item.trim() ? <li key={i}>{item}</li> : null
                                        )}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {data.education.length > 0 && (
                    <section className={styles.cvSofaaSection}>
                        <h3>EDUCATION</h3>

                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvSofaaItem}>
                                <div className={styles.cvSofaaRow}>
                                    <strong className={styles.cvSofaaTitle}>
                                        {edu.degree}
                                    </strong>

                                    <span className={styles.cvSofaaDate}>
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>

                                <div className={styles.cvSofaaDivider} />

                                <div className={styles.cvSofaaSub}>
                                    {edu.institution}{edu.location && ` | ${edu.location}`}
                                </div>
                                {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {data.skills.length > 0 && (
                    <section className={styles.cvSofaaSection}>
                        <h3>SKILLS</h3>

                        {data.skills.map(skill => (
                            <p key={skill.id}>
                                <strong>{skill.category}:</strong> {skill.items}
                            </p>
                        ))}
                    </section>
                )}
            </div>
        );
    }

    return (
        <div className={styles.cvSingleColumn}>
            {/* Header */}
            <div className={styles.cvHeader} style={{ background: accentColor }}>
                <h1 className={styles.cvName}>{data.personal.fullName || 'Your Name'}</h1>
                {data.personal.jobTitle && (
                    <p className={styles.cvJobTitle}>{data.personal.jobTitle}</p>
                )}
                <div className={styles.cvContactRow}>
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.email && <span>{data.personal.email}</span>}
                    {data.personal.location && <span>{data.personal.location}</span>}
                </div>
                {(data.personal.linkedIn || data.personal.portfolio) && (
                    <div className={styles.cvContactRow}>
                        {data.personal.linkedIn && <span>{data.personal.linkedIn}</span>}
                        {data.personal.portfolio && <span>{data.personal.portfolio}</span>}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className={styles.cvBody}>
                {data.personal.summary && (
                    <div className={styles.cvSection}>
                        <h3 className={styles.cvHeading} style={{ borderColor: accentColor }}>
                            Professional Summary
                        </h3>
                        <p className={styles.cvText}>{data.personal.summary}</p>
                    </div>
                )}

                {data.experience.length > 0 && (
                    <div className={styles.cvSection}>
                        <h3 className={styles.cvHeading} style={{ borderColor: accentColor }}>
                            Work Experience
                        </h3>
                        {data.experience.map(exp => (
                            <div key={exp.id} className={styles.cvItem}>
                                <div className={styles.cvItemHeader}>
                                    <h4 className={styles.cvItemTitle}>{exp.jobTitle}</h4>
                                    <span className={styles.cvItemDate}>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className={styles.cvItemSubtitle}>
                                    {exp.company}
                                    {exp.location && ` | ${exp.location}`}
                                </p>
                                <ul className={styles.cvList}>
                                    {exp.responsibilities.split('\n').map((item, i) => (
                                        item.trim() && <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {data.education.length > 0 && (
                    <div className={styles.cvSection}>
                        <h3 className={styles.cvHeading} style={{ borderColor: accentColor }}>
                            Education
                        </h3>
                        {data.education.map(edu => (
                            <div key={edu.id} className={styles.cvItem}>
                                <div className={styles.cvItemHeader}>
                                    <h4 className={styles.cvItemTitle}>{edu.degree}</h4>
                                    <span className={styles.cvItemDate}>
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <p className={styles.cvItemSubtitle}>
                                    {edu.institution}
                                    {edu.location && ` | ${edu.location}`}
                                </p>
                                {edu.achievements && <p className={styles.cvText}>{edu.achievements}</p>}
                            </div>
                        ))}
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div className={styles.cvSection}>
                        <h3 className={styles.cvHeading} style={{ borderColor: accentColor }}>
                            Skills
                        </h3>
                        {data.skills.map(skill => (
                            <div key={skill.id} className={styles.cvSkillRow}>
                                <strong>{skill.category}:</strong> {skill.items}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}