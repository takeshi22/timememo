import * as React from "react";
import { useState } from "react";
import { Button } from "../button";
import { Modal, ModalBody, ModalFooter } from "./Modal";

export interface Props {
  registDate: string;
  onClose?: () => void;
}

interface Ischedule{
  title: string;
  startTime: string;
  endTime: string;
  eventDay: string;
  content: string;
}

export const InputModal = (props: Props) => {
  const { onClose, registDate } = props;
  const [planData, setPlanData] = useState({
    title: "",
    startTime: "",
    eventDay: "",
    endTime: "",
    content: ""
  } as Ischedule);

  const handleChange = e => {
    const { name, value } = e.target;

    setPlanData({
      ...planData,
      eventDay: registDate,
      [name]: value,
    });
  };

  const onAddPlan = () => {
    return;
  };

  return (
      <Modal>
        <ModalBody>
          <p className="registDate">{registDate}</p>
          <h2>
            <input
              type="text"
              name="title"
              defaultValue=""
              placeholder="唐揚げ用の鶏肉を買う"
              onChange={handleChange}
            />
          </h2>

          <div>
            <span>
              <input
                type="time"
                name="startTime"
                onChange={handleChange}
                defaultValue=""
                step="300"
              />
            </span>
            <span>〜</span>
            <span>
              <input
                type="time"
                name="endTime"
                onChange={handleChange}
                defaultValue=""
                step="300"
              />
            </span>
          </div>

          <textarea
            name="content"
            defaultValue=""
            onChange={handleChange}
          ></textarea>
        </ModalBody>

        <ModalFooter>
          <Button clickHandle={() => onClose()}>キャンセル</Button>
          <Button clickHandle={() => onAddPlan()}>保存</Button>
        </ModalFooter>
      </Modal>
  );
};
