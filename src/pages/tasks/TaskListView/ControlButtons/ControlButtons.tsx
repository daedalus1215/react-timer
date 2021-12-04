import React from 'react';
import DownloadButton from './DownloadButton/DownloadButton';
import NewButton from './NewButton/NewButton';
import styles from './ControlButtons.module.css';
import HomeButton from './HomeButton/HomeButton';
import UploadButton from './UploadButton/UploadButton';

const ControlButtons: React.FC = (tasks: any) => {
  return (
    <div className={styles.controlButtons} data-test-id="control-buttons">
      <HomeButton />
      <DownloadButton tasks={tasks} />
      <UploadButton />
      <NewButton />
    </div>
  );
};

export default ControlButtons;
