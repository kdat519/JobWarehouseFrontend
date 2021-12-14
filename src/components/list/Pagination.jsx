export default function Pagination(props) {
    const {current_page, last_page, onPageChange} = props;

    return (
        <div className="navbar-nav flex-row justify-content-between mb-5">
            <button 
                className="px-2 btn mx-1 btn-primary"
                disabled={current_page <= 1}
                onClick={() => onPageChange(current_page - 1)}
            >
                Trang trước
            </button>
            <div>{`${current_page}/${last_page}`}</div>
            <button 
                className="px-2 btn mx-1 btn-primary"
                disabled={current_page >= last_page}
                onClick={() => onPageChange(current_page + 1)}
            >
                Trang sau
            </button>
        </div>
    );
}