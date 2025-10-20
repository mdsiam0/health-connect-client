import React from 'react';
import Banner from '../components/Banner';
import PopularCamps from '../components/PopularCamps';
import FeedbackSection from '../components/FeedbackSection';
import OurMission from '../components/OurMission';
import ContactSection from '../components/ContactSection';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <FeedbackSection></FeedbackSection>
            
            <OurMission></OurMission>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;