import React from 'react';
import { ArrowRight, BookOpen, Clock, Star, ShieldCheck, Users, Layout, Monitor, Globe, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={`container ${styles.heroContainer}`}>
                    <div className={styles.heroText}>
                        <span className={styles.tagline}>— Online e-Learning Course</span>
                        <h1 className={styles.headline}>
                            Online Education <br />
                            Feels Like <span className={styles.highlight}>Real Classroom</span>
                        </h1>
                        <p className={styles.subheadline}>
                            Get Certified. Gain Job-Ready Skills. Great Life.
                            Experience our new AI Tutor to master subjects faster.
                        </p>
                        <div className={styles.heroActions}>
                            <Link to="/ai-tutor" className="btn btn-primary">
                                GET STARTED <ArrowRight size={18} />
                            </Link>
                            <Link to="/courses" className={styles.btnOutline} style={{
                                background: '#1b1f2e', color: 'white', padding: '0.75rem 1.5rem',
                                borderRadius: '9999px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                                OUR COURSES <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        {/* Circle Background Effect */}
                        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: '#e0f2fe', zIndex: 0 }}></div>

                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                            alt="Student"
                            className={styles.studentImg}
                        />

                        {/* Floating Badges */}
                        <div className={`${styles.badgeFloat} ${styles.badge1}`}>
                            <div className={styles.badgeIcon}><Award size={20} /></div>
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>16,500+</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Active Students</div>
                            </div>
                        </div>

                        <div className={`${styles.badgeFloat} ${styles.badge2}`}>
                            <div className={styles.badgeIcon} style={{ background: '#ef4444' }}><Layout size={20} /></div>
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '1.1rem' }}>7,500+</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Online Courses</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <div className={styles.featuresSection}>
                <div className={`container ${styles.featuresGrid}`}>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><BookOpen size={24} /></div>
                        <div className={styles.featureText}>20k+ Online Courses</div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><Clock size={24} /></div>
                        <div className={styles.featureText}>Lifetime Access</div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><Award size={24} /></div>
                        <div className={styles.featureText}>Value For Money</div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><ShieldCheck size={24} /></div>
                        <div className={styles.featureText}>Lifetime Support</div>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><Users size={24} /></div>
                        <div className={styles.featureText}>Community Support</div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section className={styles.aboutSection}>
                <div className={`container ${styles.aboutGrid}`}>
                    <div className={styles.aboutImageCol}>
                        <img
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                            alt="About Us"
                            className={styles.collageImg}
                        />
                        <div style={{ position: 'absolute', top: -20, right: -20, background: 'white', padding: '1rem', borderRadius: '50%', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                            <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--color-primary)', lineHeight: 1.1 }}>
                                24+ <br /><span style={{ fontSize: '0.8rem', color: '#666' }}>YEARS</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.aboutContentCol}>
                        <span className={styles.tagline}>GET TO KNOW ABOUT US</span>
                        <h2 className={styles.headline} style={{ fontSize: '2.5rem' }}>
                            Dive into our Online Courses <br /> and Ignite Your Learning!
                        </h2>
                        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                            Collaboratively simplify user-friendly networks after principle-centered coordinate effective methods of empowerment. Distributed niche markets.
                        </p>
                        <ul className={styles.checkList}>
                            <li className={styles.checkItem}>
                                <ShieldCheck size={20} className={styles.checkIcon} />
                                <span>Dramatically re-engineer value added systems via mission.</span>
                            </li>
                            <li className={styles.checkItem}>
                                <Layout size={20} className={styles.checkIcon} />
                                <span>Access more than 100k online courses.</span>
                            </li>
                            <li className={styles.checkItem}>
                                <Award size={20} className={styles.checkIcon} />
                                <span>Learn the high-impact skills that top companies want.</span>
                            </li>
                        </ul>
                        <button className="btn btn-primary">ABOUT MORE →</button>
                    </div>
                </div>
            </section>

            {/* Popular Courses */}
            <section className={styles.coursesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.tagline}>POPULAR COURSES</span>
                        <h2 className={styles.sectionTitle}>Our Popular Online Courses</h2>
                    </div>

                    <div className={styles.courseFilters}>
                        <button className={`${styles.filterBtn} ${styles.active}`}><Monitor size={16} style={{ marginRight: 8 }} /> Digital Marketing</button>
                        <button className={styles.filterBtn}><Layout size={16} style={{ marginRight: 8 }} /> UI/UX Design</button>
                        <button className={styles.filterBtn}><Globe size={16} style={{ marginRight: 8 }} /> Web Development</button>
                        <button className={styles.filterBtn}><Award size={16} style={{ marginRight: 8 }} /> Graphic Design</button>
                    </div>

                    <div className={styles.courseGrid}>
                        {/* Course 1 */}
                        <div className={styles.courseCard}>
                            <div className={styles.cardImage}>
                                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400" className={styles.cardImg} alt="Course" />
                                <span className={styles.cardBadge}>03 WEEKS</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span><BookOpen size={14} /> 12 Lessons</span>
                                    <span><Users size={14} /> 50+ Students</span>
                                </div>
                                <h3 className={styles.cardTitle}>Learn Figma - UI/UX Design Essential Training</h3>
                                <div className={styles.cardFooter}>
                                    <div className={styles.instructor}>
                                        <div className={styles.instructorAvatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=1)', backgroundSize: 'cover' }}></div>
                                        <span style={{ color: '#666' }}>Kevin Perry</span>
                                    </div>
                                    <span className={styles.price}>FREE</span>
                                </div>
                            </div>
                        </div>

                        {/* Course 2 */}
                        <div className={styles.courseCard}>
                            <div className={styles.cardImage}>
                                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400" className={styles.cardImg} alt="Course" />
                                <span className={styles.cardBadge} style={{ background: '#ef4444' }}>02 WEEKS</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span><BookOpen size={14} /> 8 Lessons</span>
                                    <span><Users size={14} /> 30+ Students</span>
                                </div>
                                <h3 className={styles.cardTitle}>Advanced Python & JS System Scripting</h3>
                                <div className={styles.cardFooter}>
                                    <div className={styles.instructor}>
                                        <div className={styles.instructorAvatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=2)', backgroundSize: 'cover' }}></div>
                                        <span style={{ color: '#666' }}>Max Alexis</span>
                                    </div>
                                    <span className={styles.price}>FREE</span>
                                </div>
                            </div>
                        </div>

                        {/* Course 3 */}
                        <div className={styles.courseCard}>
                            <div className={styles.cardImage}>
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" className={styles.cardImg} alt="Course" />
                                <span className={styles.cardBadge}>04 WEEKS</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span><BookOpen size={14} /> 15 Lessons</span>
                                    <span><Users size={14} /> 100+ Students</span>
                                </div>
                                <h3 className={styles.cardTitle}>IT Statistics Data Science and Business Analysis</h3>
                                <div className={styles.cardFooter}>
                                    <div className={styles.instructor}>
                                        <div className={styles.instructorAvatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=3)', backgroundSize: 'cover' }}></div>
                                        <span style={{ color: '#666' }}>Kevin Perry</span>
                                    </div>
                                    <span className={styles.price}>FREE</span>
                                </div>
                            </div>
                        </div>

                        {/* Course 4 */}
                        <div className={styles.courseCard}>
                            <div className={styles.cardImage}>
                                <img src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=400" className={styles.cardImg} alt="Course" />
                                <span className={styles.cardBadge} style={{ background: '#ef4444' }}>02 WEEKS</span>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.cardMeta}>
                                    <span><BookOpen size={14} /> 18 Lessons</span>
                                    <span><Users size={14} /> 20+ Students</span>
                                </div>
                                <h3 className={styles.cardTitle}>Android 12 & Kotlin Development Course</h3>
                                <div className={styles.cardFooter}>
                                    <div className={styles.instructor}>
                                        <div className={styles.instructorAvatar} style={{ backgroundImage: 'url(https://i.pravatar.cc/100?img=4)', backgroundSize: 'cover' }}></div>
                                        <span style={{ color: '#666' }}>Max Alexis</span>
                                    </div>
                                    <span className={styles.price}>FREE</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <Link to="/courses" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>VIEW ALL COURSES →</Link>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;
