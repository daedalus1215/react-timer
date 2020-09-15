import { useContext } from 'react';
import { TaskEditFormContext } from 'pages/home/contexts/TaskEditFormContext';

const useTaskContext = () => useContext(TaskEditFormContext);

const useTaskEditContext = () => {
    const {
        state,
        dispatch,
        onProjectDropDownChange,
        onTextAreaChange,
        onTagChange,
    } = useTaskContext();

    return {
        state,
        dispatch,
        onProjectDropDownChange,
        onTextAreaChange,
        onTagChange,
    };
};

export default useTaskEditContext;
