import React from "react";
import axios from "axios";
import CityForm from "./cityform.js";
import CitySortRadio from "./citysortradio.js";
import CityCard from "./citycard.js";

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
      radioValue: "rank",
      sortBy: "",
      showCityForm: false
    };

    this.onSelect = this.onSelect.bind(this);
    this.changeRadioValue = this.changeRadioValue.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showCityForm = this.showCityForm.bind(this);

    this.sortAscending = this.sortAscending.bind(this);
    this.sortByRank = this.sortByRank.bind(this);
    this.sortByCity = this.sortByCity.bind(this);
    this.sortByState = this.sortByState.bind(this);
    this.sortByLatitude = this.sortByLatitude.bind(this);
    this.sortByLongitude = this.sortByLongitude.bind(this);
    this.sortByGrowth = this.sortByGrowth.bind(this);
    this.sortChooser = this.sortChooser.bind(this);
  }

  componentDidMount() {
    axios.get(citiesUrl).then(data => {
      this.setState({
        originalCitiesList: data.data
      });
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.showCityForm();
    this.setState({ formData: item });
  }

  toggleModal(e) {
    e.preventDefault();
    this.setState({ showModal: !this.state.showModal });
  }

  changeRadioValue(e) {
    this.setState({ radioValue: e.target.value });
  }

  showCityForm() {
    this.setState({ showCityForm: true });
  }

  sortAscending() {
    this.setState({ sortAscending: !this.state.sortAscending });
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
  //   let sortedList;
  //   if (this.state.sortAscending) {
  //     sortedList = this.state.originalCitiesList.sort(function(a, b) {
  //       return a.city > b.city ? 1 : -1;
  //     });
  //   } else {
  //     sortedList = this.state.originalCitiesList.sort(function(a, b) {
  //       return a.city < b.city ? 1 : -1;
  //     });
  //   }
  //   this.setState({ originalCitiesList: sortedList });
  // }

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

  handleClick(e) {
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
        <h1>Welcome to the top 1000 American Cities!</h1>
        <span role="img" aria-label="Emoji: United States">
          🇺🇸
        </span>
        <br />
        {this.state.showCityForm ? (
          <CityForm formData={this.state.formData} />
        ) : null}

        <br />
        <div />
        <CitySortRadio
          radioValue={this.state.radioValue}
          changeRadioValue={this.changeRadioValue}
        />
        <br />
        <br />
        <button
          type="button"
          className="button"
          name="rank"
          onClick={this.handleClick}
        >
          Sort by Rank
        </button>
        <button
          type="button"
          className="button"
          name="city"
          onClick={this.handleClick}
        >
          Sort by City Name
        </button>
        <button
          type="button"
          className="button"
          name="state"
          onClick={this.handleClick}
        >
          Sort by State Name
        </button>
        <button
          type="button"
          className="button"
          name="latitude"
          onClick={this.handleClick}
        >
          Sort by Latitude
        </button>
        <button
          type="button"
          className="button"
          name="longitude"
          onClick={this.handleClick}
        >
          Sort by Longitude
        </button>
        <button
          type="button"
          className="button"
          name="growth"
          onClick={this.handleClick}
        >
          Sort by Growth
        </button>
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
        <br />
        <div> {cities}</div>
      </div>
    );
  }
}

export default Cities;
