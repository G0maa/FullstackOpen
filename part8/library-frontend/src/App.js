import { useSubscription, useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginFrom from "./components/LoginFrom";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);

      const addedBook = subscriptionData.data.bookAdded;
      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          };
        }
      );
    },
  });

  const [page, setPage] = useState("authors");

  // I think you should check first if localstorage has a saved token.
  const [token, setToken] = useState(localStorage.getItem("user-auth"));
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const isLoggedIn = token ? (
    <>
      <button onClick={() => setPage("add")}>add book</button>
      <button onClick={() => setPage("recommend")}>Recommend</button>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <>
      <button onClick={() => setPage("login")}>Login</button>
    </>
  );

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {isLoggedIn}
      </div>

      <Authors show={page === "authors"} isLoggedIn={token !== null} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <LoginFrom show={page === "login"} setToken={setToken} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
