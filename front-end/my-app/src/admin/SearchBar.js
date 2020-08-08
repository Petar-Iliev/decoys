import React from 'react'


function SearchBar(props){

    function handleFilterTextChange(e){
        props.onFilterTextChange(e.target.value);
    }

    function handleUserFilter(e){
        console.log("CHECKERR "+e.target.checked);
       props.filterUser(e.target.checked)
    }

    return(
       <>
        <input type="text" value={props.filterText} placeholder="Search..." onChange={handleFilterTextChange}/>
       ORG TITLE <input type="checkbox" onChange={handleUserFilter}/>
      </>
    )
}


export default SearchBar;