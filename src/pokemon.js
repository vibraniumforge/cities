import React from "react";
import axios from "axios";
import PokeCard from "./pokecard.js";
import PokemonSpinner from "./pokemonspinner.jsx";
import "./pokemon.css";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/?limit=949";

class PokemonCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      sortBy: "default"
    };

    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.sortReverse = this.sortReverse.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get(pokemonUrl).then(data => {
      this.setState({
        pokemonList: data.data.results
      });
    });
  }

  sortAlphabetically() {
    return this.state.pokemonList.slice().sort(function(a, b) {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      return 0;
    });
  }

  sortReverse() {
    return this.state.pokemonList.slice().sort(function(a, b) {
      if (a.name > b.name) return -1;
      else if (a.name < b.name) return 1;
      return 0;
    });
  }

  handleClick(e) {
    this.setState({ sortBy: e.target.name });
  }

  sortChooser() {
    if (this.state.sortBy === "alphabetical") {
      return this.sortAlphabetically();
    } else if (this.state.sortBy === "reverse") {
      return this.sortReverse();
    } else if (this.state.sortBy === "default") {
      return this.state.pokemonList;
    }
  }

  render() {
    const pokes = this.sortChooser().map((poke, pokeIndex) => (
      <ol className="pokecard" key={pokeIndex}>
        <li>
          <PokeCard
            name={
              poke.name.substring(0, 1).toUpperCase() + poke.name.substring(1)
            }
            number={pokeIndex + 1}
            // url={poke.url}
          />
        </li>
      </ol>
    ));
    return (
      <div>
        <img
          alt="Pokemon!"
          src="//upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/250px-International_Pok%C3%A9mon_logo.svg.png"
        />
        <br />
        <PokemonSpinner />
        <br />
        <h2>List of all Pokemon:</h2>
        <br />
        <button
          type="button"
          className="button"
          onClick={this.handleClick}
          name="alphabetical"
        >
          Sort By Name
        </button>
        <button
          type="button"
          className="button"
          onClick={this.handleClick}
          name="reverse"
        >
          Sort By Reverse Name
        </button>
        <button
          type="button"
          className="button"
          onClick={this.handleClick}
          name="default"
        >
          Reset List
        </button>
        <br />
        <br />
        {pokes}
      </div>
    );
  }
}

export default PokemonCards;
