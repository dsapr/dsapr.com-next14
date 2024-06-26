"use client";

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    body, html, #root, #root > div {
      width: 21cm;
      height: 29.7cm;
      margin: 0;
      padding: 0;
      box-shadow: none;
    }
  }
`;

const FullContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 21cm;
  max-height: 29.7cm;
  height: calc(100vh - 1px); // 因为 border 多了 1 px
  width: calc(0.5 * 100vh * 1.414);
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  @media print {
    box-shadow: none;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 20vh;
`;

const Box = styled.div`
  width: 90%;
  height: 1px;
  background-color: #cccccc;
  margin: 23px auto;
`;

const CalendarGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 格子之间的间距 */
  width: calc(100% - 20px); /* 去除左右各 10px 的边距 */
  height: calc(100% - 20px); /* 去除上下各 10px 的边距 */
  margin: 10px; /* 上下左右各 10px 的边距 */
`;

const CalendarCell = styled.div`
  flex: 1 0 calc(33.33% - 10px); /* 每列宽度占比，减去间距 */
  height: calc(25% - 10px); /* 每行高度，减去间距 */
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid green;
`;

const CellHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%; /* 每行高度，减去间距 */
  font-size: 0.8rem;
  align-items: flex-end;
  padding-bottom: 3px;
  border-bottom: 1px solid black;
`;

const CellHeaderItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CellBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 20px); /* 去除左右各 10px 的边距 */
  height: calc(80% - 20px); /* 去除上下各 10px 的边距 */
  margin: 10px; /* 上下左右各 10px 的边距 */
`;

export default function Calendar() {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  return (
    <>
      <GlobalStyle />
      <FullContainer>
        <Container>
          <Header>this is header</Header>
          <Box />
          <CalendarGridContainer>
            <CalendarCell>
              <CellHeader>
                {weekDays.map((day, index) => (
                  <CellHeaderItem key={index}>{day}</CellHeaderItem>
                ))}
              </CellHeader>
              <CellBody>
                {days.map((number) => (
                  <CalendarCell key={number}>{number}</CalendarCell>
                ))}
              </CellBody>
            </CalendarCell>
            <CalendarCell>February</CalendarCell>
            <CalendarCell>March</CalendarCell>
            <CalendarCell>April</CalendarCell>
            <CalendarCell>May</CalendarCell>
            <CalendarCell>June</CalendarCell>
            <CalendarCell>July</CalendarCell>
            <CalendarCell>August</CalendarCell>
            <CalendarCell>September</CalendarCell>
            <CalendarCell>October</CalendarCell>
            <CalendarCell>November</CalendarCell>
            <CalendarCell>December</CalendarCell>
          </CalendarGridContainer>
        </Container>
      </FullContainer>
    </>
  );
}
