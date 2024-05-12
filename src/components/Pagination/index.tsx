import React from "react";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import axios from "axios";

import styles from "./Pagination.module.scss";
import {IPaginationProps} from "../../data/declarations";
import {selectFilter} from "../../redux/slices/filterSlice";

export const Pagination = ({currentPage, onChangePage}: IPaginationProps) => {
    const [totalPages, setTotalPages] = React.useState(1);
    const {searchValue} = useSelector(selectFilter);

    const getCategoryIdString = localStorage.getItem("categoryId");
    const getCategoryId = getCategoryIdString ? +getCategoryIdString : 1;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://654e75f6cbc325355742e3fc.mockapi.io/sushi_en",
                    {
                        params: {
                            category: getCategoryId,
                        },
                    },
                );
                const totalCount = response.data.length;
                if (typeof totalCount === "number") {
                    setTotalPages(Math.ceil(totalCount / 4));
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (getCategoryId > 0) {
            fetchData();
        }
    }, [getCategoryId]);

        if (totalPages > 1 && searchValue.length === 0) {
            return (
                <div className={styles.paginationBlock}>
                    <ReactPaginate
                        className={styles.root}
                        breakLabel="..."
                        nextLabel=">"
                        previousLabel="<"
                        onPageChange={(event) => onChangePage(event.selected + 1)}
                        pageRangeDisplayed={4}
                        pageCount={totalPages}
                        forcePage={currentPage - 1}
                        renderOnZeroPageCount={null}
                    />
                </div>
            );
        } else {
            return <></>;
        }
    };
