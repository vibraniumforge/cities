import React from "react";
import axios from "axios";
import CityForm from "./cityform.js";
import CitySortRadio from "./citysortradio.js";
import CityCard from "./citycard.js";
import CityModal from "./citymodal.js";
import CitySearch from "./citysearch.js";

const citiesUrl =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

class Cities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalCitiesList: [],
      formData: [],
      sortAscending: true,
      showModal: false,
      showCityForm: false,
      radioValue: "",
      sortBy: "",
      searchForCityName: "",
      searchForStateName: "",
      searchForPopulationRank: ""
    };

    this.onSelect = this.onSelect.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.showCityForm = this.showCityForm.bind(this);

    this.sortAscending = this.sortAscending.bind(this);
    this.sortByRank = this.sortByRank.bind(this);
    this.sortByCity = this.sortByCity.bind(this);
    this.sortByState = this.sortByState.bind(this);
    this.sortByLatitude = this.sortByLatitude.bind(this);
    this.sortByLongitude = this.sortByLongitude.bind(this);
    this.sortByGrowth = this.sortByGrowth.bind(this);

    this.handleChangeRadioValue = this.handleChangeRadioValue.bind(this);
    this.radioSortChooser = this.radioSortChooser.bind(this);
    this.handleSortByClick = this.handleSortByClick.bind(this);
    this.sortChooser = this.sortChooser.bind(this);
    this.handleSearchForCityNameChange = this.handleSearchForCityNameChange.bind(
      this
    );
    this.searchForCityNameFx = this.searchForCityNameFx.bind(this);
    this.handleSearchForStateNameChange = this.handleSearchForStateNameChange.bind(
      this
    );
    this.searchForStateNameFx = this.searchForStateNameFx.bind(this);
    this.handleSearchForPopulationRankChange = this.handleSearchForPopulationRankChange.bind(
      this
    );
    this.searchForPopulationRankFx = this.searchForPopulationRankFx.bind(this);

    this.totalCitiesPop = this.totalCitiesPop.bind(this);
    this.totalCitiesByState = this.totalCitiesByState.bind(this);
    this.totalPopByState = this.totalPopByState.bind(this);
  }

  componentDidMount() {
    axios.get(citiesUrl).then(data => {
      this.setState({
        originalCitiesList: data.data
      });
    });
  }

  totalCitiesPop() {
    let sum = 0;
    let allCitiesPop = [];
    for (let i = 0; i < 1000; i++) {
      allCitiesPop.push(
        parseInt(this.state.originalCitiesList[i].population, 10)
      );
    }
    sum = allCitiesPop.reduce((a, b) => {
      return a + b;
    });
    console.log(
      "The total population of the top 1000 cities is:",
      sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }

  totalCitiesByState() {
    let myArray = [];
    for (let i = 0; i < this.state.originalCitiesList.length; i++) {
      myArray.push(this.state.originalCitiesList[i].state);
    }
    let resultObject = [];
    myArray.map(item => {
      if (isNaN(resultObject[item])) {
        resultObject[item] = 1;
      } else {
        resultObject[item] += 1;
      }
      return resultObject.sort(function(a, b) {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      });
    });
    // console.log(resultObject);
    console.log(resultObject);
  }

  totalPopByState() {
    let myArr = [];
    for (let i = 0; i < this.state.originalCitiesList.length; i++) {
      myArr.push;
      {
        this.state.originalCitiesList[i].state,
          this.state.originalCitiesList[i].population;
      }
    }
    console.log(myArr);
    let resultObject = {};
    myArr.map(item => {
      if (isNaN(resultObject[item])) {
        resultObject[item] = this.state.originalCitiesList.population;
      } else {
        resultObject[item] += this.state.originalCitiesList.population;
      }
      return resultObject;
    });
    console.log(resultObject);
  }

  onSelect(item, event) {
    event.preventDefault();
    this.showCityForm();
    this.setState({ formData: item });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  showCityForm() {
    this.setState({ showCityForm: true });
  }

  sortAscending() {
    this.setState({ sortAscending: !this.state.sortAscending });
    this.sortChooser();
  }

  sortByRank() {
    if (this.state.sortAscending) {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (parseInt(a.rank, 10) > parseInt(b.rank, 10)) return 1;
        else if (parseInt(a.rank, 10) < parseInt(b.rank, 10)) return -1;
        return 0;
      });
    } else {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (parseInt(a.rank, 10) < parseInt(b.rank, 10)) return 1;
        else if (parseInt(a.rank, 10) > parseInt(b.rank, 10)) return -1;
        return 0;
      });
    }
  }

  sortByCity() {
    if (this.state.sortAscending) {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.city > b.city) return 1;
        else if (a.city < b.city) return -1;
        return 0;
      });
    } else {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.city < b.city) return 1;
        else if (a.city > b.city) return -1;
        return 0;
      });
    }
  }

  // softAscending() {
  //     let sortedList;
  //     if (this.state.sortAscending) {
  //       sortedList = this.state.originalCitiesList.sort(function(a, b) {
  //         return a.city > b.city ? 1 : -1;
  //       });
  //     } else {
  //       sortedList = this.state.originalCitiesList.sort(function(a, b) {
  //         return a.city < b.city ? 1 : -1;
  //       });
  //     }
  //     this.setState({ originalCitiesList: sortedList });
  //   }

  sortByState() {
    if (this.state.sortAscending) {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.state > b.state) return 1;
        else if (a.state < b.state) return -1;
        return 0;
      });
    } else {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.state < b.state) return 1;
        else if (a.state > b.state) return -1;
        return 0;
      });
    }
  }

  sortByLatitude() {
    if (this.state.sortAscending) {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.latitude > b.latitude) return 1;
        else if (a.latitude < b.latitude) return -1;
        return 0;
      });
    } else {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.latitude < b.latitude) return 1;
        else if (a.latitude > b.latitude) return -1;
        return 0;
      });
    }
  }

  sortByLongitude() {
    if (this.state.sortAscending) {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.longitude > b.longitude) return 1;
        else if (a.longitude < b.longitude) return -1;
        return 0;
      });
    } else {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (a.longitude < b.longitude) return 1;
        else if (a.longitude > b.longitude) return -1;
        return 0;
      });
    }
  }

  sortByGrowth() {
    if (this.state.sortAscending) {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (
          parseFloat(a.growth_from_2000_to_2013) >
          parseFloat(b.growth_from_2000_to_2013)
        )
          return 1;
        else if (
          parseFloat(a.growth_from_2000_to_2013) <
          parseFloat(b.growth_from_2000_to_2013)
        )
          return -1;
        return 0;
      });
    } else {
      return this.state.originalCitiesList.slice().sort(function(a, b) {
        if (
          parseFloat(a.growth_from_2000_to_2013) <
          parseFloat(b.growth_from_2000_to_2013)
        )
          return 1;
        else if (
          parseFloat(a.growth_from_2000_to_2013) >
          parseFloat(b.growth_from_2000_to_2013)
        )
          return -1;
        return 0;
      });
    }
  }

  handleChangeRadioValue(e) {
    this.setState({ radioValue: e.target.value });
    this.radioSortChooser();
  }

  radioSortChooser() {
    if (this.state.radioValue === "rank") {
      return this.sortByRank();
    } else if (this.state.radioValue === "city") {
      return this.sortByCity();
    } else if (this.state.radioValue === "state") {
      return this.sortByState();
    } else if (this.state.radioValue === "latitude") {
      return this.sortByLatitude();
    } else if (this.state.radioValue === "longitude") {
      return this.sortByLongitude();
    } else if (this.state.radioValue === "growth") {
      return this.sortByGrowth();
    } else if (this.state.radioValue === "") {
      return this.state.originalCitiesList;
    }
  }

  handleSortByClick(e) {
    this.setState({ sortBy: e.target.name });
  }

  sortChooser() {
    if (this.state.sortBy === "rank") {
      return this.sortByRank();
    } else if (this.state.sortBy === "city") {
      return this.sortByCity();
    } else if (this.state.sortBy === "state") {
      return this.sortByState();
    } else if (this.state.sortBy === "latitude") {
      return this.sortByLatitude();
    } else if (this.state.sortBy === "longitude") {
      return this.sortByLongitude();
    } else if (this.state.sortBy === "growth") {
      return this.sortByGrowth();
    } else if (this.state.sortBy === "") {
      return this.state.originalCitiesList;
    }
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
    return this.state.originalCitiesList.slice().filter(city => {
      if (
        this.state.originalCitiesList &&
        city.city &&
        city.city
          .toLowerCase()
          .includes(this.state.searchForCityName.toLowerCase())
      ) {
        return city;
      }
      return null;
    });
  }

  handleSearchForStateNameChange(e) {
    this.setState({ searchForStateName: e.target.value });
  }

  searchForStateNameFx() {
    let filteredCityList = this.state.originalCitiesList.filter(city => {
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

  handleSearchForPopulationRankChange(e) {
    this.setState({ searchForPopulationRank: e.target.value });
  }

  searchForPopulationRankFx() {
    let filteredSearchByPopulationRankResult = this.state.originalCitiesList.filter(
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

  render() {
    const cities = this.sortChooser().map((city, cityIndex) => (
      <ol
        className="ol"
        key={cityIndex}
        onClick={this.onSelect.bind(this, city)}
      >
        <li>
          <CityCard
            rank={city.rank}
            city={city.city}
            state={city.state}
            latitude={city.latitude.toPrecision(8)}
            longitude={city.longitude.toPrecision(8)}
            population={city.population.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            growth={
              city.growth_from_2000_to_2013
                ? city.growth_from_2000_to_2013
                : "N/A"
            }
          />
        </li>
      </ol>
    ));

    return (
      <div>
        <span role="img" aria-label="Emoji: United States">
          {" "}
          🇺🇸
        </span>
        <h1>Welcome to the top 1000!</h1>
        <h2>The top 1000 American cities by population size.</h2>
        <span role="img" aria-label="Emoji: United States">
          🇺🇸
        </span>
        <hr />
        <CitySortRadio
          radioValue={this.state.radioValue}
          changeRadioValue={this.changeRadioValue}
        />
        <CityModal
          // open={this.handleOpenModal}
          showModal={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          formData={this.state.formData}
        />
        <hr />
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
        <br />
        {this.state.showCityForm ? (
          <CityForm formData={this.state.formData} />
        ) : (
          <p>Click on a city card to populate this area.</p>
        )}
        {this.state.showCityForm ? (
          <button type="button" onClick={this.handleOpenModal}>
            Open a in Modal
          </button>
        ) : null}
        <hr />
        <CitySearch
          searchForCityName={this.state.searchForCityName}
          handleSearchForCityNameChange={this.handleSearchForCityNameChange}
          searchForCityNameFx={this.searchForCityNameFx}
          searchForStateName={this.state.searchForStateName}
          handleSearchForStateNameChange={this.handleSearchForStateNameChange}
          searchForStateNameFx={this.searchForStateNameFx}
          searchForPopulationRank={this.state.searchForPopulationRank}
          handleSearchForPopulationRankChange={
            this.handleSearchForPopulationRankChange
          }
          searchForPopulationRankFx={this.searchForPopulationRankFx}
        />
        <hr />
        <button type="button" onClick={this.totalCitiesPop}>
          Add all population of all states
        </button>
        <button type="button" onClick={this.totalCitiesByState}>
          Add all the population of a state
        </button>
        <button type="button" onClick={this.totalPopByState}>
          Number of top 1000 cities per state
        </button>
        <button type="button">Graph of population of all states</button>
        <button type="button">Graph of total cities of all states</button>
        <hr />
        <div> {cities}</div>
      </div>
    );
  }
}

export default Cities;
