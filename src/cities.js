import React from "react";
import axios from "axios";
import CityModal from "./citymodal";
import CityForm from "./cityform.js";
import CitySort from "./citysort.js";
import CityCard from "./citycard.js";
import "./cities.css";

const citiesUrl =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

class Cities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalCitiesList: [],
      sortedCitiesList: [],
      formData: [],
      // sortBy: "populationRank",
      sortAscending: true,
      showModal: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.sortAscending = this.sortAscending.bind(this);
    this.sortByRank = this.sortByRank.bind(this);
    this.sortByCity = this.sortByCity.bind(this);
    this.sortByState = this.sortByState.bind(this);
    this.sortByLatitude = this.sortByLatitude.bind(this);
    this.sortByLongitude = this.sortByLongitude.bind(this);
    this.sortByGrowth = this.sortByGrowth.bind(this);
  }

  componentDidMount() {
    axios.get(citiesUrl).then(data => {
      this.setState({
        originalCitiesList: data.data,
        sortedCitiesList: data.data
      });
    });
  }

  onSelect(item, event) {
    event.preventDefault();
    this.setState({ formData: item });
  }

  onChange(e) {
    this.setState({ sortBy: e.target.value });
    this.sort(e);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  sortAscending() {
    this.setState({ sortAscending: !this.state.sortAscending });
  }

  sortByRank() {
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        // if (a.state > b.state) return 1;
        // else if (a.state < b.state) return -1;
        // return 0;
        return parseInt(a.rank, 10) > parseInt(b.rank, 10) ? 1 : -1;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        // if (a.state > b.state) return -1;
        // else if (a.state < b.state) return 1;
        // return 0;
        return parseInt(a.rank, 10) < parseInt(b.rank, 10) ? 1 : -1;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  sortByCity() {
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.city > b.city ? 1 : -1;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.city < b.city ? 1 : -1;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  sortByState() {
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.state > b.state ? 1 : -1;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.state < b.state ? 1 : -1;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  sortByLatitude() {
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.latitude > b.latitude ? 1 : -1;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.latitude < b.latitude ? 1 : -1;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  sortByLongitude() {
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.longitude > b.longitude ? 1 : -1;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return a.longitude < b.longitude ? 1 : -1;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  sortByGrowth() {
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return parseFloat(a.growth_from_2000_to_2013) >
          parseFloat(b.growth_from_2000_to_2013)
          ? 1
          : -1;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        return parseFloat(a.growth_from_2000_to_2013) <
          parseFloat(b.growth_from_2000_to_2013)
          ? 1
          : -1;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  render() {
    const cities = this.state.originalCitiesList.map((city, cityIndex) => (
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
                : "bananas"
            }
          />
        </li>
      </ol>
    ));

    return (
      <div>
        {/* <span role="img" aria-label="flag">
          {" "}
          🇺🇸
        </span> */}
        <h1>Welcome to the top 1000 American Cities!</h1>
        {/* <span role="img" aria-label="flag">
          🇺🇸
        </span> */}
        <br />
        <CityForm formData={this.state.formData} />
        <br />
        <div />
        <CitySort />
        <br />
        <CityModal />
        <br />
        <button type="button" className="button" onClick={this.sortByRank}>
          Sort by Rank
        </button>
        <button type="button" className="button" onClick={this.sortByCity}>
          Sort by City Name
        </button>
        <button type="button" className="button" onClick={this.sortByState}>
          Sort by State Name
        </button>
        <button type="button" className="button" onClick={this.sortByLatitude}>
          Sort by Latitude
        </button>
        <button type="button" className="button" onClick={this.sortByLongitude}>
          Sort by Longitude
        </button>
        <button type="button" className="button" onClick={this.sortByGrowth}>
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
