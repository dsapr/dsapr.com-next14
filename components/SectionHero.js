'use client'

import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";

import Avatar from "./Avatar";
import Divider from "./Divider";
import { AppContext } from "@/store/index";

const HeroSection = styled.div`
  margin-top: 3.5rem;
  @media (min-width: 768px) {
    margin-top: 6rem;
  }
`;
const Title = styled.div`
  /* hsla(色相，饱和度，亮度，透明度) */
  color: hsla(240, 68%, 5%, 1);
  font-weight: 700;
  font-size: 2rem;
  margin-top: 22px;
  margin-left: 2px;
  position: relative;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.div`
  color: hsla(240, 68%, 5%, 1);
  font-size: 1.5rem;
  margin-top: 1.125rem;
  line-height: 2rem;
  margin-left: 2px;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const tick = keyframes`
  0%, 50% {
    stroke-dashoffset: 234px;
  }
  50%, 100% {
    stroke-dashoffset: 0px;
  }
`;

// const Underline = styled(SvgUnderline)`
//   position: absolute;
//   color: hsl(${props => props.hue - 8}, 100%, 70%);
//   z-index: -1;
//   height: 26px;
//   left: 100px;
//   bottom: -6px;
//   stroke-dasharray: 234px;
//   stroke-dashoffset: 234px;
//   animation: 3s ${tick} ease-in-out forwards;

//   @media (min-width: 768px) {
//     position: relative;
//     bottom: 0;
//     top: 20px;
//     left: -201px;
//     height: 42px;
//   }
// `

const Underline = styled.svg.attrs({
  children: (
    <path
      d="M3.5,22.5C96.5,22.5 124.667,10.5 144,3.5"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  viewBox: "0 0 147 26",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
})`
  position: absolute;
  animation: 3s ${tick} ease-in-out forwards;
  color: hsl(${(props) => props.hue - 8}, 100%, 70%);
  z-index: -1;
  height: 26px;
  left: 100px;
  bottom: -6px;
  stroke-dasharray: 234px;
  stroke-dashoffset: 234px;
  animation: 3s ${tick} ease-in-out forwards;

  @media (min-width: 768px) {
    position: relative;
    bottom: 0;
    height: 42px;
    left: -201px;
    top: 20px;
  }
`;

export default function Component() {
  const { hue, setHue } = useContext(AppContext);

  return (
    <HeroSection>
      <Avatar />
      <Title>
        Hi, I&apos;m dsapr.
        <Underline hue={hue} />
      </Title>
      <Subtitle>A Java developer.</Subtitle>
      <Divider />
    </HeroSection>
  );
}
