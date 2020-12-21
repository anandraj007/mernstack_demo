import "./App.css";
import { Route } from "react-router-dom";
import ViewTodos from "./components/ViewTodos";
import { Fragment } from "react";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <Fragment>
      <div className="text-center mb-5 mt-5">MERN STACK TODOS</div>
      <hr />
      <Route path="/" exact component={ViewTodos} />
      <Route path="/edit/:id" exact component={EditTodo} />
    </Fragment>
  );
}

export default App;
