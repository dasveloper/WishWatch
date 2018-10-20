import React from "react";
import Profile from "./DashboardPanels/Profile";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.timer = this.timer.bind(this);
  }
 
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="container dashboard-page">
        <div className="dashboard-sidebar">
          <span className="sidebar-section-header">Account</span>
          <a className="sidebar-link active">Profile</a>
          <a className="sidebar-link">Billing</a>
          <span className="sidebar-section-header">Setup</span>
          <a className="sidebar-link">Products</a>
          <a className="sidebar-link">Offers</a>
          <span className="sidebar-section-header">Analytics</span>

          <a className="sidebar-link">Products</a>
          <a className="sidebar-link">Offers</a>
          <span className="sidebar-section-header">Support</span>

          <a className="sidebar-link">Contact</a>
        </div>
        <div className="dashboard-wrapper">
          <div className="dashboard-panel">
            <Profile />
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
