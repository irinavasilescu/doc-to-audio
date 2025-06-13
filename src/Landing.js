import React from 'react';
import styled from 'styled-components';
import personReadingImage from './assets/person_reading.png'; // Import the image

const LandingContainer = styled.div`
  min-height: 100vh;
  background-color: #FFFFFF; /* White background */
  font-family: 'Arial', sans-serif; /* Example font, will refine later */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background-color: #FFFFFF;
  color: #333;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #192BC2;
  display: flex;
  align-items: center;

  img {
    height: 30px; /* Adjust size as needed */
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const PrimaryButton = styled.button`
  background-color: #192BC2; /* Enroll Now red */
  color: #FFFFFF;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #60A0C0;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #FFFFFF;
  color: #192BC2; /* Explore Course List blue */
  border: 1px solid #192BC2;

  &:hover {
    background-color: #D0EEF9;
    color: #307090;
    border-color: #307090;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4rem 4rem 4rem;
  min-height: calc(100vh - 80px);
  background-color: #FFFFFF;
  overflow: hidden;
  position: relative;
`;

const HeroContent = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  padding-right: 4rem;

  @media (max-width: 900px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: #333; /* Dark text */

  span {
    color: #192BC2;
  }
`;

const MainSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: #555;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  flex: 1;
  max-width: 300px;

  h3 {
    font-size: 2.5rem;
    color: #449DD1;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const ImagePlaceholder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* For the shapes */
  height: 500px; /* Adjust as needed */
  width: 100%;

  @media (max-width: 900px) {
    height: 300px;
  }
`;

const AppFeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: #F8F8F8; /* Light gray background */
  text-align: center;
`;

const AppFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 3rem;
`;

const AppFeatureCard = styled.div`
  background-color: #FFFFFF;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: left;

  h3 {
    font-size: 1.8rem;
    color: #78C0E0; /* Pink for titles */
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }
`;

const Landing = () => {
  return (
    <LandingContainer>
      <Header>
        <Logo>Scribbloo</Logo>
        <Nav>
          <SecondaryButton>Learn More</SecondaryButton>
          <PrimaryButton>Try Now</PrimaryButton>
        </Nav>
      </Header>

      <HeroSection>
        <HeroContent>
          <TextContent>
            <MainTitle>
              Turn your <span>PDFs</span> into <span>audio files.</span> <br/> Effortlessly.
            </MainTitle>
            <MainSubtitle>
            With one click, transform written content into engaging audio. It's your personal reader for work, study, or leisure—anytime, anywhere.
            </MainSubtitle>
          </TextContent>
          <ImagePlaceholder>
            <img src={personReadingImage} alt="Person reading and listening" style={{ maxWidth: '100%', height: 'auto' }} />
          </ImagePlaceholder>
        </HeroContent>
        <StatsContainer>
          <StatItem>
            <h3>Fast</h3>
            <p>Get started instantly. Just upload your PDF and start listening. No signups and no complicated setup — it’s as easy as hitting “Play.”</p>
          </StatItem>
          <StatItem>
            <h3>Private</h3>
            <p>Privacy comes first. All conversions happen locally on your device, ensuring your documents stay secure and never touch external servers. No tracking. No storage. Total peace of mind.</p>
          </StatItem>
          <StatItem>
            <h3>Multilingual</h3>
            <p>Listen to content in your language — or practice another! The app can recognize and read PDFs in over 30 languages, from English and Spanish to Romanian and more</p>
          </StatItem>
        </StatsContainer>
      </HeroSection>

      <AppFeaturesSection>
        <MainTitle style={{ fontSize: '3rem', marginBottom: '2rem' }}>What Our App Can Do</MainTitle>
        <AppFeaturesGrid>
          <AppFeatureCard>
            <h3>1. Upload Your PDF</h3>
            <p>Simply drag and drop your PDF document or select it from your device</p>
          </AppFeatureCard>
          <AppFeatureCard>
            <h3>2. Choose Your Preferences</h3>
            <p>Select voice type, speed, and other audio settings</p>
          </AppFeatureCard>
          <AppFeatureCard>
            <h3>3. Convert & Download</h3>
            <p>Get your audiobook ready to listen on any device</p>
          </AppFeatureCard>
        </AppFeaturesGrid>
      </AppFeaturesSection>
    </LandingContainer>
  );
};

export default Landing;
