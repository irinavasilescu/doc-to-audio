import React from 'react';
import styled from 'styled-components';
import personReadingImage from './assets/person_reading.png'; // Import the image
import languages from './languages.ts';
import flags from './flags.ts';

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
    background-color: #150578;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #FFFFFF;
  color: #192BC2; /* Explore Course List blue */
  border: 1px solid #192BC2;

  &:hover {
    background-color: #150578;
    border: 1px solid #150578;
    color: #FFFFFF;
  }
`;

const HeroSection = styled.section`
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
  color: black; /* Dark text */

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
  background: #eff1f5;
  text-align: center;
`;

const AppFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 3rem;
`;

const AppFeatureCard = styled.div`
  background-color: #FFFFFF;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(25, 43, 194, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(25, 43, 194, 0.15);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: #0E0E52;
  }

  .step-number {
    font-size: 1.2rem;
    font-weight: bold;
    color: #192BC2;
    margin-bottom: 1rem;
    opacity: 0.8;
  }

  .icon-container {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: linear-gradient(135deg, rgba(25, 43, 194, 0.1), rgba(120, 192, 224, 0.1));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-size: 1.8rem;
    color: #192BC2;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    margin: 0;
  }
`;

const Wave = styled.div`
  height: 10vh;
  background-color: #ffffff;
  position: relative;
  
  &:before {   
    content: "";
    width: 100%;
    height: 52px;
    position: absolute;
    bottom: -0.3%;
    left: 0;
    background-size: auto;
    background-repeat: repeat no-repeat;
    background-position: 34vw bottom;
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200  96' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 70L50 66C100 62 200 53 300 36C400 18 500 -7 600 1C700 10 800 53 900 70C1000 88 1100 79 1150 75L1200 70V96H1150C1100 96 1000 96 900 96C800 96 700 96 600 96C500 96 400 96 300 96C200 96 100 96 50 96H0V70Z' fill='%23eff1f5'/></svg>");
  }

  @media(max-width:850px) {
    &:before {    
      height: 26px
    }  
  }
`;

const TestimonialsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #FFFFFF;
  text-align: center;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background-color: #F8F8F8;
  padding: 2rem;
  border-radius: 10px;
  text-align: left;
  position: relative;

  &:before {
    content: '"';
    font-size: 4rem;
    color: #DC3545;
    opacity: 0.2;
    position: absolute;
    top: -1rem;
    left: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .author {
    font-weight: bold;
    color: #DC3545;
  }
`;

const FAQSection = styled.section`
  padding: 4rem 2rem;
  background-color: #F8F8F8;
  text-align: center;
`;

const FAQGrid = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 3rem;
`;

const FAQItem = styled.div`
  background-color: #FFFFFF;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h3 {
    color: #192BC2;
    margin-bottom: 0.5rem;
  }

  p {
    color: #555;
    line-height: 1.6;
  }
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  background-color: #DC3545;
  text-align: center;
  color: #FFFFFF;
`;

const LanguagesSection = styled.section`
  padding: 4rem 2rem;
  background-color: #150578;
  text-align: center;
  position: relative;

  h1 {
    color: #FFFFFF;
  }

  p {
    color: #FFFFFF;
  }
`;

const LanguagesContainer = styled.div`
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

const LanguageGroups = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const LanguageGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: #F8F9FA;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #192BC2;
    color: #FFFFFF;
  }

  .flag {
    font-size: 1.2rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const Footer = styled.footer`
  background-color: #333;
  color: #FFFFFF;
  padding: 4rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
`;

const FooterColumn = styled.div`
  h4 {
    color: #FFFFFF;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #CCCCCC;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #FFFFFF;
    }
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
            <img src={personReadingImage} alt="Person reading and listening" style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 15px 45px rgba(14, 14, 82, 0.2))' }} />
          </ImagePlaceholder>
        </HeroContent>
        <StatsContainer>
          <StatItem>
            <h3>Fast</h3>
            <p>Get started instantly. Just upload your PDF and start listening. No signups and no complicated setup. It's as easy as hitting "Play".</p>
          </StatItem>
          <StatItem>
            <h3>Private</h3>
            <p>Privacy comes first. All conversions happen locally on your device, ensuring your documents stay secure and never touch external servers. No tracking. No storage. Total peace of mind.</p>
          </StatItem>
          <StatItem>
            <h3>Multilingual</h3>
            <p>Listen to content in your language or practice another! The app can recognize and read PDFs in over 30 languages, from English and Spanish to Romanian and more</p>
          </StatItem>
          <StatItem>
            <h3>Free</h3>
            <p>No subscriptions. No hidden fees. Just convert and listen. On your terms.</p>
          </StatItem>
        </StatsContainer>
      </HeroSection>

      <Wave/>

      <AppFeaturesSection>
        <MainTitle style={{ fontSize: '3rem', marginBottom: '2rem' }}>
          How does it work?
        </MainTitle>
        <AppFeaturesGrid>
          <AppFeatureCard>
            <div className="step-number">Step 1</div>
            <div className="icon-container">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V15" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Upload your PDF</h3>
            <p>Simply drag and drop your PDF document or select it from your device. We support all standard PDF formats.</p>
          </AppFeatureCard>
          <AppFeatureCard>
            <div className="step-number">Step 2</div>
            <div className="icon-container">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Choose your preferences</h3>
            <p>Select your preferred voice type, reading speed, and language. Customize the audio experience to match your needs.</p>
          </AppFeatureCard>
          <AppFeatureCard>
            <div className="step-number">Step 3</div>
            <div className="icon-container">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="#192BC2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Convert & download</h3>
            <p>Get your audiobook ready in seconds. Download and listen on any device, anywhere, anytime.</p>
          </AppFeatureCard>
        </AppFeaturesGrid>
      </AppFeaturesSection>

      <TestimonialsSection>
        <MainTitle style={{ fontSize: '3rem', marginBottom: '2rem' }}>
          What our users say
        </MainTitle>
        <TestimonialsGrid>
          <TestimonialCard>
            <p>"I love how I can listen to my favorite books while cooking dinner. It's made our evenings together so much more enjoyable!"</p>
            <div className="author">- My boyfriend</div>
          </TestimonialCard>
          <TestimonialCard>
            <p>"As someone who's always on the go, this app has been a lifesaver. I can finally keep up with my reading during my daily commute."</p>
            <div className="author">- My dad</div>
          </TestimonialCard>
          <TestimonialCard>
            <p>"I was skeptical at first, but now I'm hooked! The voice quality is amazing and it's so easy to use. Perfect for my busy lifestyle."</p>
            <div className="author">- My best friend</div>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>

      <LanguagesSection>
        <MainTitle style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Supported Languages
        </MainTitle>
        <MainSubtitle style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
          Break language barriers with our AI-powered voice synthesis in 30+ languages. Your content, your language, your voice.
        </MainSubtitle>
        
        <LanguagesContainer>
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
        </LanguagesContainer>

        <LanguageGroups>
          <LanguageGroup>
            <span className="flag">🌍</span>
            <span>All Languages</span>
          </LanguageGroup>
          <LanguageGroup>
            <span className="flag">🇪🇺</span>
            <span>European</span>
          </LanguageGroup>
          <LanguageGroup>
            <span className="flag">🌏</span>
            <span>Asian</span>
          </LanguageGroup>
          <LanguageGroup>
            <span className="flag">🌎</span>
            <span>American</span>
          </LanguageGroup>
        </LanguageGroups>
      </LanguagesSection>

      <FAQSection>
        <MainTitle style={{ fontSize: '3rem', marginBottom: '2rem' }}>
          Frequently Asked Questions
        </MainTitle>
        <FAQGrid>
          <FAQItem>
            <h3>Is my data secure?</h3>
            <p>Yes! All processing happens locally on your device. Your documents never leave your computer.</p>
          </FAQItem>
          <FAQItem>
            <h3>What file formats are supported?</h3>
            <p>Currently, we support PDF files. We're working on adding support for more formats soon!</p>
          </FAQItem>
          <FAQItem>
            <h3>Can I adjust the reading speed?</h3>
            <p>Yes, you can customize the reading speed to match your preference.</p>
          </FAQItem>
        </FAQGrid>
      </FAQSection>

      <CTASection>
        <MainTitle style={{ fontSize: '3rem', marginBottom: '2rem', color: '#FFFFFF' }}>
          Ready to transform your reading experience?
        </MainTitle>
        <MainSubtitle style={{ color: '#FFFFFF', marginBottom: '3rem' }}>
          Start converting your documents to audio today. It's free, fast, and secure.
        </MainSubtitle>
        <PrimaryButton style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
          Get Started Now
        </PrimaryButton>
      </CTASection>

      <Footer>
        <FooterContent>
          <FooterColumn>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h4>Resources</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#documentation">Documentation</a></li>
            </ul>
          </FooterColumn>
        </FooterContent>
      </Footer>
    </LandingContainer>
  );
};

export default Landing;
