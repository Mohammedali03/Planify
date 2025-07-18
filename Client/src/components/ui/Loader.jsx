import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle {
    width: 10px;
    height: 10px;
    background-color: #8bc6ec;
    background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
    border-radius: 50%;
    margin-right: 1rem;
    animation: pulse 1.2s ease-in-out infinite;
  }

  .circle:nth-child(2) {
    animation-delay: 0.2s;
    background-color: #4158d0;
    background-image: linear-gradient(
      43deg,
      #4158d0 0%,
      #c850c0 46%,
      #ffcc70 100%
    );
  }

  .circle:nth-child(3) {
    animation-delay: 0.4s;
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  }

  .circle:nth-child(4) {
    animation-delay: 0.6s;
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  }

  .circle:nth-child(5) {
    animation-delay: 0.8s;
    background-color: #00dbde;
    background-image: linear-gradient(90deg, #00dbde 0%, #fc00ff 100%);
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.7;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(0.8);
      opacity: 0.7;
    }
  }
`;

export default Loader;
