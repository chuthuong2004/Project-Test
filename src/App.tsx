import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import config from './config';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import { DefaultLayout } from './layouts';
const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route
          path={config.routes.home}
          element={<Navigate to={config.routes.dashboard} replace />}
        />
        {routes.map((route, index) => {
          const Page = route.component;
          let Layout: any = DefaultLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};
export default App;
