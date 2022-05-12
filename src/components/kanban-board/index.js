import React, { useState } from "react";
import "./index.css";

function KanbanBoard() {
  const stageNames = ["Backlog", "To Do", "Ongoing", "Done"];

  const [tasks, setTasks] = useState([
    { name: '1', stage: 0 }
  ]);

  const [inputItem, setInputItem] = useState("");

  let stagesTasks = [];

  for (let i = 0; i < stageNames.length; i++) {
    stagesTasks.push([]);
  }

  for (let task of tasks) {
    const stageId = task.stage;
    stagesTasks[stageId].push(task);
  }

  function taskHandler(){
    setTasks([...tasks,{name:inputItem,stage:0}]);
    setInputItem("")
  }

  function deleteHandler(itemName){
   const newTask = tasks.filter(item => item.name !== itemName )
   setTasks(newTask);
  }

  function moveForwardHandler(itemName){
    const newTask = tasks.map(item => {
      if(item.name === itemName){
        if(item.stage >=0 && item.stage<3){
          return {...item,stage: item.stage + 1}
        }
        return item;
      }
      else{
        return item;
      }
    })
      setTasks(newTask);
  }

  function moveBackWardHandler(itemName){
    const newTask = tasks.map(item => {
      if(item.name === itemName){
        if(item.stage >0 && item.stage<=3){
          return {...item,stage: item.stage - 1}
        }
        return item;
      }
      else{
        return item;
      }
    })
      setTasks(newTask);
  }

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <section className="mt-50 layout-row align-items-center justify-content-center">
        <input
          id="create-task-input"
          type="text"
          className="large"
          placeholder="New task name"
          data-testid="create-task-input"
          value={inputItem}
          onChange = {(e)=> setInputItem(e.target.value)}
        />
        <button
          type="submit"
          className="ml-30"
          data-testid="create-task-button"
          onClick={taskHandler}
        >
          Create task
        </button>
      </section>

      <div className="mt-50 layout-row">
        {stagesTasks.map((task, i) => {
          return (
            <div className="card outlined ml-20 mt-0" key={`${i}`}>
              <div className="card-text">
                <h4>{stageNames[i]}</h4>
                <ul className="styled mt-50" data-testid={`stage-${i}`}>
                  {task.map((item, index) => {
                    return (
                      <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="li-content layout-row justify-content-between align-items-center">
                          <span
                            data-testid={`${item.name
                              .split(" ")
                              .join("-")}-name`}
                          >
                            {item.name}
                          </span>
                          <div className="icons">
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${item.name
                                .split(" ")
                                .join("-")}-back`}
                            >
                              <i className="material-icons" onClick={()=>moveBackWardHandler(item.name)}>arrow_back</i>
                            </button>
                            <button
                              className="icon-only x-small mx-2"
                              data-testid={`${item.name
                                .split(" ")
                                .join("-")}-forward`}
                            >
                              <i className="material-icons" onClick={()=>moveForwardHandler(item.name)}>arrow_forward</i>
                            </button>
                            <button
                              className="icon-only danger x-small mx-2"
                              data-testid={`${item.name
                                .split(" ")
                                .join("-")}-delete`}
                            >
                              <i className="material-icons" onClick={()=>deleteHandler(item.name)}>delete</i>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KanbanBoard;

// export default class KanbanBoard extends Component {
//   constructor() {
//     super();
//     // Each task is uniquely identified by its name.
//     // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
//     this.state = {
//       tasks: [
//             { name: '1', stage: 0 },
//             { name: '2', stage: 0 },
//         ]
//     };
//     this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
//   }

//   render() {
//     const { tasks } = this.state;

//     let stagesTasks = [];
//     for (let i = 0; i < this.stagesNames.length; ++i) {
//       stagesTasks.push([]);
//     }
//     for (let task of tasks) {
//       const stageId = task.stage;
//       stagesTasks[stageId].push(task);
//     }

/*
stageTasks = [
              [
                { name: '1', stage: 0 },
//              { name: '2', stage: 0 }
              ],
              [],
              [],
              []
            ]
*/

//     return (
//       <div className="mt-20 layout-column justify-content-center align-items-center">
//         <section className="mt-50 layout-row align-items-center justify-content-center">
//           <input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>
//           <button type="submit" className="ml-30" data-testid="create-task-button">Create task</button>
//         </section>

//         <div className="mt-50 layout-row">
//             {stagesTasks.map((tasks, i) => {
//                 return (
//                     <div className="card outlined ml-20 mt-0" key={`${i}`}>
//                         <div className="card-text">
//                             <h4>{this.stagesNames[i]}</h4>
//                             <ul className="styled mt-50" data-testid={`stage-${i}`}>
//                                 {tasks.map((task, index) => {
//                                     return <li className="slide-up-fade-in" key={`${i}${index}`}>
//                                       <div className="li-content layout-row justify-content-between align-items-center">
//                                         <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
//                                         <div className="icons">
//                                           <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`}>
//                                             <i className="material-icons">arrow_back</i>
//                                           </button>
//                                           <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`}>
//                                             <i className="material-icons">arrow_forward</i>
//                                           </button>
//                                           <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`}>
//                                             <i className="material-icons">delete</i>
//                                           </button>
//                                         </div>
//                                       </div>
//                                     </li>
//                                 })}
//                             </ul>
//                         </div>
//                     </div>
//                 )
//             })}
//         </div>
//       </div>
//     );
//   }
// }
