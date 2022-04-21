import React from "react";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onChangePage = (page) => {
        props.setCurrentPage(page)
        props.getUsers(page)
    }
    return (
        pages.map((page,i) => {
                let isActive = props.currentPage === page;
                let isActiveClass = isActive ? `${classes.active} ${classes.page}` : classes.page;
                return (
                    <button key={`pageNumber-${page}`} onClick={() => onChangePage(page)}
                            className={isActiveClass}>{page}</button>
                )
            }
        )
    )
}

export default Pagination;