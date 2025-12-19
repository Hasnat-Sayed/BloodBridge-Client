import React from 'react';
import Banner from '../components/Banner';
import Featured from '../components/featured';
import ContactUs from '../components/ContactUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Featured></Featured>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;