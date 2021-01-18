import { EditDateTimeInterface } from 'interfaces/pages/tasks/Task';
import { useDispatch } from 'react-redux';
import { putDateTime } from 'redux/actionCreators/actions';

interface SubmitProp {
  id: string;
  date: string;
  minutes: string;
}

const useSubmit = (
  dateTime: EditDateTimeInterface,
  taskId: String,
  setIsShowingEditDateTimeForm: (isShowing: boolean) => void,
): ((editDateTime: EditDateTimeInterface) => void) => {
  const dispatch = useDispatch();
  return ({ id, date, minutes }: SubmitProp) => {
    const config = {
      body: {
        id,
        date,
        minutes,
      },
      taskId,
      dateTimeId: dateTime.id,
    };

    dispatch(putDateTime(config));
    setIsShowingEditDateTimeForm(false);
  };
};

export default useSubmit;
