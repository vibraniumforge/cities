import React from "react";
import axios from "axios";
import CityForm from "./cityform.js";
import CitySortButtons from "./citysortbuttons.js";
import CitySortRadio from "./citysortradio.js";
import CityCard from "./citycard.js";
import CityModal from "./citymodal.js";
import CitySearch from "./citysearch.js";
import CityCharts from "./citycharts.js";

const citiesUrl =
  "https://gist.githubusercontent.com" +
  "/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

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
      top1000CitiesTotalPop: "",
      searchForPopulationRank: "",
      searchForPopulationRankBy: "equalTo",
      searchForCityName: "",
      searchForStateName: "",
      totalCitiesByState: ""
    };

    this.onSelect = this.onSelect.bind(this);
    this.showCityForm = this.showCityForm.bind(this);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.handleSortByClick = this.handleSortByClick.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
    this.sortByRank = this.sortByRank.bind(this);
    this.sortByCity = this.sortByCity.bind(this);
    this.sortByState = this.sortByState.bind(this);
    this.sortByLatitude = this.sortByLatitude.bind(this);
    this.sortByLongitude = this.sortByLongitude.bind(this);
    this.sortByGrowth = this.sortByGrowth.bind(this);

    this.handleChangeRadioValue = this.handleChangeRadioValue.bind(this);
    this.radioSortChooser = this.radioSortChooser.bind(this);

    this.displayChooser = this.displayChooser.bind(this);

    this.totalCitiesPop = this.totalCitiesPop.bind(this);

    this.handleSelectChange = this.handleSelectChange.bind(this);

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
    const reducer = (acc, currVal) => acc + parseInt(currVal.population, 10);
    let sum = this.state.originalCitiesList
      .reduce(reducer, 0)
      // .toString()
      // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      .toLocaleString();
    this.setState({ top1000CitiesTotalPop: sum });
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
    console.log("resultObject=", resultObject);
    console.log("resultObject[0]=", resultObject[0]);
    console.log("typeof resultObject=", typeof resultObject);
    let result = Object.keys(resultObject).map(function(key) {
      return [Number(key, resultObject[key])];
    });
    console.log("resultObject=", resultObject);
    console.log("typeof resultObject=", typeof resultObject);
    console.log("result=", result);
    console.log("typeof result=", typeof result);
    this.setState({ totalCitiesByState: result });
  }

  totalPopByState() {
    let myArr = [];
    for (let i = 0; i < this.state.originalCitiesList.length; i++) {
      myArr.push([
        this.state.originalCitiesList[i].state,
        this.state.originalCitiesList[i].population
      ]);
      console.log(myArr);
      let resultObject = [];
      myArr.map(item => {
        if (isNaN(resultObject[item])) {
          resultObject[item] = this.state.originalCitiesList.population;
        } else {
          resultObject[item] += this.state.originalCitiesList.population;
        }
        return resultObject;
      });
      // console.log(resultObject);
    }
  }

  onSelect(item, event) {
    event.preventDefault();
    this.showCityForm();
    this.setState({ formData: item });
  }

  showCityForm() {
    this.setState({ showCityForm: !this.state.showCityForm });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  sortAscending() {
    this.setState({ sortAscending: !this.state.sortAscending });
    this.displayChooser();
  }

  handleSortByClick(e) {
    this.setState({ sortBy: e.target.name });
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

  handleSelectChange(e) {
    this.setState({ searchForPopulationRankBy: e.target.value });
  }

  handleSearchForPopulationRankChange(e) {
    this.setState({ searchForPopulationRank: e.target.value });
  }

  searchForPopulationRankFx() {
    if (this.state.searchForPopulationRankBy === "equalTo") {
      return this.state.originalCitiesList.filter(element => {
        return (
          parseInt(element.rank, 10) ===
          parseInt(this.state.searchForPopulationRank, 10)
        );
      });
    } else if (this.state.searchForPopulationRankBy === "greaterThan") {
      return this.state.originalCitiesList.filter(element => {
        return (
          parseInt(element.rank, 10) <
          parseInt(this.state.searchForPopulationRank, 10)
        );
      });
    } else if (this.state.searchForPopulationRankBy === "lessThan") {
      return this.state.originalCitiesList.filter(element => {
        return (
          parseInt(element.rank, 10) >
          parseInt(this.state.searchForPopulationRank, 10)
        );
      });
    } else if (this.state.searchForPopulationRankBy === "") {
      return this.state.originalCitiesList;
    }
  }

  handleSearchForCityNameChange(e) {
    this.setState({ searchForCityName: e.target.value });
  }

  searchForCityNameFx() {
    return this.state.originalCitiesList.filter(element => {
      return element.city
        .toLowerCase()
        .includes(this.state.searchForCityName.toLowerCase());
    });
  }

  handleSearchForStateNameChange(e) {
    this.setState({ searchForStateName: e.target.value });
  }

  searchForStateNameFx() {
    return this.state.originalCitiesList.filter(element => {
      return element.state
        .toLowerCase()
        .includes(this.state.searchForStateName.toLowerCase());
    });
  }

  displayChooser() {
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
    } else if (this.state.searchForPopulationRank) {
      return this.searchForPopulationRankFx();
    } else if (this.state.searchForCityName) {
      return this.searchForCityNameFx();
    } else if (this.state.searchForStateName) {
      return this.searchForStateNameFx();
    } else if (
      this.state.sortBy === "" &&
      this.state.searchForPopulationRank === "" &&
      this.state.searchForCityName === "" &&
      this.state.searchForStateName === ""
    ) {
      return this.state.originalCitiesList;
    }
  }

  render() {
    const cities = this.displayChooser().map((city, cityIndex) => (
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
          🇺🇸
        </span>
        <h1>Welcome to the top 1000!</h1>
        <h2>The top 1000 American cities by population size.</h2>
        <span role="img" aria-label="Emoji: United States">
          🇺🇸
        </span>
        <hr />
        <div className="hidden">
          <CitySortRadio
            radioValue={this.state.radioValue}
            changeRadioValue={this.changeRadioValue}
          />
        </div>
        <CityModal
          // open={this.handleOpenModal}
          showModal={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          formData={this.state.formData}
        />
        <hr />
        <div className="hidden">
          <CitySortButtons
            sortAscendingState={this.state.sortAscending}
            sortAscendingFx={this.sortAscending}
            handleSortByClick={this.handleSortByClick}
          />
        </div>
        <hr />
        <div id="math">
          <button type="button" onClick={this.totalCitiesPop}>
            Add all population of all top 1000 cities
          </button>
          <input
            className="searchBox"
            type="text"
            id="top1000Total"
            value={this.state.top1000CitiesTotalPop}
          />
          <br />
          <button type="button" onClick={this.totalCitiesByState}>
            Number of top 1000 cities in a state
          </button>
          <br />
          <button type="button" onClick={this.totalPopByState}>
            The population of every top 1000 city in a state
          </button>
          <br />
        </div>
        <hr />
        <br />
        <CityCharts totalCitiesByState={this.state.totalCitiesByState} />
        <hr />
        <div className="hidden">
          <CitySearch
            searchForPopulationRankBy={this.state.searchForPopulationRankBy}
            handleSelectChange={this.handleSelectChange}
            searchForPopulationRank={this.state.searchForPopulationRank}
            handleSearchForPopulationRankChange={
              this.handleSearchForPopulationRankChange
            }
            searchForPopulationRankFx={this.searchForPopulationRankFx}
            searchForCityName={this.state.searchForCityName}
            handleSearchForCityNameChange={this.handleSearchForCityNameChange}
            searchForCityNameFx={this.searchForCityNameFx}
            searchForStateName={this.state.searchForStateName}
            handleSearchForStateNameChange={this.handleSearchForStateNameChange}
            searchForStateNameFx={this.searchForStateNameFx}
          />
        </div>
        <hr />
        <br />
        <div className="hidden">
          {this.state.showCityForm ? (
            <CityForm formData={this.state.formData} />
          ) : (
            <button type="button">
              Click on a city card below to populate this area.
            </button>
          )}
          {this.state.showCityForm ? (
            <div>
              <button type="button" onClick={this.handleOpenModal}>
                Open a in Modal
              </button>{" "}
              <button type="button" onClick={this.showCityForm}>
                Close this area
              </button>
            </div>
          ) : null}
        </div>
        <hr />
        <div> {cities}</div>
      </div>
    );
  }
}

export default Cities;
