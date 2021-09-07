import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
};
Pagination.defaultsProps = {
    onPageChange: null
}

function Pagination(props) {
    const { pagination, onPageChange, setPagination } = props;
    const { _page, _limit, _totalRows } = pagination;
    const totalPage = Math.ceil(_totalRows / _limit);

    const handleChangePage = (newPage) => {
        onPageChange(newPage);

        setPagination({
            _page: newPage,
            _limit: 8,
            _totalRows: 13
        })
    }

    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handleChangePage(_page - 1)}>
                Prev</button>
            <button
                disabled={_page >=   totalPage}
                onClick={() => handleChangePage(_page + 1)}>
                Next</button>
        </div>

    );
}

export default Pagination;