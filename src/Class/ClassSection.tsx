// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { TActiveTab } from "../types";
import { Link } from "react-router-dom";

export class ClassSection extends Component<
  {
    children: ReactNode;
    activeTab: TActiveTab;
    setActiveTab: (value: TActiveTab) => void;
    counters: { favDogs: number; unFavDogs: number };
  },
  {}
> {
  onClickHandler = (value: TActiveTab) => {
    const { activeTab, setActiveTab } = this.props;
    const isSameActiveTab = value === activeTab;
    const newActiveTab = isSameActiveTab ? "all" : value;
    setActiveTab(newActiveTab);
  };

  render() {
    const { activeTab, counters } = this.props;
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
              className={`selector ${activeTab === "fav" ? "active" : ""}`}
              onClick={() => this.onClickHandler("fav")}
            >
              favorited ( {counters.favDogs} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${activeTab === "unFav" ? "active" : ""}`}
              onClick={() => this.onClickHandler("unFav")}
            >
              unfavorited ( {counters.unFavDogs} )
            </div>
            <div
              className={`selector ${
                activeTab === "createDog" ? "active" : ""
              }`}
              onClick={() => this.onClickHandler("createDog")}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
