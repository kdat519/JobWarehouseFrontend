import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    current_page: PropTypes.number.isRequired,
    last_page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
}

function Pagination(props) {
    const {current_page, last_page, onPageChange} = props;

    function handlePageChange(newPage) {
        if (onPageChange) onPageChange(newPage);
    }
    return (
        <div>
            <div className="navbar-nav flex-row justify-content-between">
            <button
                disabled={current_page <= 1}
                onClick={() => handlePageChange(current_page - 1)}
                className="px-2 btn mx-1 btn-primary"
            >
                Trang trước
            </button>
            {`${current_page}/${last_page}`}
            <button
                disabled={current_page >= last_page}
                onClick={() => handlePageChange(current_page + 1)}
                className="px-2 btn mx-1 btn-primary"
            >
                Trang sau
            </button>
            </div>
            <div>
                <br /><br /><br />
            </div>
        </div>
    );
}

export default Pagination;