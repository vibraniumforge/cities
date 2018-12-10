import React from "react";
import ReactHighCharts from "react-highcharts";

class CityCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTotalCitiesByStateGraph: false,
      showTotalPopByStateGraph: false,
      data: [[1, 1], [2, 2]]
    };

    this.totalCitiesByState = this.totalCitiesByState.bind(this);
    this.totalPopulationByState = this.totalPopulationByState.bind(this);
  }

  totalCitiesByState() {
    this.setState({ showTotalCitiesByStateGraph: true });
  }

  totalPopulationByState() {
    this.setState({ showTotalPopByStateGraph: true });
  }

  render() {
    // let orderedTop1000Cities = this.state.orderedTop1000Cities.map(item => {
    //   return [item.state, item.amount];
    // });
    console.log(this.props.totalCitiesByState);
    const config = {
      title: {
        text: "Top 1000 cities per state"
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "State"
        }
      },
      yAxis: {
        title: {
          text: "Number of Cities"
        }
      },
      series: [
        {
          type: "area",
          // data: [[1, 1], [2, 2]]

          data: this.props.totalCitiesByState
          // data: this.state.data
        }
      ]
    };
    return (
      <div>
        <button type="button" id="" onClick={this.totalCitiesByState}>
          Graph the number of top 1000 cities per state
        </button>
        <br />
        <button type="button" id="" onClick={this.totalPopulationByState}>
          Graph the total population per state
        </button>

        <div id="chartByNum">
          {this.state.showTotalCitiesByStateGraph ? (
            <ReactHighCharts config={config} ref="chart" />
          ) : null}
        </div>
        <div id="chartByPop">
          {this.state.showTotalPopByStateGraph ? (
            <ReactHighCharts config={config} ref="chart" />
          ) : null}
        </div>
      </div>
    );
  }
}

export default CityCharts;
