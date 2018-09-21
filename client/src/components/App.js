import React from "react";
//import Header from "./Header"
import { BrowserRouter, Route } from "react-router-dom";
import Header from './Header';
import Landing from './Landing';


const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>

          <Header />
          <Route  path="/" component={Landing} />
          {/*<Route exact path="/surveys" component={Dashboard} /> */}
          {/*<Route path="/surveys/new" component={SurveyNew} />*/}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
