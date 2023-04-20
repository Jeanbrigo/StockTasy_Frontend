import React, { useState } from 'react';

function DropdownInput() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const options = [];
  for (let i = 2; i <= 8; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="">Number of Players</option>
      {options}
    </select>
  );
}

export default DropdownInput;