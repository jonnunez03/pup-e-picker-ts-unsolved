// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { DogStateProps } from "../types";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassDogs } from "./ClassDogs";
import { Requests } from "../api";

export class ClassSection extends Component<{}, DogStateProps> {
  constructor(props: DogStateProps) {
    super(props);
    this.state = {
      activeTab: "",
      dogs: [],
      setDogs: this.fetchDogs,
    };
  }

  componentDidMount(): void {
    this.fetchDogs();
  }

  fetchDogs = async () => {
    const currentDogs = await Requests.getAllDogs();
    this.setState({ dogs: currentDogs });
  };

  setActiveTab = (fav: boolean, isCreateDogBtn = false) => {
    const { activeTab } = this.state;
    if (fav) {
      this.setState({
        activeTab: activeTab !== "selectedFav" ? "selectedFav" : "",
      });
    } else if (!fav) {
      this.setState({
        activeTab: activeTab !== "selectedUnFav" ? "selectedUnFav" : "",
      });
    }

    if (isCreateDogBtn) {
      this.setState({
        activeTab: activeTab !== "selectedCreateDog" ? "selectedCreateDog" : "",
      });
    }
  };

  render() {
    const { activeTab, dogs } = this.state;
    const favCount = dogs.filter((dog) => dog.isFavorite).length;
    const unFavCount = dogs.filter((dog) => !dog.isFavorite).length;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                activeTab === "selectedFav" ? "active" : ""
              }`}
              onClick={() => this.setActiveTab(true)}
            >
              favorited ( {favCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                activeTab === "selectedUnFav" ? "active" : ""
              }`}
              onClick={() => this.setActiveTab(false)}
            >
              unfavorited ( {unFavCount} )
            </div>
            <div
              className={`selector ${
                activeTab === "selectedCreateDog" ? "active" : ""
              }`}
              onClick={() => this.setActiveTab(true, true)}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {activeTab === "selectedCreateDog" ? (
            <ClassCreateDogForm dogs={dogs} setDogs={this.fetchDogs} />
          ) : (
            <ClassDogs
              activeTab={activeTab}
              dogs={dogs}
              setDogs={this.fetchDogs}
            />
          )}
        </div>
      </section>
    );
  }
}
