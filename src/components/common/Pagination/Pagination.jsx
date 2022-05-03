import React, {useState} from "react";
import classes from "./Pagination.module.css";

const Pagination = ({portionSize, ...props}) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onChangePage = (page) => {
        props.setCurrentPage(page)
        props.getList(page)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={classes.pagination}>
            {portionNumber > 1 && <button className={classes.navBtn}
                onClick={() => setPortionNumber(--portionNumber)}>Prev</button>}
            {pages.filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((page, i) => {
                    let isActive = props.currentPage === page;
                    let isActiveClass = isActive ? `${classes.active} ${classes.page}` : classes.page;
                    return (
                        <button key={`pageNumber-${page}`} onClick={() => onChangePage(page)}
                                className={isActiveClass}>{page}</button>
                    )
                })}
            {portionNumber < portionCount && <button className={classes.navBtn}
                onClick={() => setPortionNumber(++portionNumber)}>Next</button>}
        </div>

    )
}

export default Pagination;