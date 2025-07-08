// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { TActiveTab } from "../types";

export const FunctionalSection = ({
  children,
  activeTab,
  setActiveTab,
  counters,
}: {
  children: ReactNode;
  activeTab: TActiveTab;
  setActiveTab: Dispatch<SetStateAction<TActiveTab>>;
  counters: { favDogs: number; unFavDogs: number };
}) => {
  const onClickHandler = (value: TActiveTab) => {
    const isSameActiveTab = value === activeTab;
    const newActiveTab = isSameActiveTab ? "all" : value;
    setActiveTab(newActiveTab);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "fav" ? "active" : ""} `}
            onClick={() => onClickHandler("fav")}
          >
            favorited ( {counters.favDogs} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unFav" ? "active" : ""}`}
            onClick={() => onClickHandler("unFav")}
          >
            unfavorited ( {counters.unFavDogs} )
          </div>
          <div
            className={`selector ${activeTab === "createDog" ? "active" : ""}`}
            onClick={() => onClickHandler("createDog")}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
