import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog, DogStateProps } from "../types";
import { Requests } from "../api";
import { CheckmarkIcon, toast } from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  dogs,
  setDogs,
}: Omit<DogStateProps, "activeTab">) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);
  const [description, setDescription] = useState("");

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const newDog = await Requests.postDog({
          name,
          image,
          description,
          isFavorite: false,
          id: Math.max(...dogs.map((dog: Dog) => Number(dog.id))) + 1,
        });
        setDogs((prevDogs) => [...prevDogs, newDog]);
        setName("");
        setDescription("");
        setImage(defaultSelectedImage);
        toast(
          <>
            <CheckmarkIcon /> Dog Created
          </>
        );
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={name}
        disabled={false}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={false}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select id="" value={image} onChange={(e) => setImage(e.target.value)}>
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" />
    </form>
  );
};
