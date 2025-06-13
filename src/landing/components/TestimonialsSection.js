import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
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

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const TestimonialsSection = () => {
  return (
    <TestimonialsContainer>
      <MainTitle>What our users say</MainTitle>
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
    </TestimonialsContainer>
  );
};

export default TestimonialsSection; 