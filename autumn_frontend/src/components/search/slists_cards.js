import { useSelector,useDispatch } from "react-redux";

export default function Slist(){
    return(
        <div>
      <label>
        Search by:
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="card">Card Name</option>
          <option value="list">List Name</option>
        </select>
      </label>
      <br />
      <label>
        {searchType === 'card' ? 'Card Name:' : 'List Name:'}
        <input type="text" value={searchName} onChange={handleSearchNameChange} />
      </label>
      <br />
      <button onClick={handleSearch}>Search</button>
    </div>
    )
}