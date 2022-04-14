import React, {useState,useEffect} from 'react'
import Data from './Data.json'
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import {Table,Box,TableBody,TableCell,TableContainer,TableRow} from "@material-ui/core"
import {Paper ,TableHead,TextField,Checkbox,TablePagination} from "@material-ui/core"
import SearchIcon from '@mui/icons-material/Search';
function Tabledata(props) {
  
  const [data,setData]=useState([]);
  const [search,setSearch]= useState('')
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [editing,setEditing]= useState(false)
 
  const getData=()=>{
    fetch('data.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  const searchHandler=(event)=>{
    setSearch(event.target.value)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
 const onDeleteIcon=((del)=>{
  setData(pre=>{
    return pre.filter(icon=>icon.id !== del.id)
  })
 })
 const onEditIcon=((edit)=>{
    setEditing(true)
 })
  return (
   <div>
      <Box>
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
      <TableContainer component={Paper}>
        
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
              <Checkbox
            color="primary"
            
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
              </TableCell>
              <TableCell >NAME</TableCell>
              <TableCell >EMAIL</TableCell>
              <TableCell >Role</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              
            {Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .filter((data) => {
                    return (data.name.toLowerCase().includes(search.toLowerCase()))
                }).map((row) => (
              <TableRow key={row.name}>
                 <TableCell >
                 <Checkbox
            color="primary"
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
                </TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell > <EditIcon onClick={()=>{
                  onEditIcon()
                }}
                /><DeleteOutlineIcon onClick={()=>{
                  onDeleteIcon()
                }} style={{color:"red"}}/></TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={10}
          component="div"
          color="secondary" 
          count={Data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
   </div>
  )
}

export default Tabledata