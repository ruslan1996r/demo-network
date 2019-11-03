export const updateObjectInArray = (
  items,
  itemId,
  objectPropName,
  newObjectProps
) => {
  return items.map(elem => {
    if (elem[objectPropName] === itemId) {
      return { ...elem, ...newObjectProps };
    }
    return elem;
  });
};

//БЫЛО ДО ЭТОГО:
// return {
//     ...state,
//     //users: [...state.users], //делаем копию массива, в котором будем что-то менять
//     //аналогичная форма записи через Map, создаёт новый массив на основе старого
//     users: state.users.map(u => {
//       if (u.id === action.userId) {
//         return { ...u, followed: true };
//       }
//       return u;
//     })
//   };
