import React from "react";

class CitySortRadio extends React.Component {
  render() {
    return (
      <div>
        <form className="theRadioForm">
          <br />
          <label>Sort by:</label>
          <br />
          <input
            type="radio"
            value="rank"
            name="sortBy"
            onChange={this.props.changeRadioValue}
          />
          Population Rank
          <br />
          <input
            type="radio"
            value="city"
            name="sortBy"
            onChange={this.props.changeRadioValue}
          />
          City Name
          <br />
          <input
            type="radio"
            value="state"
            name="sortBy"
            onChange={this.props.changeRadioValue}
          />
          State Name
          <br />
          <input
            type="radio"
            value="lattitude"
            name="sortBy"
            onChange={this.props.changeRadioValue}
          />
          Lattitude
          <br />
          <input
            type="radio"
            value="longitude"
            name="sortBy"
            onChange={this.props.changeRadioValue}
          />
          Longitude
          <br />
          <input
            type="radio"
            value="growth"
            name="sortBy"
            onChange={this.props.changeRadioValue}
          />
          Growth
        </form>
        <br />

        <br />
        <button type="button" onClick={this.props.changeRadioValue}>
          Sort
        </button>
        {/* </label> */}
      </div>
    );
  }
}

export default CitySortRadio;
