import * as React from "react";
import { useEffect, useState } from "react";
import { getDay, getDate, getMonth, getYear } from "date-fns";
import styled from "@emotion/styled";
import { ListModal } from "./Modal/ListModal";
import { initialData } from "../data/data";

interface IState {
  isOpen: boolean;
  days: string[];
  year: number;
  month: number;
  day?: number;
}

const Table = styled.table`
  max-width: 800px;
  width: 100%;
  margin: auto;
`;

const Td = styled.td`
  cursor: pointer;
`;

const DAYS = ["日", "月", "火", "水", "木", "金", "土"];

export const UserCalender = () => {
  const date = new Date();

  const [year, setYear] = useState<number>(getYear(date));
  const [month, setMonth] = useState<number>(getMonth(date) + 1);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [registDate, setRegistDate] = useState<string>("");

  const onOpenModal = (registDay: string) => {
    setRegistDate(registDay);
    setIsOpen(true);
  };

  const DaysRender = () => {
    const [startDate, setStartDate] = useState<number>(null);
    const [endDate, setEndDate] = useState<number>(null);
    const [lastMonthEndDate, setLastMonthEndDate] = useState<number>(null);

    const [lastMonthEndDay, setLastMonthEndDay] = useState<number>(null);
    const [nextMonthStartDay, setNextMonthStartDay] = useState<number>(null);
    const [renderWeekLength, setRenderWeekLength] = useState<number>(null);

    useEffect(() => {
      setStartDate(new Date(year, month - 1, 1).getDay());
      setEndDate(getDate(new Date(year, month, 0)));
      setLastMonthEndDate(getDate(new Date(year, month - 1, 0)));
      setLastMonthEndDay(getDay(new Date(year, month - 1, 1)));
      setNextMonthStartDay(getDay(new Date(year, month + 1, 1)));
    }, [year, month]);

    useEffect(() => {
      setRenderWeekLength(
        Math.ceil((endDate + lastMonthEndDay + (7 - nextMonthStartDay)) / 7)
      );
    }, [endDate, lastMonthEndDay, nextMonthStartDay]);

    return Array.from(Array(renderWeekLength)).map((weekRow, wIndex) => (
      <tr className="day-line" key={wIndex}>
        {DAYS.map((week, dIndex) => {
          const day = dIndex + 1 + wIndex * 7;
          const renderDay = day - startDate;
          const registDay = `${year}/${month}/${renderDay}`;

          return renderDay <= 0 ? (
            <Td key={dIndex}>
              <span className="day otherDay">
                {lastMonthEndDate - startDate + day}
              </span>
            </Td>
          ) : renderDay > endDate ? (
            <Td key={dIndex}>
              <span className="day otherDay">{renderDay - endDate}</span>
            </Td>
          ) : (
            <Td
              className="day-button"
              key={dIndex}
              onClick={() => onOpenModal(registDay)}
            >
              {initialData.map(
                (data, i) =>
                  data.date === registDay && (
                    <span className="hasPlan" key={i}>
                      {initialData[i].planTitle}
                    </span>
                  )
              )}

              <span className="day">{renderDay}</span>
            </Td>
          );
        })}
      </tr>
    ));
  };

  const weekRender = () => {
    return DAYS.map((week) => <th key={week}>{week}</th>);
  };

  const changeMonth = (direction: string) => {
    if (direction === "next") {
      const nextMonth = month + 1;
      if (nextMonth > 12) {
        const newYear = year + 1;
        setMonth(1);
        setYear(newYear);

        return;
      }

      setMonth(month + 1);
    } else if (direction === "prev") {
      const prevMonth = month - 1;
      if (prevMonth < 1) {
        const prevYear = year - 1;
        setMonth(12);
        setYear(prevYear);

        return;
      }

      setMonth(month - 1);
    }
  };

  const buttonRender = (icon: string, direction: string) => {
    return <button onClick={() => changeMonth(direction)}>{icon}</button>;
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="content">
      <h2>{`${year}年${month}月`}</h2>

      <div className="button">
        {buttonRender("<<", "prev")}
        {buttonRender(">>", "next")}
      </div>
      <Table>
        <thead>
          <tr>{weekRender()}</tr>
        </thead>
        <tbody>{DaysRender()}</tbody>
      </Table>

      {isOpen && (
        <ListModal
          isOpen={isOpen}
          registDate={registDate}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default UserCalender;
