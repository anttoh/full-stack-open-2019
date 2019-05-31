import React from "react";
import "./App.css";
import Course from "./components/Course";

const App = ({ courses }) => {
  const allCourses = () => courses.map(course => <Course key={course.id} course={course} />);

  return <div>{allCourses()}</div>;
};

export default App;
