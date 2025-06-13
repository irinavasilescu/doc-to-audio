import React from 'react';
import styled from 'styled-components';

const FAQContainer = styled.section`
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

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const FAQSection = () => {
  return (
    <FAQContainer>
      <MainTitle>Frequently Asked Questions</MainTitle>
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
    </FAQContainer>
  );
};

export default FAQSection; 