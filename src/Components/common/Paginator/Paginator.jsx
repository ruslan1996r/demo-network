import React, { useState } from "react";
import styles from "./Paginator.module.css";

//Пагинатор отображает 10 текущих страниц, отфильтровывая их по левым и правым границам
//Пример:
//leftPortionPageNumber - Текущая страница (2-1)* размер порции (10) +1 = 11 (первый элемент 2-й страницы)
//rightPortionPageNumber - Текущая страница 2 * размер порции (10) = 20
//Пагинация будет с 11 по 20 страницы, если мы находимся на "второй порции"

const Paginator = React.memo(
  ({
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 10
  }) => {
    //количество страниц = всех юзеров поделить на количество юзеров на одной странице
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize); //количество страниц/количество порций (10)
    let [portionNumber, setPortionNumber] = useState(1); //ТУТ БАГ, ПОПРАВИТЬ
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    console.log(portionNumber, "portionNumber");
    return (
      <div className={styles.paginator}>
        {portionNumber > 1 && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          >
            Prev
          </button>
        )}
        {pages
          .filter(
            p => p >= leftPortionPageNumber && p <= rightPortionPageNumber
          )
          .map(page => {
            return (
              <span
                key={page}
                onClick={() => onPageChanged(page)}
                className={
                  currentPage === page
                    ? styles.selectedPage
                    : styles.notSelected
                }
              >
                {page}
              </span>
            );
          })}
        {/* Количество порций больше, чем номер порции(страницы)? тогда показать кнопку "вправо" */}
        {/* К примеру: количество порций 3, а мы на 2-й странице. Кнопка отрисуется */}
        {portionCount > portionNumber && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          >
            Next
          </button>
        )}
      </div>
    );
  }
);

export default Paginator;
