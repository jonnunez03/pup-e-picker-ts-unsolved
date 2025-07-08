import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, TActiveTab } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { FunctionalDogs } from "./FunctionalDogs";

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<TActiveTab>("all");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogs = () => {
    Requests.getAllDogs()
      .then(setDogs)
      .catch(() => toast.error("Dogs fetching failed!"));
  };
  useEffect(() => {
    fetchDogs();
  }, []);

  const handleUpdateRequest = (dogId: number, favState: Partial<Dog>) => {
    setIsLoading(true);
    return Requests.updateDog(dogId, favState)
      .then(() => fetchDogs())
      .catch(() => {
        toast.error("Dog updating failed!");
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteRequest = (dogId: number) => {
    setIsLoading(true);
    return Requests.deleteDog(dogId)
      .then(() => {
        toast.success("The dog was deleted successfully!");
        return fetchDogs();
      })
      .catch(() => {
        toast.error("Dog deleting failed!");
      })
      .finally(() => setIsLoading(false));
  };

  const handleAddRequest = (dogData: Partial<Dog>) => {
    setIsLoading(true);
    return Requests.postDog(dogData)
      .then(() => {
        toast.success("The dog was added successfully!");
        return fetchDogs();
      })

      .finally(() => setIsLoading(false));
  };

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
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counters={dogCounters}
      >
        <>
          {!isCreateDogFormView && (
            <FunctionalDogs
              dogsList={dogsList[activeTab]}
              isLoading={isLoading}
              handleDeleteDog={handleDeleteRequest}
              handleUpdateDog={handleUpdateRequest}
            />
          )}

          {isCreateDogFormView && (
            <FunctionalCreateDogForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleAddDog={handleAddRequest}
            />
          )}
        </>
      </FunctionalSection>
    </div>
  );
}
