import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server

type TDogStateProps = {
  dogsList: Dog[];
  isLoading: boolean;
  handleUpdateDog: (
    dogId: number,
    favState: Partial<Dog>
  ) => Promise<string | void>;
  handleDeleteDog: (dogId: number) => Promise<string | void>;
};

export class ClassDogs extends Component<TDogStateProps, {}> {
  constructor(props: TDogStateProps) {
    super(props);
  }

  render() {
    const { dogsList, isLoading, handleUpdateDog, handleDeleteDog } =
      this.props;

    return (
      <>
        {dogsList.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={async () => {
              handleDeleteDog(dog.id);
            }}
            onHeartClick={async () => {
              handleUpdateDog(dog.id, { isFavorite: false });
            }}
            onEmptyHeartClick={async () => {
              handleUpdateDog(dog.id, { isFavorite: true });
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
