/* eslint-disable no-useless-computed-key */
import React from 'react';
import cn from 'classnames';
import { useSetCurrentLocation } from 'hooks';
import useTaskRefs from './hooks/useTaskRefs';
import TagContextProvider from './TaskForm/contexts/TagContext';
import TimeContextProvider from './TaskForm/contexts/TimeContext';
import TaskForm from './TaskForm/taskForm/TaskForm';
import TaskListView from './TaskListView/TaskListView';
import ControlButtons from './TaskListView/ControlButtons/ControlButtons';
import useFetchAllTasks from 'pages/tasks/hooks/useFetchAllTasks';

import styles from './TaskPage.module.css';

const TaskPage = ({ match }) => {
  const taskId = match?.params?.id;

  useSetCurrentLocation(`/task/${taskId}`);
  const [t, setTasks] = React.useState([]);
  const tasks = t.items;
  useFetchAllTasks(setTasks);
  const refs = useTaskRefs(tasks);

  return (
    <TagContextProvider>
      <TimeContextProvider>
        <div className={styles.container} data-testid="container">
          <div className={styles.navBarInnerContainer}>
            <ControlButtons tasks={tasks} />
          </div>
          <div className={styles.mainInnerContainer}>
            <TaskListView
              tasks={tasks}
              setTasks={setTasks}
              refs={refs}
              className={cn(styles.listView, {
                [styles.listViewAndTask]: taskId
              }
              )} />
            {(taskId)
              ? <TaskForm
                taskId={taskId}
                className={styles.form}
                data-testid="addTaskForm"
              />
              : <div className={styles.form}></div>}
          </div>
        </div>
      </TimeContextProvider>
    </TagContextProvider>
  );
};

export default TaskPage;
