import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import translationLanguagesOptions from '../values/translationLanguagesOptions';

const LanguageDropdownContainer = styled.div`
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

const LanguageDropdown = ({ selectedLanguage, onLanguageChange, languageOptions = [] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const selectedOption = languageOptions?.find(option => option.code === selectedLanguage) || languageOptions[0];

  if (!languageOptions || languageOptions.length === 0) {
    return null;
  }

  return (
    <LanguageDropdownContainer className="language-dropdown">
      <DropdownButton onClick={toggleDropdown}>
        <span>{selectedOption?.flag}</span>
        {selectedOption?.name}
      </DropdownButton>
      <DropdownContent isOpen={isDropdownOpen}>
        {languageOptions.map((option) => (
          <LanguageOption 
            key={option.code} 
            onClick={() => {
              onLanguageChange(option.code);
              setIsDropdownOpen(false);
            }}
            style={{
              backgroundColor: option.code === selectedLanguage ? '#f0f0f0' : 'transparent'
            }}
          >
            <span>{option.flag}</span>
            <p>{option.name}</p>
          </LanguageOption>
        ))}
      </DropdownContent>
    </LanguageDropdownContainer>
  );
};

export default LanguageDropdown; 