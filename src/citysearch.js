import React from "react";

class CitySearch extends React.Component {
  render() {
    return (
      <div>

        <div>
          {/* <input
          type="radio"
          value="greaterThan"
          name="searchByPopRank"
          onChange={this.props.changeRadioValue}
        />
        Greater Than
        <input
          type="radio"
          value="lessThan"
          name="searchByPopRank"
          onChange={this.props.changeRadioValue}
        />
        Less Than
        <input
          type="radio"
          value="equalTo"
          name="searchByPopRank"
          onChange={this.props.changeRadioValue}
        />
        Equal to */}
        </div>
        <select
          id="select1"
          value={this.props.searchForPopulationRankBy}
          onChange={this.props.handleSelectChange}
        >
          <option value="" />
          <option value="equalTo">Equal To </option>
          <option value="greaterThan">Greater Than</option>
          <option value="lessThan">Less Than</option>
        </select>
        <input
          className="searchBox"
          type="number"
          placeholder="Enter a number"
          id="searchForPopulationRank"
          value={this.props.searchForPopulationRank}
          onChange={this.props.handleSearchForPopulationRankChange}
        />
        <button type="button" onClick={this.props.searchForPopulationRankFx}>
          Search by Population Rank
        </button>
        <br />

        {/* <label>Search: </label>
        <select>
          <option value="greaterThan">Greater Than</option>
          <option value="greaterThan">Less Than</option>
          <option value="greaterThan">Equal To </option>
        </select>
        <input
          className="searchBox"
          type="text"
          placeholder="Enter a number"
          id="searchForGrowth"
          value={this.props.searchForPopulationRank}
          onChange={this.props.handleSearchForPopulationRankChange}
        
        />
        <button type="button" onClick={this.props.searchForPopulationRankFx}>
          Search by Growth
        </button>
        <br /> */}

        <label>Search: </label>
        <input
          className="searchBox"
          type="text"
          id="searchForCity"
          placeholder="Enter a city name"
          value={this.props.searchForCityName}
          onChange={this.props.handleSearchForCityNameChange}
        />
        <button type="button" onClick={this.props.searchForCityNameFx}>
          Search by City Name
        </button>
        <br />

        <label>Search: </label>
        <input
          className="searchBox"
          type="text"
          id="searchForState"
          placeholder="Enter a state name"
          value={this.props.searchForStateName}
          onChange={this.props.handleSearchForStateNameChange}
        />
        <button type="button" onClick={this.props.searchForStateNameFx}>
          Search by State Name
        </button>
        <br />
      </div>
    );
  }
}

export default CitySearch;
