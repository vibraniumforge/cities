import React from "react";

class CityCard extends React.Component {
  render() {
    return (
      <div className="cityCard">
        <p>
          <span>#</span>
          <span>{this.props.rank}</span>
          <br />
          <span>{this.props.city},</span>
          <br />
          <span>{this.props.state}</span>
          <br />
          <span>Latitude: {this.props.latitude},</span>
          <br />
          <span>Longitude: {this.props.longitude}</span>
          <br />
          <span>Population: {this.props.population}</span>
          <br />
          <span>Growth: {this.props.growth}</span>
          <br />
        </p>
      </div>
    );
  }
}

export default CityCard;
