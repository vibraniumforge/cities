import React from "react";

class CityDetail extends React.Component {
  render() {
    return (
      <div>
        <p>City Rank: {this.props.rank}</p>
        <p>City Name: {this.props.city}</p>
        <p>State: {this.props.state}</p>
        <p>Latitude: {this.props.latitude}</p>
        <p>Longitude: {this.props.longitude}</p>
        <p>Population: {this.props.population}</p>
        <p>Growth Rate: {this.props.growth}</p>
      </div>
    );
  }
}

export default CityDetail;
