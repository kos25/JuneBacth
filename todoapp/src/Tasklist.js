import React from "react";
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
} from "semantic-ui-react";
export const TaskList = (props) => {
  return (
    <div>
      <Sidebar as={Menu} inverted vertical visible={true} width="thin">
        <Menu.Item as="a">
          <h1>2DoApp</h1>
        </Menu.Item>
        <Menu.Item as="a">
          <h3>TaskList</h3>
        </Menu.Item>

        {props.List.map(function (list, index) {
          return (
            <Menu.Item
              as="a"
              onClick={() => props.gettask(list)}
              active={list.name == props.currentList.name}
            >
              {list.name}
            </Menu.Item>
          );
        })}

        <br />
        <Modal trigger={<Button color="green">Add TaskList</Button>}>
          <Modal.Content>
            <Modal.Description>
              <Header>Add Ctaogery of Task</Header>
              <Input
                name="NewTaskList"
                fluid
                placeholder="Add task list Ex : work , home...."
                onChange={props.Updatetext}
              />
              <br />
              <Button
                color="green"
                onClick={() =>
                  props.createnewEntity("tasklist", props.currentList)
                }
              >
                Click To Add
              </Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Sidebar>
    </div>
  );
};
