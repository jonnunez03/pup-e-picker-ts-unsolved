import { Requests } from "./api";
import { Dog } from "./types";

const messAround = async () => {
  // Write your test code in this function

  const dogs = await Requests.getAllDogs();

  // const nextId = Math.max(...dogs.map((dog: Dog) => Number(dog.id))) + 1;

  // const newDog = await Requests.postDog({
  //   name: "Courage",
  //   image: "/assets/chihuahua.avif",
  //   description: "Brave but cowardly",
  //   isFavorite: false,
  //   id: nextId,
  // });

  // await Requests.deleteDog(18);
  // await Requests.updateDog(19, { name: "Courage", description: "SHEEEEESH" });

  console.log(dogs);
  // console.log(newDog);
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
