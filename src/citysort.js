import React from "react";

class CitySort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "populationRank"
    };

  }

  render() {
    return (
      <div>
        <form>
          <label>
            Sort by:
            <br />
            <input
              type="radio"
              value="populationRank"
              name="sortBy"
              onChange={this.onChange}
            />
            Population Rank
            <br />
            <input
              type="radio"
              value="city"
              name="sortBy"
              onChange={this.onChange}
            />
            City Name
            <br />
            <input
              type="radio"
              value="state"
              name="sortBy"
              onChange={this.onChange}
            />
            State Name
            <br />
            <input
              type="radio"
              value="longitude"
              name="sortBy"
              onChange={this.onChange}
            />
            Longitude
            <br />
            <input
              type="radio"
              value="lattitude"
              name="sortBy"
              onChange={this.onChange}
            />
            Lattitude
            <br />
            <input
              type="radio"
              value="population"
              name="sortBy"
              onChange={this.onChange}
            />
            Population
            <br />
            <input
              type="radio"
              value="growth "
              name="sortBy"
              onChange={this.onChange}
            />
            Growth
            <br />
          </label>
        </form>
      </div>
    );
  }
}

export default CitySort;
