import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    Search, Menu, GraduationCap
} from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <header className={styles.headerWrapper}>
            {/* Main Navbar - White */}
            <nav className={styles.navbar}>
                <div className={`container ${styles.navContainer}`}>
                    {/* Logo Section */}
                    <Link to="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <GraduationCap size={24} color="white" />
                        </div>
                        <span className={styles.logoText}>EDURA</span>
                    </Link>

                    {/* Navigation - Center */}
                    <div className={styles.navLinks}>
                        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} active` : styles.link}>Home</NavLink>
                        <NavLink to="/curriculum" className={({ isActive }) => isActive ? `${styles.link} active` : styles.link}>Curriculum</NavLink>
                        <NavLink to="/ai-tutor" className={({ isActive }) => isActive ? `${styles.link} active` : styles.link}>AI Tutor</NavLink>
                        <NavLink to="/teachers" className={styles.link}>Teachers</NavLink>
                        <NavLink to="/blog" className={styles.link}>Blog</NavLink>
                    </div>

                    {/* Search Bar - Center Right */}
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Search For Course..." className={styles.searchInput} />
                        <Search size={18} color="var(--color-primary)" />
                    </div>

                    {/* Right Actions */}
                    <div className={styles.navActions}>
                        <Link to="/login" className={styles.btnOutline} style={{ border: 'none', fontWeight: '600', textDecoration: 'none', marginRight: '1rem' }}>
                            Login
                        </Link>
                        <Link to="/signup" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
                            Sign Up
                        </Link>

                        <button className={styles.mobileMenu}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
