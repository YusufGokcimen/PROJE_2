function Navbar() {
  return (
    <nav className="w-screen h-20 bg-blue-400 opacity-60">
      <div className="flex ml-10 cursor-pointer">
        <svg
          className=" w-16 h-16 mt-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          id="trello"
        >
          <path
            fill="#0ea5e9"
            d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
          ></path>
          <path
            fill="#ECEFF1"
            d="M7 12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v9zM14 8a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5z"
          ></path>
        </svg>
        <span className="text-sky-600 text-4xl mt-4 ml-2">TRELLO</span>
      </div>
    </nav>
  );
}

export default Navbar;
