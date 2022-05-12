import styled from "styled-components";

export default (props) => {
  return (
    <AnimatedBox>
      <p>
        {props?.topText}
        <span>{props.children}</span>
        <label>{props?.bottomText} </label>
      </p>
    </AnimatedBox>
  );
};

const AnimatedBox = styled.div`
  p {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: inline-block;
    border-bottom: 4px double rgba(255, 255, 255, 0.25);
    border-width: 4px 0;
    padding: 1.2em 0em;
    color: #777 !important;
    font-size: 0.8rem;
    width: 40em;
    label {
      font-size: 10px !important;
      text-transform: none !important;
      color: #777 !important;
      display: block;
    }
    span {
      font: 700 1.8em/1 "Oswald", sans-serif;
      letter-spacing: 0;
      padding: 0.25em 0 0.325em;
      display: block;
      margin: 0 auto;
      text-shadow: 0 0 80px rgba(255, 255, 255, 0.5);
      /* Clip Background Image */
      background: url(https://i.ibb.co/RDTnNrT/animated-text-fill.png) repeat-y;
      -webkit-background-clip: text;
      background-clip: text;

      /* Animate Background Image */

      -webkit-text-fill-color: transparent;
      -webkit-animation: aitf 80s linear infinite;
      text-fill-color: transparent;
      // animation: aitf 80s linear infinite;

      /* Activate hardware acceleration for smoother animations */

      -webkit-transform: translate3d(0, 0, 0);
      -webkit-backface-visibility: hidden;

      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
  }

  /* Animate Background Image */
  @keyframes aitf {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  @-webkit-keyframes aitf {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;
