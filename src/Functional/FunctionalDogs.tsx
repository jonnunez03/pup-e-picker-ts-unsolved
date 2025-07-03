import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog, DogStateProps } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({ activeTab, dogs, setDogs }: DogStateProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateRequest = async (dogId: number, favState: Partial<Dog>) => {
    setIsLoading(true);
    await Requests.updateDog(dogId, favState);
    setDogs((prevDogs) =>
      prevDogs.map((existingDog) =>
        existingDog.id === dogId ? { ...existingDog, ...favState } : existingDog
      )
    );
    setIsLoading(false);
  };

  const handleDeleteRequest = async (dogId: number) => {
    setIsLoading(true);
    await Requests.deleteDog(dogId);
    setDogs((prevDog) =>
      prevDog.filter((existingDog) => existingDog.id !== dogId)
    );
  };

  const visibleDogs =
    activeTab === "selectedFav"
      ? dogs.filter((dog) => dog.isFavorite)
      : activeTab === "selectedUnFav"
      ? dogs.filter((dog) => !dog.isFavorite)
      : dogs;

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {visibleDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={async () => {
            handleDeleteRequest(dog.id);
          }}
          onHeartClick={async () => {
            handleUpdateRequest(dog.id, { isFavorite: false });
          }}
          onEmptyHeartClick={async () => {
            setIsLoading(!isLoading);
            await Requests.updateDog(dog.id, { isFavorite: true });
            handleUpdateRequest(dog.id, { isFavorite: true });
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
