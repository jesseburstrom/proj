import React from 'react';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Pdf from './CV - Jesse Burström - Swedish.pdf';

import jesse1 from '../img/jesse1.jpg';
import jesse3 from '../img/jesse3.jpg';

const HomePage = () => (
    <>
        <section className="intro" id="home">
            <h1 className="h1 section__title section__title--intro">
                Hej, Jag är <strong>Jesse Burström</strong>
            </h1>
            <p className="section__subtitle section__subtitle--intro">fullstack utvecklare</p>
            <img src={jesse1} alt="My home office" className="intro__img" />
        </section>

        <section className="my-services" id="services">
            <h2 className="h2 section__title section__title--services">Vad Jag kan göra</h2>
            <div className="services">
                <div className="service">
                    <h3 className="h3">Design + Utveckling</h3>
                    <p>Denna hemsida är en demonstration i React programmering. I menyn finns olika projekt att kolla in.</p>
                </div> 
                
                <div className="service">
                    <h3 className="h3">Client System</h3>
                    <p>Jag utvecklar också ett generellt, alla platformar med samma kod, applikationssystem i Flutter. Målet är att överbrygga avståndet från idé till färdig produkt och underlätta att testa nya ideer.</p>
                </div> 
                
                <div className="service">
                    <h3 className="h3">Datavetenskap</h3>
                    <p>Jag har en mastersexamen i matematisk statistik. Jag programmerar 'big data' med Python eller R för bland annat prediktiv modellering</p>
                </div> 
            </div>
            
            <a href={Pdf} target="_blank" className="btn">Mitt CV</a>
        </section>

        <section className="about-me" id="about">
           <h2 className="h2 section__title section__title--about">Vem är Jag</h2>
           <p className="section__subtitle section__subtitle--about">Utvecklare & Analytiker från Malmö Sverige</p>
           
           <div className="about-me__body">
               <p>Jag är engagerad och professionell i mitt förhållningssätt till programmering. Jag har studerat det länge och jag söker nu jobb som programmerare för att få praktisk erfarenhet.
               Det här är karriären jag tänker briljera med.</p>
               
               Jag är en bra kommunikatör och älskar att arbeta med människor i team.
                <p>Jag är självgående och bra på att följa instruktioner vid utveckling och kodning.</p>
               
           </div>
           
           <img src={jesse3} alt="Graduating University 2013" className="about-me__img" />
        </section>
        
        <footer className="footer">
        
            <a href="mailto:jessse.burstrom@gmail.com" className="footer__link">jesse.burstrom@gmail.com</a>
            <ul className="social-list">
                <li className="social-list__item">
                    <a className="social-list__link" href="https://github.com/jesseburstrom/proj">
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