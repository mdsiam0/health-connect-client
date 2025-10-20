import React from 'react';
import Banner from '../components/Banner';
import PopularCamps from '../components/PopularCamps';
import FeedbackSection from '../components/FeedbackSection';
import OurMission from '../components/OurMission';
import ContactSection from '../components/ContactSection';
import AboutSection from '../components/AboutSection';
import BlogPreviewSection from '../components/BlogPreviewSection';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            
            <PopularCamps></PopularCamps>
            <AboutSection></AboutSection>
           
            
            <OurMission></OurMission>
             <FeedbackSection></FeedbackSection>
             <BlogPreviewSection></BlogPreviewSection>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;