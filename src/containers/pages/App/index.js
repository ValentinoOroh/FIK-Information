import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from '../Dashboard';
import Login from '../Login';
import { Provider } from 'react-redux';
import {store} from '../../../config/redux';
import News from '../News';






function App() {
  return (
    <div>
      
    <Provider store={store}>
      <Router>
        
      <div>
        <Route path ="/" exact component={News} />
        <Route path ="/News" component={News} />
        <Route path ="/Announcement" component= {Dashboard} />
      </div>
    </Router>
    </Provider>
    </div>
    
  );
}

export default App;
