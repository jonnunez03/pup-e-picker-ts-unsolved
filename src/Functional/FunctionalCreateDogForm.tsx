import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

type TCreateDogProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleAddDog: (dogData: Partial<Dog>) => Promise<string | void>;
};

export const FunctionalCreateDogForm = ({
  isLoading,
  setIsLoading,
  handleAddDog,
}: TCreateDogProps) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(defaultSelectedImage);
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleAddDog({
      name,
      image,
      description,
    })
      .then(() => {
        resetForm();
      })
      .catch(() => {
        toast.error("Dog adding failed!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleOnSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        value={image}
        onChange={(e) => setImage(e.target.value)}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
