import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import personReadingImage from '../../assets/person_reading.png';

const HeroSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
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
  color: black;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background-color: #192BC2;
  color: #FFFFFF;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #150578;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #FFFFFF;
  color: #192BC2;
  border: 1px solid #192BC2;
  font-weight: bold;

  &:hover {
    background-color: #150578;
    border: 1px solid #150578;
    color: #FFFFFF;
  }
`;

const ImagePlaceholder = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 500px;
  width: 100%;

  @media (max-width: 900px) {
    height: 300px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  background-color: #DC3545;
  padding: 4rem;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(220, 53, 69, 0.5);

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
    color: #FFFFFF;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #FFFFFF;
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToStats = () => {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSectionContainer>
      <HeroContent>
        <TextContent>
          <MainTitle>
            Turn your <span>docs</span> into <span>audio files.</span> <br/> Effortlessly.
          </MainTitle>
          <MainSubtitle>
            With one click, transform written content into engaging audio. It's your personal reader for work, study, or leisure—anytime, anywhere.
          </MainSubtitle>
          <ButtonContainer>
            <SecondaryButton onClick={scrollToStats}>Learn more</SecondaryButton>
            <PrimaryButton onClick={() => navigate('/converter')}>Try now</PrimaryButton>
          </ButtonContainer>
        </TextContent>
        <ImagePlaceholder>
          <img src={personReadingImage} alt="Person reading and listening" style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 15px 45px rgba(14, 14, 82, 0.2))' }} />
        </ImagePlaceholder>
      </HeroContent>
      <StatsContainer id="stats-section">
        <StatItem>
          <h3>Fast</h3>
          <p>Get started instantly. Just upload your document and start listening. No signups and no complicated setup. It's as easy as hitting "Play".</p>
        </StatItem>
        <StatItem>
          <h3>Private</h3>
          <p>Privacy comes first. Your documents stay secure. No tracking. No storage. Total peace of mind.</p>
        </StatItem>
        <StatItem>
          <h3>Multilingual</h3>
          <p>Listen to content in your language or practice another! The app can recognize and read documents in over 30 languages.</p>
        </StatItem>
        <StatItem>
          <h3>Free</h3>
          <p>No subscriptions. No hidden fees. Just convert and listen. On your terms.</p>
        </StatItem>
      </StatsContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection; 