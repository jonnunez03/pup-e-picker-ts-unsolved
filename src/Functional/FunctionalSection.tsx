// you can use this type for react children if you so choose
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalSection = () => {
  const [activeTab, setActiveTab] = useState("");
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const currentDogs = await Requests.getAllDogs();
      setDogs(currentDogs);
    };
    fetchDogs();
  }, []);

  const favCount = dogs.filter((dog) => dog.isFavorite).length;
  const unFavCount = dogs.filter((dog) => !dog.isFavorite).length;

  const onClickHandler = (fav: boolean, isCreateDogBtn = false) => {
    if (fav) {
      setActiveTab(activeTab !== "selectedFav" ? "selectedFav" : "");
    } else if (!fav) {
      setActiveTab(activeTab !== "selectedUnFav" ? "selectedUnFav" : "");
    }

    if (isCreateDogBtn) {
      setActiveTab(
        activeTab !== "selectedCreateDog" ? "selectedCreateDog" : ""
      );
    }
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
            className={`selector ${
              activeTab === "selectedFav" ? "active" : ""
            } `}
            onClick={() => onClickHandler(true)}
          >
            favorited ( {favCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "selectedUnFav" ? "active" : ""
            }`}
            onClick={() => onClickHandler(false)}
          >
            unfavorited ( {unFavCount} )
          </div>
          <div
            className={`selector ${
              activeTab === "selectedCreateDog" ? "active" : ""
            }`}
            onClick={() => onClickHandler(true, true)}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeTab === "selectedCreateDog" ? (
          <FunctionalCreateDogForm dogs={dogs} setDogs={setDogs} />
        ) : (
          <FunctionalDogs activeTab={activeTab} dogs={dogs} setDogs={setDogs} />
        )}
      </div>
    </section>
  );
};
