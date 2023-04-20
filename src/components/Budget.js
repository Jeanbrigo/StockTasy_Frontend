import React, { useState } from 'react';

function BudgetInput() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  return (
    <div>
      <label htmlFor="dropdown">Portfolio Budget:</label>
      <select id="dropdown" value={selectedValue} onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="1000">$ 1,000</option>
        <option value="10000">$ 10,000</option>
        <option value="50000">$ 50,000</option>
        <option value="100000">$ 100,000</option>
        <option value="500000">$ 500,000</option>
        <option value="1000000">$ 1,000,000</option>
      </select>
    </div>
  );
}

export default BudgetInput;