import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LanguageDropdown from './LanguageDropdown';
import translationLanguagesOptions from '../values/translationLanguagesOptions';

const HeaderContainer = styled.header`
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
  cursor: pointer;

  img {
    height: 30px;
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState('English');

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>
        <span style={{ color: '#DC3545' }}>Scrib</span>
        <span style={{ color: '#192BC2' }}>bloo</span>
      </Logo>
      <Nav>
        <LanguageDropdown 
          languageOptions={translationLanguagesOptions}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          direction="down"
        />
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 