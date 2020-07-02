import "./App.css";
import { Button } from "semantic-ui-react";
import React, { Component } from "react";
import { Task } from "./Task";
import { TaskList } from "./Tasklist";
import axios from "axios";

class App extends Component {
  state = {
    List: [],
    currentList: { id: "", name: "" },
    tasks: [],
  };

  componentDidMount() {
    const gettasklist = "http://127.0.0.1:5000/tasklists";
    axios
      .get(gettasklist)
      .then((res) => {
        console.log(res);
        this.setState({ List: res.data.tasklist });
      })
      .catch((err) => alert(err));
  }

  gettask = (list) => {
    this.setState({ currentList: list });
    const gettasks = "http://127.0.0.1:5000/tasks?task_list=" + list.id;
    axios
      .get(gettasks)
      .then((res) => {
        console.log(res);
        this.setState({ tasks: res.data.task });
      })
      .catch((err) => {
        alert(err);
      });
  };

  Updatetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createnewEntity = (type, list) => {
    const PostTaskListUrl = "http://localhost:5000/tasklists";
    const PostTaskUrl = "http://localhost:5000/tasks";
    const getTask = "http://localhost:5000/tasks?task_list=" + list.id;

    if (type == "tasklist") {
      axios
        .post(PostTaskListUrl, { name: this.state.NewTaskList })
        .then((res) => {
          axios
            .get(PostTaskListUrl)
            .then((res) => {
              console.log(res);
              this.setState({ List: res.data.tasklist });
            })
            .catch((err) => alert(err));
        })
        .catch((err) => alert(err));
    } else {
      axios
        .post(PostTaskUrl, { text: this.state.newTask, list_id: list.id })
        .then((res) => {
          axios
            .get(getTask)
            .then((res) => {
              console.log(res);
              this.setState({ tasks: res.data.task });
            })
            .catch((err) => {
              alert(err);
            });
        })
        .catch((err) => alert(err));
    }
  };

  updatetask = (id, list) => {
    const updateTaskUrl = "http://localhost:5000/tasks/" + id;
    const getTask = "http://localhost:5000/tasks?task_list=" + list.id;
    axios
      .put(updateTaskUrl)
      .then((res) => {
        axios
          .get(getTask)
          .then((res) => {
            console.log(res);
            this.setState({ tasks: res.data.task });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => alert(err));
  };

  deleleTask = (id, list) => {
    alert("do You really want  to delet the task");
    const deleteTaskUrl = "http://127.0.0.1:5000/tasks/" + id;
    const taskURL = "http://127.0.0.1:5000/tasks?task_list=" + list.id;
    axios
      .delete(deleteTaskUrl)
      .then((res) => {
        alert("task has been deleted sucessfully");
        axios
          .get(taskURL)
          .then((res) => {
            this.setState({ tasks: res.data.task });
          })
          .catch((err) => alert(err));
      })
      .catch((err) => alert(err));
  };

  render() {
    return (
      <div className="App">
        <TaskList
          List={this.state.List}
          gettask={this.gettask}
          currentList={this.state.currentList}
          Updatetext={this.Updatetext}
          createnewEntity={this.createnewEntity}
        />
        <Task
          currentList={this.state.currentList}
          tasks={this.state.tasks}
          Updatetext={this.Updatetext}
          createnewEntity={this.createnewEntity}
          updatetask={this.updatetask}
          deleleTask={this.deleleTask}
        />
      </div>
    );
  }
}

export default App;
