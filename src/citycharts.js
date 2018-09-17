import React from "react";
import ReactHighCharts from "react-highcharts";

class CityCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalCitiesList: this.props.originalCitiesList,
      orderedTop1000Cities: "",
      orderedTotalPopulationByState: "",
      showTop1000Graph: false,
      showTotalPopByStateGraph: false
    };

    this.totalNumberOfCitiesByState = this.totalNumberOfCitiesByState.bind(
      this
    );
    this.totalPopulationByState = this.totalPopulationByState.bind(this);
  }

  totalNumberOfCitiesByState() {
    this.setState({ showTop1000Graph: true });
    let resultObject = {};
    let myArray = [];
    this.props.originalCitiesList.forEach(item => {
      // if (myArray.includes(item.state)) {
      //   myArray[item.state] = myArray[item.state] + 1;
      // } else {
      //   myArray.push(item.state);
      // }

      // let state = item.state;
      // myArray[state] ? myArray[state]++ : myArray.push(state) + 1;

      if (isNaN(resultObject[item.state])) {
        resultObject[item.state] = 0;
      } else {
        resultObject[item.state] += 1;
      }
    });

    // return myArray.sort(function(a, b) {
    //   if (a > b) return 1;
    //   else if (a < b) return -1;
    //   return 0;
    // });

    // myArray.push(resultObject);
    // console.log(myArray);

    // myArray.sort(function(a, b) {
    //   return a[1] > b[1];
    // });

    // myArray=(...resultObject).sort(function(a, b) {
    //   return a[1] > b[1];
    // });
    // console.log(myArray);

    console.log(resultObject);
    for (let i = 0; i < resultObject.length; i++) {
      myArray[i].push(resultObject[i]);
    }

    console.log(myArray);
    this.setState({ orderedTop1000Cities: myArray });
  }

  totalPopulationByState() {
    this.setState({ showTotalPopByStateGraph: true });
    // this.setState({ orderedTotalPopulationByState: myArray });
  }

  render() {
    console.log(this.state.orderedTop1000Cities);
    // let orderedTop1000Cities = this.state.orderedTop1000Cities.map(item => {
    //   return [item.state, item.amount];
    // });
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
          data: this.state.orderedTop1000Cities
        }
      ]
    };
    return (
      <div>
        <button type="button" id="" onClick={this.totalNumberOfCitiesByState}>
          Graph the number of top 1000 cities per state
        </button>
        <br />
        <button type="button" id="" onClick={this.totalPopulationByState}>
          Graph the total population of all states
        </button>

        <div id="chartByNum">
          {this.state.showTop1000Graph ? (
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
