import React from "react";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

const Section = (props) => {
  return (
    <Wrap bgImage={props.backgroundImg}>
      <Back className="back">
        <Background blurBgImage={`/images/${props.backgroundImg}`} />
      </Back>
      <Fade bottom>
        <ItemText>
          <h1 style={{ fontSize: "4rem" }}>{props.title}</h1>
          <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>
            {props.description}
          </p>
        </ItemText>
      </Fade>
      <Buttons>
        <Fade bottom>
          <ButtonGroup>
            {props.leftBtnText === "Book now" ? (
              <LeftButton>
                <a
                  href="/book"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Book now
                </a>
              </LeftButton>
            ) : (
              <LeftButton>{props.leftBtnText}</LeftButton>
            )}
            {props.rightBtnText && (
              <RightButton>{props.rightBtnText}</RightButton>
            )}
          </ButtonGroup>
        </Fade>
        {props.bubble && <DownArrow src="/images/down-arrow.svg" />}
      </Buttons>
    </Wrap>
  );
};

export default Section;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: ${(props) => `url("/images/${props.bgImage}")`};
  scroll-snap-align: start;
  z-index: 1;
  overflow: hidden;
`;

const Back = styled.div`
  filter: blur(2px);
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  z-index: -1;
  background-image: ${(props) => `url("${props.blurBgImage}")`};
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ItemText = styled.div`
  text-align: center;
  padding: 3rem 0;
  position: relative;
  z-index: 1;
  width: 100rem;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 30px;
  gap: 25px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Buttons = styled.div``;

const LeftButton = styled.div`
  cursor: pointer;
  background-color: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 256px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  margin: 8px;
`;

const RightButton = styled(LeftButton)`
  background-color: white;
  opacity: 0.65;
  color: black;
`;

const DownArrow = styled.img`
  margin-bottom: 20px;
  height: 40px;
  overflow-x: hidden;
  animation: bounce infinite 1.5s;
`;
