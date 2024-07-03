"use client";

import styled, { createGlobalStyle } from "styled-components";
import { Solar, SolarYear, HolidayUtil } from "lunar-javascript";

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
    /* 隐藏元素 */
    print-button {
      width: 0;
      height: 0;
      display: none !important;
    }
  }
`;

const FullContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const MyContainer = styled.div`
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
  flex-direction: column; /* 主轴垂直，起点上沿 */
  justify-content: center;
  align-items: center; /* 居中对齐 */
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

// flex 弹性布局：https://blog.csdn.net/shuux666/article/details/123397252
const CalendarCell = styled.div`
  display: flex;
  flex-direction: column; /* 主轴垂直，起点上沿 */
  justify-content: space-between;
  align-items: center; /* 居中对齐 */
  padding-top: 0.1em;
  flex: 1 0 calc(33.33% - 10px); /* 每列宽度占比，减去间距 */
  height: calc(25% - 10px); /* 每行高度，减去间距 */
  background-color: lightblue;
  border: 1px solid green;
`;

const CellHeader = styled.div`
  display: flex;
  width: 100%;
  height: 10%; /* 每行高度，减去间距 */
  font-size: 0.5rem;
  border-bottom: 1px solid #636363;
`;

const CellHeaderItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CellBody = styled.div`
  display: flex;
  flex-wrap: wrap; /* 使子元素换行 */
  width: 100%;
  height: 90%;
`;

const CellDayContainer = styled.div`
  display: flex;
  flex-direction: column; /* 主轴垂直，起点上沿 */
  justify-content: center;
  align-items: center;
  width: 14.28%;

  font-size: 0.6rem;
`;

const CellDay = styled.div``;

const CellDayBottom = styled.div`
  font-size: 0.3rem;
`;

const Title = styled.div`
  font-size: 15px;
  color: #606266;
  margin: 20px auto;
  text-align: center;

  input {
    border: 1px solid #d7d9e0;
    padding: 7px;
    border-radius: 6px;
    background: #ffffff;
    width: 100px;
    text-align: center;
    font-size: 20px;
  }
`;

const PrintButton = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #646cff;
  &:hover {
    background-color: green;
  }
`;

const now = Solar.fromDate(new Date());

class Day {
  constructor() {
    this.day = "";
    this.text = "";
    this.isFestival = false;
    this.isToday = false;
    this.isHoliday = false;
    this.isRest = false;
    this.isCurrentMonth = false;
  }
}

class Month {
  constructor() {
    this.month = 0;
    this.days = [];
  }
}

function buildDay(d, month) {
  const lunar = d.getLunar();
  const day = new Day();
  day.day = d.getDay() + "";
  let text = lunar.getDayInChinese();
  let festivals = d.getFestivals();
  if (festivals.length > 0) {
    text = festivals[0];
    day.isFestival = true;
  }
  festivals = lunar.getFestivals();
  if (festivals.length > 0) {
    text = festivals[0];
    day.isFestival = true;
  }
  if (1 === lunar.getDay()) {
    text = lunar.getMonthInChinese() + "月";
    day.isFestival = false;
  }
  const jq = lunar.getJieQi();
  if (jq) {
    text = jq;
    day.isFestival = true;
  }
  day.text = text;
  if (d.toYmd() === now.toYmd()) {
    day.isToday = true;
  }
  const h = HolidayUtil.getHoliday(d.getYear(), d.getMonth(), d.getDay());
  if (h) {
    day.isHoliday = true;
    day.isRest = !h.isWork();
  }
  day.isCurrentMonth = d.getMonth() == month;
  return day;
}

export default function Calendar() {
  const weekHeads = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  const year = SolarYear.fromYear(parseInt(2024 + "", 10));
  const months = [];
  year.getMonths().forEach((m) => {
    const month = {};
    month.month = m.getMonth();
    month.days = [];
    const weeks = m.getWeeks(6);
    weeks.forEach((w) => {
      w.getDays().forEach((d) => {
        month.days.push(buildDay(d, month.month));
      });
    });
    months.push(month);
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <GlobalStyle />
      <FullContainer>
        <MyContainer>
          <PrintButton id="print-button" onClick={handlePrint}></PrintButton>
          <Header>
            <Title>
              <input
                type="text"
                value={2024}
                readOnly={true}
                placeholder="阳历年"
              />
            </Title>
          </Header>
          <Box />
          <CalendarGridContainer>
            {console.log("months", months)}
            {months.map((month, index) => (
              <CalendarCell key={index}>
                <CellHeader>
                  {weekHeads.map((day, index) => (
                    <CellHeaderItem key={index}>{day}</CellHeaderItem>
                  ))}
                </CellHeader>
                <CellBody>
                  {month.days.map((day, index) => (
                    <CellDayContainer key={index}>
                      <CellDay>{day.day}</CellDay>
                      <CellDayBottom>
                        {day.text.length > 3 ? "无" : day.text}
                      </CellDayBottom>
                    </CellDayContainer>
                  ))}
                </CellBody>
              </CalendarCell>
            ))}
          </CalendarGridContainer>
        </MyContainer>
      </FullContainer>
    </>
  );
}
