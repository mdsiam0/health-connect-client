import React from 'react';
import Banner from '../components/Banner';
import PopularCamps from '../components/PopularCamps';
import FeedbackSection from '../components/FeedbackSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCamps></PopularCamps>
            <FeedbackSection></FeedbackSection>
        </div>
    );
};

export default Home;