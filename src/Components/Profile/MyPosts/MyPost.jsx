import React from "react";
import s from "./MyPost.module.css";
import Post from "./Post/Post";
import { reduxForm, Field } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators";
import { TextArea } from "../../common/CustomFields/CustomFields";

//Если не сделать такую манипуляцию, то появится баг. Функция будет постоянно вызывать саму себя
let maxLength10 = maxLengthCreator(10);

const AddNewPostForm = React.memo(props => {
  console.log("object");
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Post message"
          component={TextArea}
          name="newPostText"
          validate={[required, maxLength10]}
        ></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
});

let AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(
  AddNewPostForm
);

//onSubmit - когда форма соберёт данные, то выполнится onSubmit
//handleSubmit - функция-обёртка. Выполняет какую-то свою логику + preventDefault + функцию от родителя onSubmit

//shouldComponentUpdate должен вернуть true или false, чтобы компонента не ререндерилась
//мы делаем проверку на неравенство props, чтобы оно динамически возвращало true/false :
// shouldComponentUpdate(nextProps, nextState) {
//   return nextProps !== this.props || nextState !== this.state;
// }
//В случае с PureComponent вся эта проверка лежит внутри компоненты
//React.memo(<Component />) - PureComponent для функциональных компонентов

const MyPost = props => {
  let postsElements = [...props.posts].reverse().map(p => {
    return <Post key={p.id} message={p.message} likesCount={p.likesCount} />;
  });

  let onAddPost = values => {
    console.log(values);
    props.addPost(values.newPostText);
    values.newPostText = "";
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPost;
