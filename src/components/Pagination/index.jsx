import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './Pagination.scss';

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
        <div className="pagination">
            <Button
                className="btn btn-prev"
                color={"primary"}
                disabled={_page <= 1}
                onClick={() => handleChangePage(_page - 1)}>
                Prev</Button>
            <Button
                className="btn btn-next"
                color={"primary"}
                disabled={_page >= totalPage}
                onClick={() => handleChangePage(_page + 1)}>
                Next</Button>
        </div>

    );
}

export default Pagination;