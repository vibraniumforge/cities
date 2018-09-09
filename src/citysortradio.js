import React from "react";

class CitySortRadio extends React.Component {
  render() {
    return (
      <div>
        <form className="theRadioForm">
          <label>
            Sort by:
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
              value="longitude"
              name="sortBy"
              onChange={this.props.changeRadioValue}
            />
            Longitude
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
              value="population"
              name="sortBy"
              onChange={this.props.changeRadioValue}
            />
            Population
            <br />
            <input
              type="radio"
              value="growth"
              name="sortBy"
              onChange={this.props.changeRadioValue}
            />
            Growth
            <br />
          </label>
        </form>
      </div>
    );
  }
}

export default CitySortRadio;
