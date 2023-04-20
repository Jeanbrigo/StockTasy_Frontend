import React, { useState } from "react";

const options = [
  { label: "Every hour", value: "1 hour" },
  { label: "Every day", value: "1 day" },
  { label: "Every week", value: "1 week" },
];

const PointsInterval = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
        <label htmlFor="dropdown">Points Interval:</label>
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

export default PointsInterval;