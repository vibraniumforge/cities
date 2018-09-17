import React from "react";

class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchForCityName: "",
      searchForStateName: "",
      searchForPopulationRank: ""
    };

    this.handleSearchForPopulationRankChange = this.handleSearchForPopulationRankChange.bind(
      this
    );
    this.searchForPopulationRankFx = this.searchForPopulationRankFx.bind(this);
    this.handleSearchForCityNameChange = this.handleSearchForCityNameChange.bind(
      this
    );
    this.searchForCityNameFx = this.searchForCityNameFx.bind(this);
    this.handleSearchForStateNameChange = this.handleSearchForStateNameChange.bind(
      this
    );
    this.searchForStateNameFx = this.searchForStateNameFx.bind(this);
  }

  handleSearchForPopulationRankChange(e) {
    this.setState({ searchForPopulationRank: e.target.value });
  }

  searchForPopulationRankFx() {
    let filteredSearchByPopulationRankResult = this.props.originalCitiesList.filter(
      city => {
        if (
          this.state.originalCitiesList &&
          this.state.searchForPopulationRank &&
          city.rank.toString() === this.state.searchForPopulationRank
        ) {
          return city;
        }
        return filteredSearchByPopulationRankResult;
      }
    );
    this.setState({ originalCitiesList: filteredSearchByPopulationRankResult });
  }

  handleSearchForCityNameChange(e) {
    this.setState({ searchForCityName: e.target.value });
  }

  // searchForCityNameFx() {
  //   let filteredCityList = this.state.originalCitiesList.filter(city => {
  //     if (
  //       this.state.originalCitiesList &&
  //       city.city &&
  //       city.city
  //         .toLowerCase()
  //         .includes(this.state.searchForCityName.toLowerCase())
  //     ) {
  //       return city;
  //     }
  //     return filteredCityList;
  //   });
  //   this.setState({ originalCitiesList: filteredCityList });
  // }

  searchForCityNameFx() {
    // console.log(this.props.originalCitiesList);
    return this.props.originalCitiesList.filter(element => {
      return element.city
        .toLowerCase()
        .includes(this.state.searchForCityName.toLowerCase());
    });
  }

  handleSearchForStateNameChange(e) {
    this.setState({ searchForStateName: e.target.value });
  }

  searchForStateNameFx() {
    let filteredCityList = this.props.originalCitiesList.filter(city => {
      if (
        this.state.originalCitiesList &&
        city.state &&
        city.state
          .toLowerCase()
          .includes(this.state.searchForStateName.toLowerCase())
      ) {
        return city;
      }
      return filteredCityList;
    });
    this.setState({ originalCitiesList: filteredCityList });
  }

  render() {
    console.log(this.props.originalCitiesList);
    return (
      <div>
        <label>Search: </label>
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
        <select>
          <option value="greaterThan">Greater Than</option>
          <option value="greaterThan">Less Than</option>
          <option value="greaterThan">Equal To </option>
        </select>
        <input
          className="searchBox"
          type="text"
          placeholder="Enter a number"
          id="searchForPopulationRank"
          value={this.state.searchForPopulationRank}
          onChange={this.handleSearchForPopulationRankChange}
        />
        <button type="button" onClick={this.searchForPopulationRankFx}>
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
          value={this.state.searchForCityName}
          onChange={this.handleSearchForCityNameChange}
        />
        <button type="button" onClick={this.searchForCityNameFx}>
          Search by City Name
        </button>
        <br />
        <label>Search: </label>
        <input
          className="searchBox"
          type="text"
          id="searchForState"
          placeholder="Enter a state name"
          value={this.state.searchForStateName}
          onChange={this.handleSearchForStateNameChange}
        />
        <button type="button" onClick={this.searchForStateNameFx}>
          Search by State Name
        </button>
        <br />
      </div>
    );
  }
}

export default CitySearch;
