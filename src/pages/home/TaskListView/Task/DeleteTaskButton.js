import React from "react";
import cn from 'classnames';
import useTaskEditContext from 'hooks/useTaskEditContext';
import style from './Task.module.css';

const DeleteTaskButton = ({ taskId }) => {
  const { setMessage } = useTaskEditContext();

  const _deleteClick = async e => {
    //@TODO: Could add loading here
    e.preventDefault();
    await fetch(`/api/task/${taskId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() =>
        setTimeout(() => {
          //@TODO: Message is not working cux of reload, but we want to push
          //@TODO: back to homepage to resolve this
          setMessage(`Successfully Deleted Task with id of ${taskId}`);
          window.location.reload();
        }, 500)
      );
  };

  return (
    <button
      onClick={_deleteClick}
      className={cn(style.taskItemDeleteBtn, "glyphicon glyphicon-remove")}
      data-test-id="delete-task-button"
    />
  );
};

export default DeleteTaskButton;
