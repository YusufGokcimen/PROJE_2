function Search({ searchValue, setSearchValue }) {
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="absolute right-10 top-4">
      <div className=" absolute left-2 top-1/2 -translate-y-1/2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-block mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-200 rounded-sm mr-4 h-12 w-64 px-2 pl-8 outline-none"
        value={searchValue}
        onChange={(e) => handleChange(e)}
        placeholder={"Ara"}
      />
    </div>
  );
}

export default Search;
