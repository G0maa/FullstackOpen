import { useQuery } from "@apollo/client";
import { GET_ME, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
  const me = useQuery(GET_ME);

  const favouriteBooks = useQuery(ALL_BOOKS);

  console.log(me);
  if (!show || me.loading || favouriteBooks.loading) return null;

  // God... this is very ugly.
  if (!me.loading) favouriteBooks.refetch({ genre: me.data.me.favouriteGenre });

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre {me.data.me.favouriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
