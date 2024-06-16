import { useState, useEffect } from "react";
import axios from "axios";

import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function PizzaSize({ setTheSize }) {
  const [sizeValue, setSizeValue] = useState(0);
  const [apiData, setApiData] = useState([]);

  const handleChangeSize = (event) => {
    const selectedId = event.target.value;
    const selectedSize = apiData.find((item) => item.id === selectedId);
    setSizeValue(event.target.value);
    console.log(event.target.value);
    setTheSize({[selectedSize.pizzaSize] : selectedSize.price});
    console.log("selectedSize:",selectedSize);
  };

  useEffect(() => {
    async function getData() {
      const url = "http://localhost:4000/PizzaSize";
      const response = await axios.get(url);
      
      setApiData(response.data);
      setSizeValue(response.data[0].id);
      setTheSize({[response.data[0].pizzaSize] : response.data[0].price});
    }
    getData();
  }, []);

  return (
    <>
      <FormControl style={{ minWidth: 100 }}>
        <InputLabel id="size-select-label">Size</InputLabel>
        <Select
          labelId="size-select-label"
          id="size-select"
          value={sizeValue}
          onChange={handleChangeSize}
          label="Size"
        >
          {apiData.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {`${item.pizzaSize} - $${item.price}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default PizzaSize;
