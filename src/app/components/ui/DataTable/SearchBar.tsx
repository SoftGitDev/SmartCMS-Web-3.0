import React from "react";
import "./Datatable.css"
import { Search } from "lucide-react";

interface searchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchTerm, setSearchTerm }: searchBarProps) => {
  return (
    <div className="searchable-data" style={{ width: '230px' }}>
      <div className='position-relative w-100'>
        <input type='text' name='searchAgentGroup' className='searchTableRecord position-absolute' placeholder='Search' value={searchTerm} onChange={(e: any) => { setSearchTerm(e.target.value) }} />
        <div className='d-flex justify-content-center align-items-center position-absolute' style={{ width: 40, height: 40 }}>
          <Search size={16} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
