import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = React.memo(
  ({
    currentPage,
    onPageChanged,
    totalUsersCount,
    pageSize,
    users,
    ...props
  }) => {
    //...props - такой синтаксис значит, что мы деструктурируем пропсы: берём отдельно currentPage и другие
    //а всё, что осталось, записываем как restProps (...props) - всё оставшееся

    return (
      <div>
        <Paginator
          currentPage={currentPage}
          totalItemsCount={totalUsersCount}
          onPageChanged={onPageChanged}
          pageSize={pageSize}
          portionSize={10}
        />
        <div>
          {users.map(u => (
            <User
              key={u.id}
              user={u}
              followingInProgress={props.followingInProgress}
              follow={props.follow}
              unfollow={props.unfollow}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default Users;
