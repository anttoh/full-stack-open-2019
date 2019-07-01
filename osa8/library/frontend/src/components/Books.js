import React, { useState } from "react";

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState("");

  if (!props.show) {
    return null;
  }

  const result = props.result;
  if (result.loading) {
    return <div>loading...</div>;
  }
  let books = result.data.allBooks;

  const genreArrays = books.map(book => book.genres);
  const genresWithDuplicates = [].concat(...genreArrays);
  const genres = [...new Set(genresWithDuplicates)];

  const genreButtonGroup = () => {
    return (
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))}
        <div> </div>
        <button onClick={() => setSelectedGenre("")}>any</button>
      </div>
    );
  };

  if (selectedGenre !== "") {
    books = books.filter(book => book.genres.includes(selectedGenre));
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreButtonGroup()}
    </div>
  );
};

export default Books;
