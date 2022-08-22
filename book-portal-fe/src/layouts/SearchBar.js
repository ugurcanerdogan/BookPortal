import { useEffect, useState } from "react";
import { Search } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BookService from "../services/BookService";
import UserService from "../services/UserService";
import AuthorService from "../services/AuthorService";
import bookPicture from "../assets/bookImage.png";
import userPicture from "../assets/userImage.png";
import authorPicture from "../assets/authorImage.png";
import { useApiProgress } from "../utilities/apiProgress";

const SearchBar = () => {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const { loggedInUsername } = useSelector(state => state.auth);
  const { push } = useHistory();
  const { t } = useTranslation();
  const bookService = new BookService();
  const userService = new UserService();
  const authorService = new AuthorService();
  const bookPendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/books/all-by-contains-title?bookTitle=");
  const userPendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/users/all-by-contains-name?name=");
  const authorPendingApiCall = useApiProgress("get", "http://localhost:8080/api/v1/authors/all-by-contains-name?authorName=");
  const pendingApiCall = bookPendingApiCall || userPendingApiCall || authorPendingApiCall;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (searchItem) => {
    try {
      if (searchItem.length > 1) {
        setResults([]);
        let searchResults = {};
        let tempList = [];
        let bookResults = await bookService.getBookWithTitle(searchItem);
        bookResults.data.map(book => {
          tempList.push({
            title: book.title,
            category: "book",
            description: book.publisher,
            isbn: book.isbn,
            image: bookPicture
          });
        });
        if (tempList.length !== 0) {
          searchResults["books"] = ({ name: "books", results: tempList });
        }
        let tempList2 = [];
        let userResults = await userService.getUsersWithName(searchItem);
        userResults.data.map(user => {
          tempList2.push({ title: user.name, category: "user", description: user.username, image: userPicture });
        });
        if (tempList2.length !== 0) {
          searchResults["users"] = ({ name: "users", results: tempList2 });
        }
        let tempList3 = [];
        let authorResults = await authorService.getAuthorsWithName(searchItem);
        authorResults.data.map(author => {
          tempList3.push({ title: author.name, category: "author", description: author.email, image: authorPicture });
        });
        if (tempList3.length !== 0) {
          searchResults["authors"] = ({ name: "authors", results: tempList3 });
        }
        setResults(searchResults);
      }
    } catch (e) {
    }
  };

  const handleResultSelect = (e, { result }) => {
    setValue(result.title);
    switch (result.category) {
      case "book":
        push(`/books/view/${result.isbn}`);
        break;
      case "user":
        push(`/users/view/${result.description}`);
        break;
      case "author":
        push(`/authors/view/${result.title}`);
        break;
      default:
        return;
    }
  };

  const handleSearchChange = e => {
    let value = e.target.value;
    setValue(value);
    loadUsers(value, loggedInUsername);
  };

  return (
    <div className="fluid" style={{ marginLeft: "1em", marginTop: "1em" }}>
      <Search
        category
        loading={pendingApiCall}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        noResultsMessage={!pendingApiCall && t("No result found.")}
        results={results}
        value={value}
      />
    </div>
  );
};

export default SearchBar;