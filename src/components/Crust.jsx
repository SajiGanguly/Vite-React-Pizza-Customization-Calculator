// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Crust({ setTheCrust }) {
  const [value, setValue] = useState(0);
  const [apiData, setApiData] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    const selectedId = parseInt(event.target.value);
    const selectedCrust = apiData.find((item) => item.id === selectedId);
    console.log(selectedCrust);
    setValue(event.target.value);
    setTheCrust({ [selectedCrust.type]: selectedCrust.price });
  };

  useEffect(() => {
    async function getData() {
      const url = "http://localhost:4000/Crusts";
      const response = await axios.get(url);

      setApiData(response.data);
      setTheCrust({ [response.data[0].type]: response.data[0].price });
    }
    getData();
  }, []);

  return (
    <div>
      {" "}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {apiData.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            name={item.type}
            label={`${item.type} - $${item.price}`}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default Crust;
