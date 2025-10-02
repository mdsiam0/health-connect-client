import React from 'react';
import Banner from '../components/Banner';
import PopularCamps from '../components/PopularCamps';
import FeedbackSection from '../components/FeedbackSection';
import OurMission from '../components/OurMission';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <FeedbackSection></FeedbackSection>
            
            <OurMission></OurMission>
        </div>
    );
};

export default Home;