import React from 'react';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Pdf from './CV - Jesse Burström - English.pdf';

import jesse1 from '../img/jesse1.jpg';
import jesse3 from '../img/jesse3.jpg';

const HomePage = () => (
    <>
        <section className="intro" id="home">
            <h1 className="h1 section__title section__title--intro">
                Hi, I am <strong>Jesse Burström</strong>
            </h1>
            <p className="section__subtitle section__subtitle--intro">fullstack developer</p>
            <img src={jesse1} alt="My home office" className="intro__img" />
        </section>

        <section className="my-services" id="services">
            <h2 className="h2 section__title section__title--services">What I can do</h2>
            <div className="services">
                <div className="service">
                    <h3 className="h3">Design + Development</h3>
                    <p>This homepage is a demonstration of React programming. In the navigation bar there is different live projects to check out.</p>
                </div> 
                
                <div className="service">
                    <h3 className="h3">Client System</h3>
                    <p>I am also developing a general, all platform from same code, application system in Flutter. The goal is to bridge the gap from idea to product and enable testing coding ideas.</p>
                </div> 
                
                <div className="service">
                    <h3 className="h3">Data Science</h3>
                    <p>I have a masters degree in mathematical statistics. I program big data using Python or R for among other predictive modelling.</p>
                    
                </div> 
            </div>
            
            <a href={Pdf} target="_blank" className="btn">My CV</a>
        </section>

        <section className="about-me" id="about">
           <h2 className="h2 section__title section__title--about">Who I am</h2>
           <p className="section__subtitle section__subtitle--about">Developer & Data Scientist from Malmö Sweden</p>
           
           <div className="about-me__body">
               <p>I am dedicated and professional in my approach to programming. I have studied it a long time and I am now looking for a job as a programmer to get practical experience.
               This is the career I intend to excel at.</p>
               
               <p>I'm a good communicator and love to work with people in teams.</p>
                <p>I am self going as well as good at following instructions when developing and coding.</p>
               
           </div>
           
           <img src={jesse3} alt="Graduating University 2013" className="about-me__img" />
        </section>
        
        <footer className="footer">
        
            <a href="mailto:jessse.burstrom@gmail.com" className="footer__link">jesse.burstrom@gmail.com</a>
            <ul className="social-list">
                <li className="social-list__item">
                    <a className="social-list__link" href="https://github.com/jesseburstrom">
                    <FontAwesomeIcon icon={faGithub} />
                        
                    </a>
                </li>
                <li className="social-list__item">
                    <a className="social-list__link" href="https://linkedin.com/in/jesse-burström">
                    <FontAwesomeIcon icon={faLinkedin} />
                        <i className="fab fa-dribbble"></i>
                    </a>
                </li>
                
            </ul>
        </footer>
        
    </>
);

export default HomePage;