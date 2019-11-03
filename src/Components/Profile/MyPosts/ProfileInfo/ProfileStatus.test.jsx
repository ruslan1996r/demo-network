// https://www.valentinog.com/blog/testing-react/
//npm i reac-test-renderer@(версия реакта, типа: 16.10.2) --save-dev //сохранить в дев
//npm run test, смотреть на зелёные "PASS"

//status - какой-то пропс в компоненте (тут проверяется this.state.status)
//getInstance() - дать какой-то конкретный экземпляр
//instance - когда идёт обращение к какому-то стейту или пропсу
//root - когда работа с ДОМ-элементами

import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
describe("Profile status component", () => {
  test("status from props should be in the state", () => {
    //проверка this.state.status
    const component = create(<ProfileStatus status="Putin_1337" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Putin_1337");
  });
  test("after creation <span> should be displayed", () => {
    //проверка на span/input (что активно)
    const component = create(<ProfileStatus status="Putin_1337" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("after creation <span> should contains correct status", () => {
    const component = create(<ProfileStatus status="Putin_1337" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("Putin_1337");
  });
  test("after creation <input> shouldn`t displayed", () => {
    //toThrow - проверка на ошибку
    const component = create(<ProfileStatus status="Putin_1337" />);
    const root = component.root;
    expect(() => {
      root.findByType("input");
    }).toThrow();
  });
  test("input should be displayed in editMode instead of span", () => {
    //проверка на появление инпута после onDoubleClick
    const component = create(<ProfileStatus status="Putin_1337" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("Putin_1337");
  });
  test("callback should be called", () => {
    //проверка на deactivateEditMode(), который есть в ProfileStatus
    const mockCallback = jest.fn(); //какая-то функция, которая показывает сколько раз её вызвали
    const component = create(
      <ProfileStatus status="Putin_1337" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
