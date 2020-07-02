import React from "react";
import { Checkbox } from "semantic-ui-react";
import {
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Modal,
  Button,
  Input,
  Message,
} from "semantic-ui-react";
export const Task = (props) => {
  return (
    <div style={{ marginLeft: "250px" }}>
      {props.currentList.name === "" && (
        <div>
          <br />
          <br />
          <Message info>
            <Message.Header>You haven't selsected list yet</Message.Header>
            <p>plase select the list from left side pannel</p>
          </Message>
        </div>
      )}

      {props.currentList.name !== "" && (
        <div>
          <br />
          <br />
          <h1>Task Under {props.currentList.name} </h1>
          <br />
          {props.tasks.map(function (task, index) {
            return (
              <div>
                <Checkbox
                  toggle
                  label={task.text}
                  checked={task.Completed}
                  onClick={() => props.updatetask(task.id, props.currentList)}
                />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <Button
                  color="red"
                  onClick={() => props.deleleTask(task.id, props.currentList)}
                >
                  del{" "}
                </Button>
                <br /> <br />
              </div>
            );
          })}
          <Modal trigger={<Button color="green">Add Task</Button>}>
            <Modal.Content>
              <Modal.Description>
                <Header>Add Task</Header>
                <Input
                  name="newTask"
                  fluid
                  placeholder="Add task here Ex Need to apply for leave "
                  onChange={props.Updatetext}
                />
                <br />
                <Button
                  color="green"
                  onClick={() =>
                    props.createnewEntity("task", props.currentList)
                  }
                >
                  Click To Add
                </Button>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      )}
    </div>
  );
};
