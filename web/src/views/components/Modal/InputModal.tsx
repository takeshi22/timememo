import * as React from "react";
import axios from "axios";
import format from "date-fns/format";
import { Formik } from "formik";
import { useState } from "react";
import { Schedule } from "../../../models/models";
import { Button } from "../button";
import { Modal, ModalBody, ModalFooter } from "./Modal";

export interface Props {
  registDate: string;
  onClose?: () => void;
}

export const InputModal = (props: Props) => {
  const { onClose, registDate } = props;

  const initialValues: Schedule = {
    title: "",
    startTime: "",
    day: registDate,
    endTime: "",
    content: "",
  };

  const onSubmit = (values: Schedule) => {
    const inputValues = values;
    axios
      .post("http://localhost:5050/schedule", inputValues)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    return;
  };

  return (
    <Modal>
      <ModalBody>
        <p className="registDate">{registDate}</p>
        <Formik initialValues={initialValues} onSubmit={(values) => onSubmit(values)}>
          {({ handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <h2>
                <input
                  type="text"
                  name="title"
                  placeholder="唐揚げ用の鶏肉を買う"
                  onChange={handleChange}
                  value={values.title}
                />
              </h2>

              <div>
                <span>
                  <input
                    type="time"
                    name="startTime"
                    onChange={handleChange}
                    step="300"
                  />
                </span>
                <span>〜</span>
                <span>
                  <input
                    type="time"
                    name="endTime"
                    onChange={handleChange}
                    step="300"
                  />
                </span>
              </div>

              <textarea
                name="content"
                onChange={handleChange}
              />
              <ModalFooter>
                <Button clickHandle={() => onClose()}>キャンセル</Button>
                <Button type="submit">保存</Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};
