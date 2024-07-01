// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";



function Toppings({setTheToppings}) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [toppingApiData, setToppingApiData] = useState([]);
  
  const handleToppingChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setSelectedToppings((prevSelectedToppings) => [
        ...prevSelectedToppings,
        { name, price: parseFloat(value) },
      ]);
    } else {
      setSelectedToppings((prevSelectedToppings) =>
        prevSelectedToppings.filter((topping) => topping.name !== name)
      );
    }
    
  };
  useEffect(() => {
    const total = calculateTotalPrice();
    setTheToppings(selectedToppings);
    console.log("selectedTopings : ",selectedToppings);
    console.log("ToppingsTotal:",total);
  }, [selectedToppings]);

  const calculateTotalPrice = () => {
    return selectedToppings.reduce(
      (total, topping) => total + topping.price,
      0
    );
  };

  useEffect(() => {
    async function getToppingData() {
      const url = "https://json-server-pizza-customization.vercel.app/Toppings";
      const response = await axios.get(url);
     
      setToppingApiData(response.data);
    }
    getToppingData();
  }, []);

  return (
  <>
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Toppings</FormLabel>
      <FormGroup>
        {toppingApiData.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.price}
            control={
              <Checkbox
                checked={selectedToppings.some(
                  (topping) => topping.name === item.name
                )}
                onChange={handleToppingChange}
                name={item.name}
              />
            }
            label={`${item.name} - $${item.price}`}
          />
        ))}
      </FormGroup>
    </FormControl>
    </>
  );
}
export default Toppings;
