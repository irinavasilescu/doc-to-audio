import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CTAContainer = styled.section`
  padding: 6rem 2rem;
  background-color: #DC3545;
  text-align: center;
  color: #FFFFFF;
`;

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #FFFFFF;
`;

const MainSubtitle = styled.p`
  color: #FFFFFF;
  margin-bottom: 3rem;
`;

const PrimaryButton = styled.button`
  background-color: #192BC2;
  color: #FFFFFF;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;

  &:hover {
    background-color: #150578;
  }
`;

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <CTAContainer>
      <MainTitle>Ready to transform your reading experience?</MainTitle>
      <MainSubtitle>
        Start converting your documents to audio today. It's free, fast, and secure.
      </MainSubtitle>
      <PrimaryButton onClick={() => navigate('/converter')}>
        Get started now
      </PrimaryButton>
    </CTAContainer>
  );
};

export default CTASection; 