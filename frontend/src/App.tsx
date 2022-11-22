import useSWR from "swr";

import "./App.css";
import {
  GetBreedList,
  GetImageUrlsByBreed,
  GetRandomImageUrl,
} from "../wailsjs/go/main/App";
import { useState } from "react";

function BreedList({ name }: { name: string }) {
  const { isLoading, data: images = [], error } = useSWR(
    name,
    GetImageUrlsByBreed,
  );

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>Failed to fetch</p>;

  return (
    <ol>
      {images.map((img) => (
        <li key={img}>
          <img src={img} alt="dog" />
        </li>
      ))}
    </ol>
  );
}

function RandomDog({ showedAt }: { showedAt: number }) {
  const { isLoading, data: img, error } = useSWR(
    `random-${showedAt}`,
    GetRandomImageUrl,
  );

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>Failed to fetch</p>;

  return <img src={img} alt="dog" />;
}

function App() {
  const { isLoading, data: breeds = [], error } = useSWR(
    "getBreedList",
    GetBreedList,
  );
  const [seletedBreed, setSeletedBreed] = useState<
    { type: "random" | "list"; value?: string }
  >();

  if (isLoading) return <p>Loading</p>;

  if (error) return <p>Failed to fetch</p>;

  return (
    <div id="App">
      <h3>Dog API</h3>

      <button type="button" onClick={() => setSeletedBreed({ type: "random" })}>
        Fetch random dog
      </button>
      <p>
        Click on down arrow to select a breed

        <select
          onChange={(evt) =>
            setSeletedBreed({ type: "list", value: evt.target.value })}
        >
          <option value=""></option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </p>

      {seletedBreed?.value && <BreedList name={seletedBreed.value} />}

      {seletedBreed?.type === "random" && <RandomDog showedAt={Date.now()} />}
    </div>
  );
}

export default App;
