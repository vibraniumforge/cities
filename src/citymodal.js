import React from "react";

class CityModal extends React.Component {
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
        <button onClick={this.toggleModal}>Dismiss</button>
      </div>
    );
  }
}

export default CityModal;
