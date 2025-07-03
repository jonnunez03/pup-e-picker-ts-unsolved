import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { DogStateProps, ClassCreateDogFormState, Dog } from "../types";
import { Requests } from "../api";
import toast, { CheckmarkIcon } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<
  Omit<DogStateProps, "activeTab">,
  ClassCreateDogFormState
> {
  constructor(props: DogStateProps) {
    super(props);
    this.state = {
      name: "",
      image: defaultSelectedImage,
      description: "",
    };
  }
  render() {
    const { name, image, description } = this.state;
    const { dogs, setDogs } = this.props;
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
          this.setState({
            name: "",
            description: "",
            image: defaultSelectedImage,
          });

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
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          value={description}
          cols={80}
          rows={10}
          onChange={(e) => {
            this.setState({ description: e.target.value });
          }}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={image}
          onChange={(e) => {
            this.setState({ image: e.target.value });
          }}
          disabled={false}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
