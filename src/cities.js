import React from "react";
import axios from "axios";
import CityForm from "./cityform.js";
import CitySort from "./citysort.js";
import CityCard from "./citycard.js";

const citiesUrl =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

class Cities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalCitiesList: [],
      sortedCitiesList: [],
      formData: [],
      sortBy: "populationRank",
      sortAscending: true
    };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sort = this.sort.bind(this);
    this.sortAscending = this.sortAscending.bind(this);
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

  sortAscending() {
    this.setState({ sortAscending: !this.state.sortAscending });
  }

  sort() {
    console.log("sort fires");
    let sortedList;
    if (this.state.sortAscending) {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        if (a.state > b.state) return 1;
        else if (a.state < b.state) return -1;
        return 0;
      });
    } else {
      sortedList = this.state.originalCitiesList.sort(function(a, b) {
        if (a.state > b.state) return -1;
        else if (a.state < b.state) return 1;
        return 0;
      });
    }
    this.setState({ originalCitiesList: sortedList });
  }

  //   sort() {
  //     console.log(this.state.sortBy);
  //     const sortBy=this.state.sortBy;
  //     switch (this.state.sortBy) {
  //       case "rank":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.rank - b.rank;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;

  //     switch (this.state.sortBy) {
  //       case "city":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.city - b.city;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;

  //     switch (this.state.sortBy) {
  //       case "state":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.state - b.state;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;

  //     switch (this.state.sortBy) {
  //       case "latuitude":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.latuitude - b.latuitude;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;

  //     switch (this.state.sortBy) {
  //       case "longitude":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.longitude - b.longitude;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;

  //     switch (this.state.sortBy) {
  //       case "population":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.population - b.population;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;

  //     switch (this.state.sortBy) {
  //       case "growth":
  //       this.state.sortedCitiesList.sort(function(a, b) {
  //         return a.growth - b.growth;
  //     },
  //     this.setState({sortedCitiesList:sortedCitiesList})
  //     break;
  // }
  //   }

  //   this.sortedCitiesList.sort(function(a, b) {
  //     return a.this.state.sortBy - b.this.state.sortBy;
  //   });
  //   this.setState({ citiesList: sortedCities });
  //   console.log(this.state.citiesList);
  // }

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
            population={city.population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            growth={city.growth_from_2000_to_2013}
          />
        </li>
      </ol>
    ));

    return (
      <div>
        <h1>Welcome to the top 1000 American Cities!</h1>
        <br />
        <CityForm formData={this.state.formData} />
        <br />
        <div />
        <CitySort />
        <br />
        <button type="button" onClick={this.sort}>
          Sort
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
