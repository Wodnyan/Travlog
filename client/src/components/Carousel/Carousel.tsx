import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import cat1 from "../../assets/cat1.jpg";
import cat2 from "../../assets/cat2.jpg";
import cat3 from "../../assets/cat3.jpg";

const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  @media (max-width: 760px) {
    width: auto;
    height: 100vh;
  }
`;
const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
`;
const CarouselList = styled.ul<{ width?: number }>`
  position: relative;
  width: 100%;
  height: 100%;
  list-style: none;
  transform: translateX(${({ width }) => width}px);
  transition: transform 0.2s ease;
`;
const CarouselListItem = styled.li<{ left: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;
const Dot = styled.div<{ current: boolean }>`
  --dot-size: 30px;
  width: var(--dot-size);
  height: var(--dot-size);
  background: ${({ current }) => (current ? "#fff" : "transparent")};
  border: 5px solid #fff;
  margin-right: 1rem;
  border-radius: 50%;
  cursor: pointer;
`;

const Carousel = () => {
  // TODO: Space out the list items.
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSlideWidth(containerRef!.current!.offsetWidth);
  }, [containerRef]);

  useEffect(() => {
    window.onresize = (e: any) => {
      console.log(containerRef!.current!.offsetWidth);
      console.log(containerRef!.current!);
      setSlideWidth(containerRef!.current!.offsetWidth);
    };
    return () => {
      window.onresize = null;
    };
  }, [containerRef]);

  const handleClickDot = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <CarouselContainer ref={containerRef}>
      <CarouselList width={-slideWidth * slideIndex}>
        <CarouselListItem left={0}>
          <Image src={cat1} alt="" />
        </CarouselListItem>
        <CarouselListItem left={slideWidth}>
          <Image src={cat2} alt="" />
        </CarouselListItem>
        <CarouselListItem left={slideWidth * 2}>
          <Image src={cat3} alt="" />
        </CarouselListItem>
      </CarouselList>
      <DotContainer>
        {Array.apply(null, Array(3)).map(function (_, i) {
          return (
            <Dot current={i === slideIndex} onClick={() => handleClickDot(i)} />
          );
        })}
      </DotContainer>
    </CarouselContainer>
  );
};
export default Carousel;
