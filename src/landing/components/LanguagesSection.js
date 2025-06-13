import React from 'react';
import styled from 'styled-components';
import worldMapImage from '../../assets/world_map.png';
import languages from '../../values/languages.ts';
import flags from '../../values/flags.ts';

const LanguagesContainer = styled.section`
  padding: 4rem 2rem;
  background: #150578;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  text-align: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(21, 5, 120, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-image: url(${worldMapImage});
    background-size: cover;
    background-position: center;
    opacity: 0.3;
    z-index: 0;
  }

  h1 {
    color: #FFFFFF;
    position: relative;
    z-index: 2;
  }

  p {
    color: #FFFFFF;
    position: relative;
    z-index: 2;
  }
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const MainSubtitle = styled.p`
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const LanguagesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0 3rem;
`;

const LanguagesGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LanguageCard = styled.div`
  background-color: #FFFFFF;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #E5E7EB;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  min-width: 180px;
  flex-shrink: 0;
  opacity: 1;
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(25, 43, 194, 0.1);
    border-color: #192BC2;
  }

  .flag {
    font-size: 2rem;
  }

  p {
    color: #192BC2;
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
    white-space: nowrap;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: #192BC2;
    border-color: #192BC2;
    color: #FFFFFF;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
`;

const LanguagesSection = () => {
  return (
    <LanguagesContainer>
      <MainTitle>Supported Languages</MainTitle>
      <MainSubtitle>
        Break language barriers with our AI-powered voice synthesis in 30+ languages. Your content, your language, your voice.
      </MainSubtitle>
      
      <LanguagesWrapper>
        <NavigationButton className="prev" onClick={() => {
          const container = document.querySelector('.languages-grid');
          container.scrollLeft -= 200;
        }}>
          ←
        </NavigationButton>
        <LanguagesGrid className="languages-grid">
          {languages.map((language) => (
            <LanguageCard key={language}>
              <span className="flag">{flags[language]}</span>
              <p>{language}</p>
            </LanguageCard>
          ))}
        </LanguagesGrid>
        <NavigationButton className="next" onClick={() => {
          const container = document.querySelector('.languages-grid');
          container.scrollLeft += 200;
        }}>
          →
        </NavigationButton>
      </LanguagesWrapper>
    </LanguagesContainer>
  );
};

export default LanguagesSection; 