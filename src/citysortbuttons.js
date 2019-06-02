import React from "react";

class CitySortButtons extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="button"
          name="rank"
          onClick={this.props.handleSortByClick}
        >
          Sort by Population Rank
        </button>
        <button
          type="button"
          className="button"
          name="city"
          onClick={this.props.handleSortByClick}
        >
          Sort by City Name
        </button>
        <button
          type="button"
          className="button"
          name="state"
          onClick={this.props.handleSortByClick}
        >
          Sort by State Name
        </button>
        <button
          type="button"
          className="button"
          name="latitude"
          onClick={this.props.handleSortByClick}
        >
          Sort by Latitude
        </button>
        <button
          type="button"
          className="button"
          name="longitude"
          onClick={this.props.handleSortByClick}
        >
          Sort by Longitude
        </button>
        <button
          type="button"
          className="button"
          name="growth"
          onClick={this.props.handleSortByClick}
        >
          Sort by Growth
        </button>
        <br />
        <br />
        <label htmlFor="radio">Sort Ascending</label>
        <input
          type="checkbox"
          checked={this.props.sortAscendingState}
          name="sortAscending"
          onChange={this.props.sortAscendingFx}
        />
        <br />
        <label htmlFor="radio">Sort Descending</label>
        <input
          type="checkbox"
          checked={!this.props.sortAscendingState}
          name="sortDescending"
          onChange={this.props.sortAscendingFx}
        />
        <hr />
      </div>
    );
  }
}
export default CitySortButtons;
