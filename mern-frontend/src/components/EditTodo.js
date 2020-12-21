import React, { Component, Fragment } from "react";
import axios from "axios";

export class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_description: "",
      todo_responsible: "",
      todo_priority: "",
      todo_completed: "",
      loading: false,
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`http://localhost:4000/todos/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          todo_description: res.data.todo_description,
          todo_responsible: res.data.todo_responsible,
          todo_priority: res.data.todo_priority,
          todo_completed: res.data.todo_completed,
        });
      })
      .catch((error) => console.log(console.error));
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    let body = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_completed: this.state.todo_completed,
      todo_priority: this.state.todo_priority,
    };
    axios
      .post(
        `http://localhost:4000/todos/update/${this.props.match.params.id}`,
        body
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            loading: false,
          });
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="upper-form-container">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputdesc" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputdesc"
                      name="todo_description"
                      value={this.state.todo_description}
                      onChange={(e) => this.changeHandler(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputresp" className="form-label">
                      Responsible
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputresp"
                      name="todo_responsible"
                      value={this.state.todo_responsible}
                      onChange={(e) => this.changeHandler(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inpupriority" className="form-label">
                      Priority
                    </label>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="low"
                        value="Low"
                        name="todo_priority"
                        checked={
                          this.state.todo_priority === "Low" ? true : false
                        }
                        onChange={(e) => this.changeHandler(e)}
                      />
                      <label className="form-check-label" for="low">
                        Low
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="medium"
                        value="Medium"
                        name="todo_priority"
                        checked={
                          this.state.todo_priority === "Medium" ? true : false
                        }
                        onChange={(e) => this.changeHandler(e)}
                      />
                      <label className="form-check-label" for="medium">
                        Medium
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="high"
                        value="High"
                        name="todo_priority"
                        checked={
                          this.state.todo_priority === "High" ? true : false
                        }
                        onChange={(e) => this.changeHandler(e)}
                      />
                      <label className="form-check-label" for="high">
                        High
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label for="inputcomplete" className="form-label">
                      Completed
                    </label>
                    <br />
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="yes"
                        value="1"
                        name="todo_completed"
                        checked={this.state.todo_completed == 1 ? true : false}
                        onChange={(e) => this.changeHandler(e)}
                      />
                      <label className="form-check-label" for="yes">
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="no"
                        value="0"
                        name="todo_completed"
                        checked={this.state.todo_completed == 0 ? true : false}
                        onChange={(e) => this.changeHandler(e)}
                      />
                      <label className="form-check-label" for="no">
                        No
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={(e) => this.submitHandler(e)}
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <Fragment>
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          &nbsp;&nbsp; Submitting...
                        </Fragment>
                      ) : (
                        <Fragment>Submit</Fragment>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditTodo;
