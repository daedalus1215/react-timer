import React from 'react';
import { displayMsInFractionalHourFormat } from 'utils';
import useTaskByIdSelector from 'redux/selectors/useTaskByIdSelector';
import DateTimeListView from '../dateTimeListView/DateTimeListView';
import EditDateTimeForm from '../EditDateTimeForm/EditDateTimeForm';
import useFetchTaskByIdDispatch from '../../../hooks/useFetchTaskById/useFetchTaskByIdDispatch';
import styles from './DateTimePage.module.css';

interface DateTimePageProp {
  taskId: string;
  setIsShowing: (isShowing: boolean) => void;
}

const DateTimePage: React.FC<DateTimePageProp> = ({ taskId, setIsShowing }) => {
  const [editDateTime, setEditDateTime] = React.useState({ id: '', date: '', minutes: 0 });
  useFetchTaskByIdDispatch(taskId);
  const { dateTimes, time } = useTaskByIdSelector();
  const millisecondsInFractionalHourFormat = displayMsInFractionalHourFormat(time);

  return (
    <div className={styles.childrenContent}>
      {!editDateTime?.id ? (
        <>
          <DateTimeListView dateTimes={dateTimes} setEditDateTime={setEditDateTime} />
          <div className={styles.dateTimeTotal}> Total: {millisecondsInFractionalHourFormat} hrs</div>
        </>
      ) : (
        <EditDateTimeForm setEditDateTime={setEditDateTime} taskId={taskId} editDateTime={editDateTime} setIsShowing={setIsShowing} />
      )}
    </div>
  );
};

export default DateTimePage;
