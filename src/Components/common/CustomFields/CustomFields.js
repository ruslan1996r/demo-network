import React from "react";
import styles from "./CustomFields.module.css";
import { Field } from "redux-form";

//нужно достать только определённые пропсы, а не все. Потому что в качестве всех props сюда приходят:
//meta, input и все остальные, вроде placeholder
//снизу деструктуризация. Здесь достаётся input, meta. Props содержит всё, что и раньше, но кроме этих двух полей

export const FormControl = ({ meta: { touched, error }, children }) => {
  //children - textarea или инпут в этом случае
  const hasError = error && touched;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      <div>{hasError && <span>{error}</span>}</div>
    </div>
  );
};

export const TextArea = props => {
  let { input, meta, child, ...restProps } = props;
  return (
    // {...props} передаёт пропсы ниже, в сам CHILD
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = props => {
  let { input, meta, child, ...restProps } = props;
  //child - ребёнок, который в него передаётся
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  type,
  props = {},
  text = ""
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        component={component}
        name={name}
        validate={validators}
        type={type}
        {...props}
      />
      {text}
    </div>
  );
};

// [required, maxLength30]
