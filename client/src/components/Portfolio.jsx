import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../Portfolio.module.css';
import '../Portfolio.css'

function Portfolio() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://<YOUR-API-URL>/api/portfolio/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className={styles.portfolio}>
      <header className={styles['header-area']}>
        <div className={styles.container}>
          <div className={styles.header}>
            <a href="" className={styles.logo}>
            <span className={styles.signature}>{userData.name}</span>
              <i className={`fa fa-bolt ${styles['fa-bolt']}`}></i>
            </a>
            <ul className={styles.navbar}>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <div className={styles.menu_icon}>
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.FirstElement} id="home">
        <div className={styles['profile-photo']}>
          <img src={userData.imageUrl} alt="profile picture" />
        </div>
        <div className={styles['profile-text']}>
          <h5>Hi I'm </h5><br />
          <h1>{userData.name}</h1><br />
          <p>{userData.aboutMe}</p>
          
          <div className={styles['btn-group']}>
            <a href={userData.resumeUrl} className={`${styles.btn} ${styles.active}`}>Download CV</a>
            <a href={`mailto:${userData.email}`} className={styles.btn}>Contact</a>
          </div>

          <div className={styles.social}>
            <a href={`mailto:${userData.email}`}><i className="fa fa-envelope"></i></a>
            <a href={userData.githubLink}><i className="fa-brands fa-github"></i></a>
            <a href={userData.leetcodeLink}><i className="fa fa-code"></i></a>
            <a href={userData.linkedinLink}><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <section className={styles['about-area']} id="about">
        <div className={styles.container}>
          <div className={styles.about}>
            <div className={styles['about-content']}>
              <h4>About Me</h4>
              <ul>
                {userData.aboutMe.split('. ').map((sentence, index) => (
                  <li key={index}>{sentence}</li>
                ))}
              </ul>
            </div>
            <div className={styles['about-skills']}>
              <ul>
                <li>Name: {userData.name}</li>
                <li>Age: {userData.age}</li>
                <li>From: {userData.from}</li>
                <li>Email: {userData.email}</li>
                <li>Availability: {userData.availability}</li>
                <li>Experience: {userData.experience}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['education-content']} id="education">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.education}>
              <h3 className={styles.title}>Education</h3>
              <div className={styles.row}>
                <div className={styles['timeline-box']}>
                  <div className={styles.timeline}>
                    {userData.education.map((edu, index) => (
                      <div className={styles['timeline-item']} key={index}>
                        <div className={styles['circle-dot']}></div>
                        <h3 className={styles['timeline-title']}>
                          {edu.degree} - {edu.percentage}
                        </h3>
                        <h4 className={styles['timeline-title']}>{edu.institution}</h4>
                        <h4 className={styles['timeline-title']}>
                          <i className="fa fa-calendar"></i> {edu.year}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.internship}>
              <h3 className={styles.title}>Internship</h3>
              <div className={styles.row}>
                <div className={styles['timeline-box']}>
                  <div className={styles.timeline}>
                    {userData.internships.map((internship, index) => (
                      <div className={styles['timeline-item']} key={index}>
                        <div className={styles['circle-dot']}></div>
                        <h3 className={styles['timeline-title']}>
                          {internship.title}
                        </h3>
                        <h4 className={styles['timeline-title']}>{internship.company}</h4>
                        <h4 className={styles['timeline-title']}>
                          <i className="fa fa-calendar"></i> {internship.date}
                        </h4>
                        <p className={styles['timeline-text']}>{internship.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles['project-content']} id="projects">
        <div className={styles.container}>
          <div className={styles['project-title']}>
            <h4>My Projects</h4>
            <p>Discover my projects, where creativity meets innovation</p>
          </div>
          <div className={styles.projects}>
            {userData.projects.map((project, index) => (
              <div className={styles.project} key={index}>
                <i className={project.icon}></i>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['contact-content']} id="contact">
        <div className={styles.container}>
          <div className={styles['contact-title']}>
            <h4>Contact Me</h4>
            <p>Get In Touch</p>
          </div>
          <div className={styles.contact}>
            <form name="submitToGoogleSheet">
              <input type="text" name="NAME" placeholder="Name" required />
              <input type="email" name="EMAIL" placeholder="Email" required />
              <input type="text" name="SUBJECT" placeholder="Subject" />
              <textarea name="MESSAGE" placeholder="Message"></textarea>
              <input type="submit" value="Send Message" className={styles.submit} />
            </form>
            <span id="msg"></span>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <small className={styles.message}>Thanks for visiting and happy coding!</small>
        <small className={styles.copyright}>&copy; Copyright 2023. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Portfolio;