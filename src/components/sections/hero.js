import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import Typed from 'react-typed';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--dblue);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--orange);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .typed-cursor {
    display: none;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1> Hi, my name is </h1>;
  const two = <h2 className="big-heading">Ishan Bawne.</h2>;
  const ok = <h3 className="big-heading"></h3>;
  const three = (
    <Typed
      // children={ok}
      loop="true"
      showCursor="false"
      strings={[
        'I make games.',
        'I love to design and make websites.',
        'I love studying Physics.',
        'I love to play football.',
        'I love to design UI/UX.',
      ]}
      backSpeed={80}
      typeSpeed={80}>
      {ok}
    </Typed>
  );
  const four = (
    <>
      <p>
        I’m a Final year undergraduate student in department of physics at{' '}
        <a href="https://iitk.ac.in/" target="_blank" rel="noreferrer">
          Indian Institute of Technology Kanpur
        </a>
        . I love studying physics, playing football and making softwares and games.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://github.com/ishanbawne20"
      target="_blank"
      rel="noreferrer">
      Check out me on GitHub!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
