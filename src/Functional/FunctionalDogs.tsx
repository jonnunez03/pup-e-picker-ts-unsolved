import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export type DogStateProps = {
  dogsList: Dog[];
  isLoading: boolean;
  handleUpdateDog: (
    dogId: number,
    favState: Partial<Dog>
  ) => Promise<string | void>;
  handleDeleteDog: (dogId: number) => Promise<string | void>;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogsList,
  isLoading,
  handleDeleteDog,
  handleUpdateDog,
}: DogStateProps) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogsList.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
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
};
