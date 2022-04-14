import React, {useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Data from './Data.json'
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from "@material-ui/core"

const columns = [
  { field: "id", headerName: 'ID', width: 200 },
  { field: 'name', headerName: 'NAME', width: 200 },
  { field: 'email', headerName: 'EMAIL', width: 200 },
  {field: 'role',headerName: 'Role',width: 200,}
];



export default function DataTable() {
  const [search,setSearch]= useState('')
  const searchHandler=(event)=>{
    setSearch(event.target.value)
  }
  return (
    <div style={{ height: 700, width: '100%' }}>
       <TextField
          onChange={searchHandler}
          variant="standard"
          fullWidth
          icons={<SearchIcon alignItem="right"/>}
          placeholder='Search'
          InputProps={{
            endAdornment: (
              
                  <SearchIcon />
            )
          }}
          
        />
         {Data
           .filter((data) => {
                    return (data.name.toLowerCase().includes(search.toLowerCase()))
                })
      <DataGrid
        rows={Data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
              }
    </div>
  );
}
