import React from 'react';
import Founder from './Founder.png';
import Background from '../images/wall_background.jpg';
import Dumbell from '../images/dumbell.jpg';

const Home = () => {
    return (
        <div>
            <div id="Hero">
                <div className='hero-text'>
                    <h1>Didi's Gym</h1>
                    <p className="hero-p">Reach your goals</p>
                </div>
                <button className="hero-button">Get Started</button>
                <img className='parallax-bg' src={Background} alt="Background" />
            </div>
            <div id="welcome" className='welcome'>
                <h2>Welcome to Didi's Gym</h2>
                <p>The website that will help create costum meal and workout plans. Build Muscle or lose some fat with the help of our tools</p>
                <img className='dumbell-left' src={Dumbell} alt="Dumbell" />
                <img className='dumbell-right' src={Dumbell} alt="Dumbell" />
            </div>
            <div id="services">
                <h2 className="services-title">What we offer:</h2>
                <div className="service-meal">
                    <h2>Meal Plans</h2>
                    <p>Our meal plans are designed to help you reach your fitness goals. Whether you want to build muscle or lose fat, we have a plan for you. Our meal plans are easy to follow and delicious, so you can stay on track and reach your goals.</p>
                </div>
                <div className="service-workout">
                    <h2>Workout Plans</h2>
                    <p>Our workout plans are designed to help you reach your fitness goals. Whether you want to build muscle or lose fat, we have a plan for you. Our workout plans are easy to follow and effective, so you can stay on track and reach your goals.</p>
                </div>
                <div className="service-progress">
                    <h2>Progress Tracker</h2>
                    <p>Our progress tracker is designed to help you track your progress and stay motivated. You can track your weight, body fat percentage, and more. Our progress tracker is easy to use and effective, so you can stay on track and reach your goals.</p>
                </div>
            </div>
            <div id="about-us">
                <div className="about-gym">
                    <h2>About Us</h2>
                    <p className="about-gym-p1">Didi's Gym is a website that helps you reach your fitness goals. We provide a variety of exercises to help you reach your goals. We also provide a way to track your progress, so you can see how far you've come. Our goal is to help you reach your goals, and we're here to help you every step of the way.</p>
                    <p className="about-gym-p2">This website was created as a project to text the skills of Diogo Fonseca, and put in practice what he learned over time. He felt the need of a complete, functional and affordable Gym website that provided people with a lot of tools to help them on their goals</p>
                </div>
                <div className="about-founder">
                    <div className='image-container active' id="image-container">
                        <img src={Founder} alt="Founder" className="founder-img view" id="founder-img"/>
                        <div className="middle">
                            <div className="text"><a href="https://www.instagram.com/diogo_fonseca_7/" target='_blank'>Diogo Fonseca</a></div>
                        </div>
                    </div>
                    <div className='founder-text' id="founder-text">
                        <h2>The Founder</h2>
                        <p>Diogo Fonseca is a software developer with a passion for fitness.</p>
                        <p>He practiced a lot of sports in his life and was always a fit person, but when he joined Uni away from his hometown stopped with all his sports activity fattening him by over 30kg. Not feeling happy with his own body, he decided on embarking on a journey to lose his extra weight. In a year he lost all the weight he gained previous, making him happier and making him fall in love with the fitness lifestyle. So now he decided on creating this website to help the people that our goin through the same journey he went for.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Home;