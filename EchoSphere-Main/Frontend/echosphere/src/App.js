// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Layout from './Components/Layout'; // Assuming Layout contains GoogleTranslate
import Dashboard from './Components/Dashboard/Components/Dashboard';
import DashboardAdmin from './Components/Dashboard/Components/DashboardAdmin';
import Status from './Components/Dashboard/Components/Status';
import Task from './Components/Dashboard/Components/Task';
import Review from './Components/Dashboard/Components/Review';
import Lodge from './Components/Dashboard/Components/Lodge';

const App = () => {
  return (
    <Router>
      <Routes> {/* Wrap Routes around Route components */}
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        {/* <Route path="/wlogin" element={<Layout><PrivateRoute component={Worker_Login} /></Layout>} />*/}
        <Route path="/register" element={<Layout><SignUp /></Layout>} />
        {/* PrivateRoute equivalent */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboardadmin" element={<Layout><DashboardAdmin /></Layout>} />
        <Route path="/status" element={<Layout><Status /></Layout>} />
        <Route path="/task" element={<Layout><Task /></Layout>} />
        <Route path="/grievance" element={<Layout><Review /></Layout>} />
        <Route path="/lodge" element={<Layout><Lodge /></Layout>} />
        {/* <Route path="/worker" element={<Layout><PrivateRoute component={WorkerDashboard} /></Layout>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
