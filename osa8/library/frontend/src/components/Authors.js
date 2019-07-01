import React, { useState } from "react";
import Select from "react-select";

const Authors = props => {
  const [nameOption, setNameOption] = useState(null);
  const [born, setBorn] = useState("");

  if (!props.show) {
    return null;
  }
  const result = props.result;
  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    };
  });

  const submit = async e => {
    e.preventDefault();

    const bornInt = Number(born);
    await props.editAuthor({
      variables: { name: nameOption.value, setBornTo: bornInt }
    });

    setNameOption(null);
    setBorn("");
  };

  const setBirthYearForm = () => {
    if (props.token) {
      return (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div>
              name
              <Select
                value={nameOption}
                onChange={nameOption => setNameOption(nameOption)}
                options={options}
              />
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {setBirthYearForm()}
    </div>
  );
};

export default Authors;
