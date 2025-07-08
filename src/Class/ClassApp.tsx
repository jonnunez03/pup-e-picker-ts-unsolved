import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

type TClassAppState = {
  activeTab: TActiveTab;
  dogs: Dog[];
  isLoading: boolean;
};
export class ClassApp extends Component<{}, TClassAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTab: "all",
      dogs: [],
      isLoading: false,
    };
  }
  setActiveTab = (activeTab: TActiveTab): void => this.setState({ activeTab });
  setDogs = (dogs: Dog[]): void => this.setState({ dogs });
  setIsLoading = (isLoading: boolean): void => this.setState({ isLoading });

  fetchDogs = () => {
    Requests.getAllDogs()
      .then(this.setDogs)
      .catch(() => toast.error("Dogs fetching failed!"));
  };

  componentDidMount() {
    this.fetchDogs();
  }

  handleUpdateRequest = (dogId: number, favState: Partial<Dog>) => {
    this.setIsLoading(true);
    return Requests.updateDog(dogId, favState)
      .then(() => this.fetchDogs())
      .catch(() => {
        toast.error("Dog updating failed!");
      })
      .finally(() => this.setIsLoading(false));
  };

  handleDeleteRequest = (dogId: number) => {
    this.setIsLoading(true);
    return Requests.deleteDog(dogId)
      .then(() => {
        toast.success("The dog was deleted successfully!");
        return this.fetchDogs();
      })
      .catch(() => {
        toast.error("Dog deleting failed!");
      })
      .finally(() => this.setIsLoading(false));
  };

  handleAddRequest = (dogData: Partial<Dog>) => {
    this.setIsLoading(true);
    return Requests.postDog(dogData)
      .then(() => {
        toast.success("The dog was added successfully!");
        return this.fetchDogs();
      })

      .finally(() => this.setIsLoading(false));
  };

  render() {
    const { dogs, activeTab, isLoading } = this.state;
    const favDogs = dogs.filter((dog) => dog.isFavorite);
    const unFavDogs = dogs.filter((dog) => !dog.isFavorite);

    const dogCounters = {
      favDogs: favDogs.length,
      unFavDogs: unFavDogs.length,
    };

    const dogsList: Record<TActiveTab, Dog[]> = {
      all: dogs,
      fav: favDogs,
      unFav: unFavDogs,
      createDog: [],
    };

    const isCreateDogFormView = activeTab === "createDog";

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
          counters={dogCounters}
        >
          <>
            {!isCreateDogFormView && (
              <ClassDogs
                dogsList={dogsList[activeTab]}
                isLoading={isLoading}
                handleDeleteDog={this.handleDeleteRequest}
                handleUpdateDog={this.handleUpdateRequest}
              />
            )}

            {isCreateDogFormView && (
              <ClassCreateDogForm
                isLoading={isLoading}
                setIsLoading={this.setIsLoading}
                handleAddDog={this.handleAddRequest}
              />
            )}
          </>
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
