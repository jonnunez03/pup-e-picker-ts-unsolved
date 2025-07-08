import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type TCreateDogProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  handleAddDog: (dogData: Partial<Dog>) => Promise<string | void>;
};

export class ClassCreateDogForm extends Component<
  TCreateDogProps,
  {
    name: string;
    image: string;
    description: string;
  }
> {
  constructor(props: TCreateDogProps) {
    super(props);
    this.state = {
      name: "",
      image: defaultSelectedImage,
      description: "",
    };
  }

  resetForm = () => {
    this.setState({ name: "" });
    this.setState({ description: "" });
    this.setState({ image: defaultSelectedImage });
  };

  handleOnSubmit = async (e: FormEvent) => {
    const { handleAddDog, setIsLoading } = this.props;
    const { name, image, description } = this.state;
    e.preventDefault();
    handleAddDog({
      name,
      image,
      description,
    })
      .then(() => {
        this.resetForm();
      })
      .catch(() => {
        toast.error("Dog adding failed!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  render() {
    const { isLoading } = this.props;
    const { name, image, description } = this.state;

    return (
      <form action="" id="create-dog-form" onSubmit={this.handleOnSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          value={description}
          cols={80}
          rows={10}
          onChange={(e) => this.setState({ description: e.target.value })}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          value={image}
          onChange={(e) => this.setState({ image: e.target.value })}
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
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
