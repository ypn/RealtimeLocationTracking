import React from 'react';
import ReactDOM from'react-dom';
import AdminMaster from './AdminMaster';
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <Router>
    <AdminMaster/>
  </Router>,
  document.getElementById('react-root')
)
