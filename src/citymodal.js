import React from "react";
import Modal from "react-modal";

class CityModal extends React.Component {
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
        value: initializedCity.latitude
      },
      longitude: {
        value: initializedCity.longitude
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
        <Modal
          className="modal"
          appElement={document.getElementById("app")}
          isOpen={this.props.showModal}
          ariaHideApp={false}
        >
          <p>Population Rank: {this.state.formData.rank.value}</p>
          <p>Name: {this.state.formData.city.value}</p>
          <p>State: {this.state.formData.state.value}</p>
          <p>Latitude: {this.state.formData.latitude.value}</p>
          <p>Longitude: {this.state.formData.longitude.value}</p>
          <p>Population: {this.state.formData.population.value}</p>
          <p>
            Growth Rate: {this.state.formData.growth_from_2000_to_2013.value}
          </p>
          <button type="button" onClick={this.props.onRequestClose}>
            Close Modal
          </button>
        </Modal>
      </div>
    );
  }
}

export default CityModal;
