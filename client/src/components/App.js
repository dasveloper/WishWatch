import React from "react";
//import Header from "./Header"
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";

//import Header from './Header';
//const Dashboard = () => <h2>Dashboard</h2>;
//const SurveyNew = () => <h2>SurveyNew</h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          {/*<Header />*/}
          <Route path="/" component={Landing} />
          {/*<Route exact path="/surveys" component={Dashboard} /> */}
          {/*<Route path="/surveys/new" component={SurveyNew} />*/}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
