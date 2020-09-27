import React, { Component } from "react";

export class Draggable extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    // this.setState({ tasks: config.demoTasks });
  }

  onDragStart = (ev, id, position) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("position", position);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
    ev.currentTarget.style.border = "dashed";
  };

  onDragLeave = (ev) => {
    ev.preventDefault();
    ev.currentTarget.style.border = "none";
  };

  onDrop = (ev, cat, newPosition) => {
    let id = ev.dataTransfer.getData("id");
    let position = ev.dataTransfer.getData("position");
    console.log("onDrop", ev, cat, newPosition);

    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        if (task.category !== cat) {
          task.category = cat;
        } else {
          let temp = task.position;
          task.position = newPosition;
          position = temp;
          console.log("switched ", position, newPosition);
        }
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks,
    });
    ev.currentTarget.style.border = "none";
  };

  render() {
    return (
      <div className="container-drag">
        <div className="columns-container">
            {/* {this.props.children 
            // onDragStart={this.onDragStart}
            //  onDragOver={this.onDragOver}
            //  onDragLeave={this.onDragLeave}
            //  onDrop={this.onDrop}
            } */}
          {/* {config.columns &&
            config.columns.map((col, index) => (
              <Column
                key={index}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                title={col}
                tasks={tasks[col]}
              />
            ))} */}
        </div>
      </div>
    );
  }
}