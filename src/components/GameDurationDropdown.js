import React, { useState } from "react";

const options = [
  { label: "1 day", value: "1 day" },
  { label: "1 week ", value: "1 week" },
  { label: "1 month", value: "1 month" },
  { label: "6 months", value: "6 months" },
  { label: "1 year", value: "1 year" },
];

const GameDuration = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
        <label htmlFor="dropdown">Game Duration:</label>
      <select
        value={selectedOption.value}
        onChange={(e) =>
          handleOptionChange(
            options.find((option) => option.value === e.target.value)
          )
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameDuration;