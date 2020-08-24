import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { LoadinSpinner, FlashMessage } from 'components';
import TagPage from './pages/tags/TagPage';
import AddTagPage from './pages/tags/AddTagPage/AddTagPage';
import CreateOrEditTaskPage from 'pages/home/CreateOrEditTaskPage';
import TaskEditFormContextProvider from './pages/home/hooks/TaskEditFormContext';
import LoadinSpinnerContextProvider from './contexts/LoadinSpinnerContext';
import FlashMessageContextProvider from './contexts/FlashMessageContext';
import './Main.css';

const Main = () => {
  return (
    <FlashMessageContextProvider>
      <LoadinSpinnerContextProvider>
        <TaskEditFormContextProvider>
          <HashRouter>
            <div className="content">
              <FlashMessage />
              <Route
                exact
                path="/"
                render={props => <CreateOrEditTaskPage {...props} />}
              />
              <Route
                exact
                path="/:id"
                render={props => <CreateOrEditTaskPage {...props} />}
              />
              <Route
                exact
                path="/task/:id"
                render={props => <CreateOrEditTaskPage {...props} />}
              />
              <Route
                exact
                path="/tags/"
                render={props => <TagPage {...props} />}
              />
              <Route
                exact
                path="/tag/:id"
                render={props => <AddTagPage {...props} />}
              />
              <Route
                exact
                path="/tags/:id"
                render={props => <AddTagPage {...props} />}
              />
              <LoadinSpinner />
            </div>
          </HashRouter>
        </TaskEditFormContextProvider>
      </LoadinSpinnerContextProvider>
    </FlashMessageContextProvider>
  );
};

export default Main;
