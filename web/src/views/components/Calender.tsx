import * as React from "react";
import { useEffect, useState } from "react";
import { ListModal } from "./Modal/ListModal";
import { initialData } from "../data/data";

interface IState {
  isOpen: boolean;
  days: string[];
  year: number;
  month: number;
  day?: number;
}

export const UserCalender = () => {
  const now = new Date();
  const days = ["日", "月", "火", "水", "木", "金", "土"];

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [isOpen, setIsOpen] = useState(false);
  const [registDate, setRegistDate] = useState("");

  const onOpenModal = (registDay: any) => {
    setRegistDate(registDay);
    setIsOpen(true);
  };

  const daysRender = () => {
    const startDay = new Date(year, month - 1, 1).getDay();
    const endDay = new Date(year, month, 0).getDate();
    const lastMonthEndDay = new Date(year, month - 1, 0).getDate();

    return Array.from(Array(6)).map((weekRow, wIndex) => (
      <tr className="day-line" key={wIndex}>
        {days.map((week, dIndex) => {
          const day = dIndex + 1 + wIndex * 7;
          const renderDay = day - startDay;
          const registDay = `${year}-${month}-${renderDay}`;

          return renderDay <= 0 ? (
            <td key={dIndex}>
              <span className="day otherDay">{lastMonthEndDay - startDay + day}</span>
            </td>
          ) : renderDay > endDay ? (
            <td key={dIndex}>
              <span className="day otherDay">{renderDay - endDay}</span>
            </td>
          ) : (
            <td
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
            </td>
          );
        })}
      </tr>
    ));
  };

  const weekRender = () => {
    return days.map((week) => <td key={week}>{week}</td>);
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
    <div className="content mx-auto">
      <h2>{`${year}年${month}月`}</h2>

      <div className="button">
        {buttonRender("<<", "prev")}
        {buttonRender(">>", "next")}
      </div>
      <table className="calender-table mx-auto">
        <thead>
          <tr>{weekRender()}</tr>
        </thead>
        <tbody>{daysRender()}</tbody>
      </table>

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
