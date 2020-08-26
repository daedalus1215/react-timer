import React, { useState } from 'react';
import TagContextProvider from './TaskForm/contexts/TagContext';
import TimeContextProvider from './TaskForm/contexts/TimeContext';
import AddTaskForm from './TaskForm/form/AddTaskForm';
import TaskListView from './TaskListView/TaskListView';
import ControlButtons from './TaskListView/ControlButtons/ControlButtons';
import useFetchAllTasks from './TaskListView/useFetchAllTasks';
import styles from './CreateOrEditTaskPage.module.css';

const CreateOrEditTaskPage = ({ match }) => {
  const taskId = match?.params?.id;
  const [tasks, setTasks] = useState([]);
  useFetchAllTasks(setTasks);

  return (
    <TagContextProvider>
      <TimeContextProvider>
        <div className={styles.container}>
          {/* Need to make a leftInnerContainer */}
          <div className={styles.navBarInnerContainer}>
            <ControlButtons tasks={tasks} />
          </div>
          <div className={styles.mainInnerContainer}>
            <TaskListView className={styles.listView} taskId={taskId} tasks={tasks} />
            <AddTaskForm taskId={taskId} className={styles.form} />
          </div>
        </div>
      </TimeContextProvider>
    </TagContextProvider>
  );
};

export default CreateOrEditTaskPage;