import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ViewTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.editRouteHandler = this.editRouteHandler.bind(this);
    this.deleteRouteHandler = this.deleteRouteHandler.bind(this);
  }
  componentDidMount() {
    this.getTodoList();
  }

  editRouteHandler(item) {
    this.props.history.push(`/edit/${item._id}`);
  }

  getTodoList = () => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteRouteHandler(item) {
    axios
      .delete(`http://localhost:4000/todos/delete/${item._id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.getTodoList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <table className="table table-responsive table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Responsible</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.todos.length > 0 ? (
                        <Fragment>
                          {this.state.todos.map(function (todoList, id) {
                            return (
                              <tr key={id}>
                                <td>{todoList._id}</td>
                                <td>{todoList.todo_description}</td>
                                <td>{todoList.todo_priority}</td>
                                <td>{todoList.todo_responsible}</td>
                                <td>
                                  {todoList.todo_completed == 0
                                    ? "Uncomplete"
                                    : "Complete"}
                                </td>
                                <td>
                                  <i
                                    className="lni lni-pencil btn-sm text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={this.editRouteHandler.bind(
                                      this,
                                      todoList
                                    )}
                                  ></i>

                                  <i
                                    className="lni lni-trash btn-sm text-danger"
                                    style={{ cursor: "pointer" }}
                                    onClick={this.deleteRouteHandler.bind(
                                      this,
                                      todoList
                                    )}
                                  ></i>
                                </td>
                              </tr>
                            );
                          }, this)}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <tr>
                            <td colSpan={5}>
                              <center>No Data</center>
                            </td>
                          </tr>
                        </Fragment>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
