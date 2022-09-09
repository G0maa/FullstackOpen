import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  // THIS solution works, but forr some reason apollo refuses to use the cached data
  // and waits for the request to get fulfilled, obviously this creates a bad UX.

  // I observed how Apollo caches the data,
  // it caches every useQuery() request, based on its variables ?so far?.
  // This gets cached as: allBooks({"genre":null})
  // const books = useQuery(ALL_BOOKS, {
  //   variables: { genre: null },
  // });
  const [filter, setFilter] = useState("all");
  const [allGenres, setAllGenres] = useState(new Set(["all"]));
  console.log("filter", filter);
  // This gets cached as: allBooks({})
  // Update cache saves to this one by default.
  const books = useQuery(ALL_BOOKS);

  // Delete this and its dependecies...
  // const allGenres = useQuery(ALL_GENRES);

  // Now if a new book is added with a new Genre,
  // allGenres gets updated only when you click on "all" again.

  // Revise this solution.
  useEffect(() => {
    console.log("HERE");
    if (!books.loading && filter === "all") {
      const repGenres = ["all"];
      for (const book of books.data.allBooks) {
        for (const genre of book.genres) {
          repGenres.push(genre);
        }
      }

      setAllGenres(new Set(repGenres));
    }
    // Don't need to add books.data.allBooks, since books.loading ensures that for us.
  }, [books.loading]); // eslint-disable-line

  if (!props.show || books.loading) {
    return null;
  }

  // This causes two re-renders, one for settign filter,
  // second for when the useQuery() loads.
  const refetchQuery = (genre) => {
    setFilter(genre);
    if (genre === "all") return books.refetch({ genre: undefined });
    return books.refetch({ genre });
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{filter}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(allGenres).map((genre) => (
          <button key={genre} onClick={() => refetchQuery(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
