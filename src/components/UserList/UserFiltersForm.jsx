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
        <div>
            <form >
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <button onClick={handleClick}>
                    Tìm kiếm
                </button>
            </form>
        </div>
    );
}

export default UserFiltersForm;