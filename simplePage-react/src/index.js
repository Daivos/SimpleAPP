import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

var NoMatch = (props) =>{
  return <div>Route did not match</div>;
}

ReactDOM.render((

  <HashRouter>
    <Switch>
        <Route path="/" component={App}/>
        <Route path="*" component={NoMatch}/>
    </Switch>
  </HashRouter>), 
  document.getElementById('root')
);

