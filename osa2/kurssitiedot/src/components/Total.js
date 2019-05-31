import React from "react";

const Total = ({ parts }) => {
  const total = parts
    .map(part => part.exercises)
    .reduce((sum, curVal) => sum + curVal);

  return <p>yhteensä {total} tehtävää</p>;
};

export default Total;
