import React from "react";
// import CityModal from "./citymodal.js";

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
          <span>{this.props.latitude},</span>
          <br />
          <span>{this.props.longitude}</span>
          <br />
          <span>{this.props.population}</span>
          <br />
          <span>{this.props.growth}</span>
          <br />
          <button>Modal</button>
        </p>
      </div>
    );
  }
}

export default CityCard;
