import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, PlayCircle, Award, List } from 'lucide-react';
import styles from './TopicViewer.module.css';
import { curriculumData } from '../data/curriculumData';

const TopicViewer = () => {
    const { classId, subjectId, chapterId, topicId } = useParams();
    const [progress, setProgress] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Find Topic Data
    const cls = curriculumData[classId];
    const subject = cls?.subjects.find(s => s.id === subjectId);
    const chapter = subject?.chapters.find(c => c.id === chapterId);
    const topic = chapter?.topics.find(t => t.id === topicId);

    useEffect(() => {
        // Reset state on topic change
        setProgress(0);
        setQuizStarted(false);
        setAnswers({});
        setShowResults(false);
        setScore(0);

        // Simulate "watching" video progress
        const timer = setTimeout(() => {
            if (progress < 50) setProgress(50);
        }, 5000); // 5 seconds "watch" time for demo

        return () => clearTimeout(timer);
    }, [topicId]);

    if (!topic) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Topic not found. <Link to="/curriculum">Back to Curriculum</Link></div>;
    }

    const handleQuizSubmit = () => {
        let correctCount = 0;
        topic.quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
        if (correctCount === topic.quiz.questions.length) {
            setProgress(100);
        } else {
            // Partial progress could be calculated here
            setProgress(50 + (correctCount / topic.quiz.questions.length) * 50);
        }
    };

    return (
        <div className={styles.viewerContainer}>
            {/* Sidebar Navigation */}
            <div className={styles.sidebar}>
                <Link to="/curriculum" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', textDecoration: 'none', color: 'var(--color-primary)', fontWeight: '600' }}>
                    <ArrowLeft size={18} /> Back to Courses
                </Link>

                <h3 className={styles.sidebarTitle}>{subject.title}</h3>
                <div className={styles.chapterTitle}>{chapter.title}</div>

                {chapter.topics.map((t) => (
                    <Link
                        key={t.id}
                        to={`/learn/${classId}/${subjectId}/${chapterId}/${t.id}`}
                        className={`${styles.topicLink} ${t.id === topicId ? styles.active : ''}`}
                    >
                        {t.title}
                    </Link>
                ))}
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                <div className={styles.contentWrapper}>
                    <div className={styles.topicHeader}>
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{topic.title}</h1>
                            <p style={{ color: 'var(--color-text-muted)' }}>{topic.description}</p>
                        </div>
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className={styles.progressText}>{Math.round(progress)}% Complete</div>
                        </div>
                    </div>

                    {/* YouTube Embed */}
                    <div className={styles.videoContainer}>
                        <iframe
                            className={styles.videoFrame}
                            src={`https://www.youtube.com/embed/${topic.videoId}?rel=0`}
                            title={topic.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Quiz Section */}
                    {topic.quiz && (
                        <div className={styles.quizSection}>
                            <div className={styles.quizTitle}>
                                <Award size={28} color="#f59e0b" />
                                <span>Challenge Quiz</span>
                            </div>

                            {!showResults ? (
                                <>
                                    {topic.quiz.questions.map((q, qIndex) => (
                                        <div key={qIndex} className={styles.questionCard}>
                                            <div className={styles.questionText}>{qIndex + 1}. {q.question}</div>
                                            <div className={styles.optionsGrid}>
                                                {q.options.map((opt, optIndex) => (
                                                    <button
                                                        key={optIndex}
                                                        className={`${styles.optionBtn} ${answers[qIndex] === optIndex ? styles.selected : ''}`}
                                                        onClick={() => setAnswers({ ...answers, [qIndex]: optIndex })}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%', marginTop: '1rem' }}
                                        onClick={handleQuizSubmit}
                                        disabled={Object.keys(answers).length < topic.quiz.questions.length}
                                    >
                                        Submit Answers
                                    </button>
                                </>
                            ) : (
                                <div className={styles.quizResult}>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                                        {score === topic.quiz.questions.length ? 'Perfect Score!' : 'Good Effort!'}
                                    </h2>
                                    <p style={{ fontSize: '1.2rem' }}>You got {score} out of {topic.quiz.questions.length} correct.</p>
                                    <div style={{ marginTop: '2rem' }}>
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => { setShowResults(false); setAnswers({}); setScore(0); }}
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopicViewer;
