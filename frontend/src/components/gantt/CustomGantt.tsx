import { Task, ViewMode, Gantt } from "gantt-task-react";
import React, { useEffect, useState } from "react";
import useStore from "../../state/taskStore";
import { convertNodes } from '../../utils/helpers'
import { useRecoilState } from "recoil";
import taskListAtom from "../../state/taskList";

const currentDate = new Date();
const taskPlaceholder: Task[] = [
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    //     name: "Some Project",
    //     id: "ProjectSample",
    //     progress: 25,
    //     type: "project",
    //     hideChildren: false,
    //     displayOrder: 1,
    // },
    {
        start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        end: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            2,
            12,
            28
        ),
        name: "Idea",
        id: "Task 0",
        progress: 45,
        type: "task",
        //project: "ProjectSample",
        displayOrder: 2,
    }
    // ,
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
    //     name: "Research",
    //     id: "Task 1",
    //     progress: 25,
    //     dependencies: ["Task 0"],
    //     type: "task",
    //     project: "ProjectSample",
    //     displayOrder: 3,
    // },
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
    //     name: "Discussion with team",
    //     id: "Task 2",
    //     progress: 10,
    //     dependencies: ["Task 1"],
    //     type: "task",
    //     project: "ProjectSample",
    //     displayOrder: 4,
    // },
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
    //     name: "Developing",
    //     id: "Task 3",
    //     progress: 2,
    //     dependencies: ["Task 2"],
    //     type: "task",
    //     project: "ProjectSample",
    //     displayOrder: 5,
    // },
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
    //     name: "Review",
    //     id: "Task 4",
    //     type: "task",
    //     progress: 70,
    //     dependencies: ["Task 2","Task 1"],
    //     project: "ProjectSample",
    //     displayOrder: 6,
    // },
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    //     name: "Release",
    //     id: "Task 6",
    //     progress: currentDate.getMonth(),
    //     type: "milestone",
    //     dependencies: ["Task 4"],
    //     project: "ProjectSample",
    //     displayOrder: 7,
    // },
    // {
    //     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    //     end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
    //     name: "Party Time",
    //     id: "Task 9",
    //     progress: 0,
    //     isDisabled: true,
    //     type: "task",
    // },
];

type CustomGanttProps = {
    removeNodeAction: (activity: any) => void;
    updateNodeAction: (activity: any) => void;
};
const CustomGantt: React.FC<CustomGanttProps> = ({ removeNodeAction,updateNodeAction }) => {
    const [view] = React.useState<ViewMode>(ViewMode.Day);
    const [ganttData, setGanttData] = useState(taskPlaceholder);
    const [isChecked] = React.useState(true);
    const { nodes,edges } = useStore();
    const [text,] = useRecoilState(taskListAtom);


    let columnWidth = 65;
    if (view === ViewMode.Year) {
        columnWidth = 350;
    } else if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskChange = (task: Task) => {
        let newTasks = ganttData.map(t => (t.id === task.id ? task : t));
        // code to update project / milestones
        // if (task.project) {
        //     const [start, end] = getStartEndDateForProject(newTasks, task.project);
        //     const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
        //     if (
        //         project.start.getTime() !== start.getTime() ||
        //         project.end.getTime() !== end.getTime()
        //     ) {
        //         const changedProject = { ...project, start, end };
        //         newTasks = newTasks.map(t =>
        //             t.id === task.project ? changedProject : t
        //         );
        //     }
        // }
        updateNodeAction({id:task.id, title:task.name,startDate:task.start.toISOString().slice(0, 10),endDate:task.end.toISOString().slice(0, 10)})
        setGanttData(newTasks);
    };

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            removeNodeAction({id:`${task.id}`})
        }
        return conf;
    };

    const handleProgressChange = async (task: Task) => {
        setGanttData(ganttData.map(t => (t.id === task.id ? task : t)));
    };

    const handleDblClick = (_task: Task) => {
    };

    const handleClick = (_task: Task) => {
    };

    const handleSelect = (_task: Task, _isSelected: boolean) => {
    };

    const handleExpanderClick = (task: Task) => {
        setGanttData(ganttData.map(t => (t.id === task.id ? task : t)));
    };

    useEffect(() => {
            setGanttData(nodes.length != 0 ? convertNodes(nodes,edges) : taskPlaceholder)
    }, [nodes, text,edges])

    return (
        <>
            <Gantt
                tasks={ganttData}
                viewMode={view}
                onDateChange={handleTaskChange}
                onDelete={handleTaskDelete}
                onProgressChange={handleProgressChange}
                onDoubleClick={handleDblClick}
                onClick={handleClick}
                onSelect={handleSelect}
                onExpanderClick={handleExpanderClick}
                listCellWidth={isChecked ? "155px" : ""}
                columnWidth={columnWidth}
            />

        </>
    )
}

export default CustomGantt