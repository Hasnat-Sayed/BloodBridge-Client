import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/featured';
import ContactUs from '../components/ContactUs';
import ReviewSlider from '../components/ReviewSlider';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <ContactUs></ContactUs>
           <ReviewSlider></ReviewSlider>
        </div>
    );
};

export default Home;