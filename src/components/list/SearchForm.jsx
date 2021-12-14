import { useState } from 'react';

export default function SearchForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ searchTerm });
  }
  
  return (
    <div>
      <form className="input-group mb-5" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm tên, email, số điện thoại..."
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
}
