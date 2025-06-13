import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #FFFFFF;
  color: #000000;
  padding: 4rem 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;

  a {
    color: #192BC2;
    font-size: 1.5rem;
  }
`;

const ResponsiveVoiceRef = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const FooterWave = styled.div`
  height: 10vh;
  background-color: #DC3545;
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
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200  96' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 70L50 66C100 62 200 53 300 36C400 18 500 -7 600 1C700 10 800 53 900 70C1000 88 1100 79 1150 75L1200 70V96H1150C1100 96 1000 96 900 96C800 96 700 96 600 96C500 96 400 96 300 96C200 96 100 96 50 96H0V70Z' fill='%23ffffff'/></svg>");
  }

  @media(max-width:850px) {
    &:before {    
      height: 26px
    }  
  }
`;

const Footer = () => {
  return (
    <>
      <FooterWave />
      <FooterContainer>
        <SocialLinks>
          <a href="https://www.linkedin.com/in/irina-alexandra-vasilescu-a40176192/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.goodreads.com/user/show/58575151-irina-vasilescu" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-goodreads"></i>
          </a>
          <a href="https://github.com/irinavasilescu" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </SocialLinks>
        <ResponsiveVoiceRef>
          Text-to-speech powered by <a href="https://responsivevoice.org/" rel="noopener noreferrer nofollow" target="_blank">ResponsiveVoice</a>
        </ResponsiveVoiceRef>
      </FooterContainer>
    </>
  );
};

export default Footer; 