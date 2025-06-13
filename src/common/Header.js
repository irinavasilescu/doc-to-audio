import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import flags from './../values/flags.ts';
import translationLanguages from './../values/translationLanguages.ts';

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

const LanguageDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #FFFFFF;
  color: #192BC2;
  padding: 0.8rem 1.5rem;
  border: 1px solid #192BC2;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  right: 0;
  background-color: #FFFFFF;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 5px;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const LanguageOption = styled.div`
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }

  span {
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: #333;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.language-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>
        <span style={{ color: '#DC3545' }}>Scrib</span>
        <span style={{ color: '#192BC2' }}>bloo</span>
      </Logo>
      <Nav>
        <LanguageDropdown className="language-dropdown">
          <DropdownButton onClick={toggleDropdown}>
            <span>{flags[selectedLanguage]}</span>
            {selectedLanguage}
          </DropdownButton>
          <DropdownContent isOpen={isDropdownOpen}>
            {translationLanguages.map((language) => (
              <LanguageOption 
                key={language} 
                onClick={() => {
                  setSelectedLanguage(language);
                  setIsDropdownOpen(false);
                }}
                style={{
                  backgroundColor: language === selectedLanguage ? '#f0f0f0' : 'transparent'
                }}
              >
                <span>{flags[language]}</span>
                <p>{language}</p>
              </LanguageOption>
            ))}
          </DropdownContent>
        </LanguageDropdown>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 