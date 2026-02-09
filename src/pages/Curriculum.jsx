import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Lock, Layout } from 'lucide-react';
import styles from './Curriculum.module.css';
import { curriculumData } from '../data/curriculumData';

const Curriculum = () => {
    const [activeClass, setActiveClass] = useState('class1');

    return (
        <div className={styles.pageContainer}>
            <div className={`container`}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Explore the Curriculum</h1>
                    <p className={styles.subtitle}>Select your class and start your learning journey!</p>
                </div>

                <div className={styles.classSelector} style={{ flexWrap: 'wrap' }}>
                    {Object.keys(curriculumData).map((classId) => (
                        <button
                            key={classId}
                            className={`${styles.classBtn} ${activeClass === classId ? styles.active : ''}`}
                            onClick={() => setActiveClass(classId)}
                        >
                            {curriculumData[classId].title}
                        </button>
                    ))}
                </div>

                <div className={styles.subjectGrid}>
                    {curriculumData[activeClass] ? (
                        curriculumData[activeClass].subjects.map((subject) => (
                            <div key={subject.id} className={styles.subjectCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.subjectName}>{subject.title}</div>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{subject.chapters.length} Chapters</div>
                                </div>
                                <div className={styles.cardBody}>
                                    <ul className={styles.chapterList}>
                                        {subject.chapters.map((chapter) => (
                                            <li key={chapter.id} className={styles.chapterItem}>
                                                <div className={styles.chapterTitle}>
                                                    <BookOpen size={18} color="var(--color-primary)" />
                                                    {chapter.title}
                                                </div>
                                                <ul className={styles.topicList}>
                                                    {chapter.topics.map((topic) => (
                                                        <Link
                                                            to={`/learn/${activeClass}/${subject.id}/${chapter.id}/${topic.id}`}
                                                            key={topic.id}
                                                            className={styles.topicItem}
                                                        >
                                                            <span>{topic.title}</span>
                                                            <span className={styles.playIcon}>
                                                                <PlayCircle size={14} />
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', width: '100%', gridColumn: '1/-1', color: '#888' }}>
                            Select a class to view subjects.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Curriculum;
