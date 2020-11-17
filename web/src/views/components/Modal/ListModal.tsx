import * as React from "react";
import { useState } from "react";
import { Button } from "../button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal"
import { InputModal } from "./InputModal"
import { initialData } from "../../data/data";

export interface Props {
  isOpen?: boolean;
  registDate: string;
  onClose?: () => void;
}

export const ListModal = (props: Props) => {
  const { onClose, registDate } = props;

  const [inputModalOpen, setInputModalOpen] = useState(false);

  const onCloseInputModal = () => {
    setInputModalOpen(false);
  };

  return (
    <React.Fragment>
      <Modal>
        <ModalHeader className="fl-x">
        <p>{registDate}の予定を登録</p>
          <Button clickHandle={() => setInputModalOpen(true)}>+</Button>
        </ModalHeader>
        <ModalBody>
          <ul className="plan-list">
            {initialData.map(((data, i) => (
              <li key={i}>{data.date === registDate && data.planTitle}</li>
            )))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button clickHandle={onClose}>
              閉じる
          </Button>
        </ModalFooter>
      </Modal>
  
      {inputModalOpen && <InputModal onClose={onCloseInputModal} registDate={registDate}/>}
    </React.Fragment>
  );
};
