import { DogCard } from "../Shared/DogCard";
import { Component } from "react";

import { ClassdogsState, Dog, DogStateProps } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<DogStateProps, ClassdogsState> {
  constructor(props: DogStateProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  async componentDidMount() {
    const currentDogs = await Requests.getAllDogs();
    this.props.setDogs(currentDogs);
    this.setState({ isLoading: false });
  }

  async handleUpdateRequest(dogId: number, favState: Partial<Dog>) {
    this.setState({ isLoading: true });
    await Requests.updateDog(dogId, favState);
    this.props.setDogs((prevDogs) =>
      prevDogs.map((existingDog) =>
        existingDog.id === dogId ? { ...existingDog, ...favState } : existingDog
      )
    );
    this.setState({ isLoading: false });
  }
  async handleDeleteRequest(dogId: number) {
    this.setState({ isLoading: true });
    await Requests.deleteDog(dogId);
    this.props.setDogs((prevDogs) =>
      prevDogs.filter((existingDog) => existingDog.id !== dogId)
    );
    this.setState({ isLoading: false });
  }

  render() {
    const { activeTab, dogs } = this.props;
    const { isLoading } = this.state;

    const visibleDogs =
      activeTab === "selectedFav"
        ? dogs.filter((dog) => dog.isFavorite)
        : activeTab === "selectedUnFav"
        ? dogs.filter((dog) => !dog.isFavorite)
        : dogs;
    return (
      <>
        {visibleDogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={async () => {
              this.handleDeleteRequest(dog.id);
            }}
            onHeartClick={async () => {
              this.handleUpdateRequest(dog.id, {
                isFavorite: false,
              });
            }}
            onEmptyHeartClick={async () => {
              this.handleUpdateRequest(dog.id, {
                isFavorite: true,
              });
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
