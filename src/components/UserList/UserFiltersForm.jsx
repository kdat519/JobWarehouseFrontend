import React, { useState } from 'react';
import PropTypes from 'prop-types';

UserFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

UserFiltersForm.defaultProps = {
    onSubmit: null,
};

function UserFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault();
        const formValues = {
            searchTerm
        };
        if (onSubmit) onSubmit(formValues);
    }

    return (
        <div className="input-group">
            <form className="input-group mb-5">
                <input
                    className="form-control"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Tìm tên, email, số điện thoại..."
                />
                <button 
                    onClick={handleClick}
                    className="btn btn-outline-primary">
                    Tìm kiếm
                </button>
            </form>
        </div>
    );
}

export default UserFiltersForm;