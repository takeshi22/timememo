import * as React from "react";
import axios from "axios";
import format from "date-fns/format";
import getTime from 'date-fns/getTime'
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { Schedule } from "../../../models/models";
import { Button } from "../button";
import { Modal, ModalBody, ModalFooter } from "./Modal";
import { required } from "../../Validate";

export interface Props {
  registDate: string;
  onClose?: () => void;
}

const parseTime = (value: string): Number => {
  return Number(value.replace(/:/, ""));
};

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
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
          validate={({ startTime, endTime }) => {
            let errors = {} as any;

            if (!!startTime) {
              const invalid = parseTime(startTime) > parseTime(endTime);
              if (invalid) {
                errors.endTime = "開始時間より後の時間を指定ください";
              }
            }
            if (!!endTime) {
              const invalid = parseTime(endTime) < parseTime(startTime);
              if (invalid) {
                errors.startTime = "終了時間より前の時間を指定ください";
              }
            }

            return errors;
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="title"
                onChange={handleChange}
                value={values.title}
                validate={required}
              >
                {({ field, meta: { error, touched } }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                    />
                    {error && touched && <div>{error}</div>}
                  </div>
                )}
              </Field>

              <div>
                <Field name="startTime" onChange={handleChange}>
                  {({ field, meta: { error, touched } }) => (
                    <div>
                      <input {...field} type="time" step="300" />
                      {error && touched && <div>{error}</div>}
                    </div>
                  )}
                </Field>
                <span>〜</span>
                <Field name="endTime" onChange={handleChange}>
                  {({ field }) => (
                    <div>
                      <input {...field} type="time" step="300" />
                      {errors.endTime && touched.endTime && <div>{errors.endTime}</div>}
                    </div>
                  )}
                </Field>
              </div>

              <textarea name="content" onChange={handleChange} />
              <ModalFooter>
                <Button clickHandle={() => onClose()}>キャンセル</Button>
                <Button type="submit">保存</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};
