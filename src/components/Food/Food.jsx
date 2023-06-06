import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Food.css";
import { Button, Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import PieChart from '../pieChart';
export const Food = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [rows, setRows] = useState([]);


useEffect(()=>{
getData();
},[])

console.log(data.length)

  let { name } = useParams();

  const getData = () => {
    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${name}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
        "x-rapidapi-key": "ebf43f547dmsh0c0e3466a2763d8p19bf4ajsnd8cd87288f72",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const limitData = response.hits.slice(0,3)
        setData(limitData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

 const handleSearch =() => {
    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${text}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
          "x-rapidapi-key": "ebf43f547dmsh0c0e3466a2763d8p19bf4ajsnd8cd87288f72",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const limitedData = response.hits.slice(0,3)
          setData(limitedData);
        })
        .catch((err) => {
          console.error(err);
        });
        console.log(data)
 } 

console.log("Data:",data);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const handleClick = (item) => {
  const newRow = createData(
    item.recipe.label,
    Math.floor(item.recipe.calories),
    Math.floor(item.recipe.digest[0].total),
    Math.floor(item.recipe.digest[1].total),
    Math.floor(item.recipe.digest[2].total)
  );

  setRows((prevRows) => [...prevRows, newRow]);
};


const CenteredContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  maxWidth:"100%"
});
// const rows = [

//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];




const addToTable = () => {
  if (selectedData) {
    const newRow = createData(
      selectedData.recipe.label,
      Math.floor(selectedData.recipe.calories),
      Math.floor(selectedData.recipe.digest[0].total),
      Math.floor(selectedData.recipe.digest[1].total),
      Math.floor(selectedData.recipe.digest[2].total)
    );

    setRows((prevRows) => [...prevRows, newRow]);
  }
};

  return (
  <>
  <Container>
  <h1 id="food_title">Track Your Daily Calories</h1>
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '60%',marginBottom:"50px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {rows.map((row) => (
    <StyledTableRow key={row.name}>
      <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="right">{row.calories}</StyledTableCell>
      <StyledTableCell align="right">{row.fat}</StyledTableCell>
      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
      <StyledTableCell align="right">{row.protein}</StyledTableCell>
    </StyledTableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
    </div>
    <CenteredContainer>
    <div id="food_container">
      <input
        type="text"
        id="food_Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search for a food, brand, or restaurant"
      />
      <button id="foodSearchBtn" onClick={handleSearch}>
        <i className="fas fa-search"></i> 
      </button>
{/* 
      <div id={data.length===0 ? "noDataDiv" : "dataDiv"}>
      <img id="noDataImg" src="https://www.myfitnesspal.com/react-static/e95f17aa29d83b7a7588a0f825f7b66f.svg" alt="" />
      <h5>Food Analysis</h5>
      <p>Understand how the food you’re eating contributes to your daily calories, macronutrients, and micronutrients.</p>   
      </div> */}
        
      <div id={data.length !== 0 ? "food_search_data_div" : "no_food_search_data_div"}>
      {data.map((e,i) => (
        <div key={i} className="food_search_result_div">
          <div className="food_search_result_div_sec_1">
          <h5>{data[i].recipe.label}</h5>
          <div>

          
          <p>Calories : {Math.floor(data[i].recipe.calories)}</p>

          <div>
          <li>Fat : {Math.floor(data[i].recipe.digest[0].total)} mg</li>
          <li>Carbs : {Math.floor(data[i].recipe.digest[1].total)} mg</li>
          <li>Protein : {Math.floor(data[i].recipe.digest[2].total)} mg</li>
          </div>
          </div>
          </div>
          <Button onClick={() => handleClick(data[i])}>Add</Button>

          {/* <div className="calories_circle"> {Math.floor(data[i].recipe.calories)} </div> */}
        </div>
      ))} 
      </div> 


      
    </div>
    </CenteredContainer>
  
   
    </Container>
    </>
  );
};
