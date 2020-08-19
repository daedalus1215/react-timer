import { getFormattedDate } from 'utils';
import useTaskEditContext from 'pages/home/hooks/useTaskEditContext';
import formatTimeContractAndCustomer from './formatTimeContractAndCustomer';

//@TODO: Write a test for this
const useTaskAssembler = (...tasks) => {
    const { projects } = useTaskEditContext();

    const dateFormatted = getFormattedDate(new Date());

    const timeTask = {
        date: dateFormatted
    };

    timeTask.WorkUnit = tasks.map(task =>
        formatTimeContractAndCustomer(task, projects)
    );

    return () => timeTask;
}

export default useTaskAssembler;