import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../common/CustomFields/CustomFields";
import { required, maxLengthCreator } from "../../utils/validators";

//в redux-form дочерняя компонента "сообщает" родительскую через onSubmit про отправку формы

const maxLength50 = maxLengthCreator(50);

const Dialogs = props => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(d => {
    return <DialogItem name={d.name} id={d.id} key={d.id} />;
  });

  let messagesElements = state.messages.map(m => {
    return <Message message={m.message} key={m.id} />;
  });

  let addNewMessage = values => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

const AddMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Enter your message"
          component={TextArea}
          validate={[required, maxLength50]}
          name="newMessageBody"
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);

export default Dialogs;
