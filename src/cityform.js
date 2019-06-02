import React from "react";

class CityForm extends React.Component {
  constructor(props) {
    super(props);
    const formData = this.convertPropsToFormData(props);
    this.state = {
      formData: formData
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const formData = this.convertPropsToFormData(nextProps);
    this.setState({ formData: formData });
  }

  convertPropsToFormData(props) {
    const city = props.formData ? props.formData : {};

    const initializedCity = {
      rank: city.rank || "",
      city: city.city || "",
      state: city.state || "",
      population: city.population || "",
      latitude: city.latitude || "",
      longitude: city.longitude || "",
      growth_from_2000_to_2013: city.growth_from_2000_to_2013 || ""
    };

    let formData = {
      rank: {
        value: initializedCity.rank
      },
      city: {
        value: initializedCity.city
      },
      state: {
        value: initializedCity.state
      },
      population: {
        value: initializedCity.population.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      latitude: {
        value: initializedCity.latitude.toPrecision(8)
      },
      longitude: {
        value: initializedCity.longitude.toPrecision(8)
      },
      growth_from_2000_to_2013: {
        value: initializedCity.growth_from_2000_to_2013
      }
    };
    return formData;
  }

  render() {
    return (
      <div>
        <form className="theCityForm">
          <label>Rank:</label>
          <input
            type="text"
            id="rank"
            className="formInput"
            value={this.state.formData.rank.value}
            disabled
          />
          <br />
          <label>City:</label>
          <input
            type="text"
            id="city"
            className="formInput"
            value={this.state.formData.city.value}
            disabled
          />
          <br />
          <label>State:</label>
          <input
            type="text"
            id="state"
            className="formInput"
            value={this.state.formData.state.value}
            disabled
          />
          <br />
          <label>Population:</label>
          <input
            type="text"
            id="population"
            className="formInput"
            value={this.state.formData.population.value}
            disabled
          />
          <br />
          <label>Latitude:</label>
          <input
            type="text"
            id="latitude"
            className="formInput"
            value={
              this.state.formData.latitude.value
                ? this.state.formData.latitude.value
                : ""
            }
            disabled
          />
          <br />
          <label>Longitude:</label>
          <input
            type="text"
            id="longitude"
            className="formInput"
            value={
              this.state.formData.longitude.value
                ? this.state.formData.longitude.value
                : ""
            }
            disabled
          />
          <br />
          <label>Growth from 2000 to 2013:</label>
          <input
            type="text"
            id="growth"
            className="formInput"
            value={this.state.formData.growth_from_2000_to_2013.value}
            disabled
          />
          <br />
        </form>
      </div>
    );
  }
}

export default CityForm;
