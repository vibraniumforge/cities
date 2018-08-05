import React from "react";
import "./citycard.css";

class CityCard extends React.Component {
  render() {
    return (
      <div className="citycard">
        <p>
          <span>#</span>
          <span>{this.props.rank}</span>
          <br />
          <span>{this.props.city},</span>
          <br />
          <span>{this.props.state}</span>
          <br />
          <span>{this.props.latitude},</span>
          <br />
          <span>{this.props.longitude}</span>
          <br />
          <span>{this.props.population}</span>
          <br />
          <span>{this.props.growth}</span>
        </p>
        <button onClick={this.toggleModal}>More</button>
      </div>
    );
  }
}

export default CityCard;
