import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

console.log(React.version)
const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part data={part} />
      ))}
    </div>
  );
};

const Part = ({ data }) => {
  return (
    <div>
      <p>
        {data.name} {data.exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  let total = 0;
  parts.forEach(part => {
    const temp = part.exercises;
    total += temp;
  });

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course["name"]} />
      <Content parts={course["parts"]} />
      <Total parts={course["parts"]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
