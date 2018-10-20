import React from "react";
import Header from "./Header";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing";
import Wishlist from "./Wishlist";
import AddProduct from "./AddProduct";
import Dashboard from "./Dashboard";



const App = () => {
  return (
    <BrowserRouter>
      <div className="master-wrapper">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/add" component={AddProduct} />
        <Route path="/dashboard" component={Dashboard} />

        {/*<Route path="/surveys/new" component={SurveyNew} />*/}
      </div>
    </BrowserRouter>
  );
};

export default App;
