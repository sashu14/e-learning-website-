import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Book, Atom, Calculator, Dna, Globe, Monitor } from 'lucide-react';
import styles from './Courses.module.css';

const Courses = () => {
    const [step, setStep] = useState(0); // 0: Class, 1: Subject, 2: Topics
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const classes = [
        { id: '9', label: 'Class 9', desc: 'Foundation' },
        { id: '10', label: 'Class 10', desc: 'Board Prep' },
        { id: '11', label: 'Class 11', desc: 'Stream Scl' },
        { id: '12', label: 'Class 12', desc: 'Final Year' },
    ];

    const subjects = [
        { id: 'math', label: 'Mathematics', icon: <Calculator size={24} />, color: '#3b82f6' },
        { id: 'phy', label: 'Physics', icon: <Atom size={24} />, color: '#8b5cf6' },
        { id: 'chem', label: 'Chemistry', icon: <Dna size={24} />, color: '#ec4899' },
        { id: 'bio', label: 'Biology', icon: <Globe size={24} />, color: '#10b981' },
        { id: 'cs', label: 'Comp. Sci', icon: <Monitor size={24} />, color: '#f59e0b' },
    ];

    const topics = [
        { id: 1, title: 'Algebraic Expressions', duration: '45m', complete: 30 },
        { id: 2, title: 'Linear Equations', duration: '1h 20m', complete: 0 },
        { id: 3, title: 'Quadratic Functions', duration: '55m', complete: 0 },
    ];

    const handleClassSelect = (cls) => {
        setSelectedClass(cls);
        setStep(1);
    };

    const handleSubjectSelect = (sub) => {
        setSelectedSubject(sub);
        setStep(2);
    };

    const goBack = () => {
        if (step === 2) setStep(1);
        if (step === 1) setStep(0);
    };

    return (
        <div className={`container ${styles.coursesContainer}`}>
            <div className={styles.header}>
                {step > 0 && (
                    <button onClick={goBack} className={styles.backBtn}>
                        <ArrowLeft size={20} />
                    </button>
                )}
                <h1>
                    {step === 0 && 'Select Your Class'}
                    {step === 1 && `Select Subject for ${selectedClass?.label}`}
                    {step === 2 && `${selectedSubject?.label} Topics`}
                </h1>
            </div>

            <div className={styles.contentArea}>
                {/* Step 0: Class Selection */}
                {step === 0 && (
                    <div className={styles.grid}>
                        {classes.map((cls) => (
                            <button
                                key={cls.id}
                                className={styles.selectionCard}
                                onClick={() => handleClassSelect(cls)}
                            >
                                <div className={styles.cardIcon}>
                                    <Book size={32} />
                                </div>
                                <h3>{cls.label}</h3>
                                <p>{cls.desc}</p>
                                <ChevronRight className={styles.arrow} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 1: Subject Selection */}
                {step === 1 && (
                    <div className={styles.grid}>
                        {subjects.map((sub) => (
                            <button
                                key={sub.id}
                                className={styles.selectionCard}
                                onClick={() => handleSubjectSelect(sub)}
                                style={{ '--accent-color': sub.color }}
                            >
                                <div className={styles.cardIcon} style={{ background: sub.color, color: 'white' }}>
                                    {sub.icon}
                                </div>
                                <h3>{sub.label}</h3>
                                <ChevronRight className={styles.arrow} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Step 2: Topics List */}
                {step === 2 && (
                    <div className={styles.topicList}>
                        {topics.map((topic) => (
                            <div key={topic.id} className={styles.topicCard}>
                                <div className={styles.topicInfo}>
                                    <h3>{topic.title}</h3>
                                    <span>{topic.duration}</span>
                                </div>
                                <div className={styles.topicAction}>
                                    <button className="btn btn-primary">Start</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
