import React from 'react';
import styled from 'styled-components';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import LanguagesSection from './components/LanguagesSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingContainer = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF;
  font-family: 'Arial', sans-serif;
`;

const Landing = () => {
  return (
    <LandingContainer>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <LanguagesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </LandingContainer>
  );
};

export default Landing;
