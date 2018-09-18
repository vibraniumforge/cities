import React from "react";

class CitySortButtons extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          className="button"
          name="rank"
          onClick={this.handleSortByClick}
        >
          Sort by Population Rank
        </button>
        <button
          type="button"
          className="button"
          name="city"
          onClick={this.handleSortByClick}
        >
          Sort by City Name
        </button>
        <button
          type="button"
          className="button"
          name="state"
          onClick={this.handleSortByClick}
        >
          Sort by State Name
        </button>
        <button
          type="button"
          className="button"
          name="latitude"
          onClick={this.handleSortByClick}
        >
          Sort by Latitude
        </button>
        <button
          type="button"
          className="button"
          name="longitude"
          onClick={this.handleSortByClick}
        >
          Sort by Longitude
        </button>
        <button
          type="button"
          className="button"
          name="growth"
          onClick={this.handleSortByClick}
        >
          Sort by Growth
        </button>
        <br />
        <br />
        <label htmlFor="radio">Sort Ascending</label>
        <input
          type="checkbox"
          checked={this.state.sortAscending}
          name="sortAscending"
          onChange={this.sortAscending}
        />
        <br />
        <label htmlFor="radio">Sort Descending</label>
        <input
          type="checkbox"
          checked={!this.state.sortAscending}
          name="sortDescending"
          onChange={this.sortAscending}
        />
        <hr />
      </div>
    );
  }
}
export default CitySortButtons;
