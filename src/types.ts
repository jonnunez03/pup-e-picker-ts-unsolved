// Add your own custom types in here

export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};

export type ClassdogsState = {
  isLoading: boolean;
};

export type ClassCreateDogFormState = {
  name: string;
  image: string;
  description: string;
};

export type TActiveTab = "all" | "fav" | "unFav" | "createDog";
