import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, SET_BIRTH } from "../queries";

const Authors = ({ show, isLoggedIn }) => {
  const authors = useQuery(ALL_AUTHORS);

  if (!show || authors.loading) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirth authors={authors.data.allAuthors} isLoggedIn={isLoggedIn} />
    </div>
  );
};

const AuthorBirth = ({ authors, isLoggedIn }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  // This one doesn't work as in the course,
  // I need to manually refetchQueries
  const [setBirth] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!isLoggedIn) return null;

  const submit = (event) => {
    event.preventDefault();

    setBirth({ variables: { name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  );
};
export default Authors;
