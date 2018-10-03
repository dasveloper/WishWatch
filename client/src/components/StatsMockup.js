import React from "react";

import ChartistGraph from "react-chartist";

var lineChartData = {
  series: [[5, 9, 7, 8, 5, 4]]
};
var lineChartOptions = {
  low: 0,
  height: 100,
  showArea: true,
  showLine: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0
  }
};

class ProdBlockMockups extends React.Component {
  render() {
    return (
        <div className={`stats-base ${this.props.loaded ? "loaded" : ""}`}>
          <div className="stats-watching">
            <div className="stats-column">
              <p className="watching-title">Watching</p>
              <p className="watching-count">120</p>
              <p className="watching-change up">20%</p>
            </div>
            <div className="stats-column">
              <p className="watching-title">Unwatched</p>
              <p className="watching-count">15</p>
              <p className="watching-change down">8%</p>
            </div>
          </div>
          <div className="stats-chart">
            <ChartistGraph
              data={lineChartData}
              options={lineChartOptions}
              type={"Line"}
            />
          </div>
          <div className="stats-offers">
            <div className="stats-column">
              <p className="offers-title">20OFF</p>
              <p className="offers-count">12/120</p>
            </div>
            <div className="stats-column">
              <p className="offers-title">BOGOTODAY</p>
              <p className="offers-count">64/120</p>
            </div>
          </div>
          <div className="stats-base-row">
            <div className="stats-dummy-header" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
          </div>
          <div className="stats-base-row">
            <div className="stats-dummy-header" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
          </div>
          <div className="stats-base-row">
            <div className="stats-dummy-header" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
          </div>
          <div className="stats-base-row">
            <div className="stats-dummy-header" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
          </div>
          <div className="stats-base-row">
            <div className="stats-dummy-header" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
            <div className="stats-dummy-line" />
          </div>
        </div>
    );
  }
}
export default ProdBlockMockups;
