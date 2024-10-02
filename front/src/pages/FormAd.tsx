import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import AddCategory from "../components/addCategory";

type Category = {
  id: number;
  name: string;
};

export default function FormAd() {
  const category = useLoaderData() as Category[];

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (uploadData) => {
    try {
      await axios
        .post(`http://localhost:3000/api/ads`, uploadData)
        .then(() => reset());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-content">
      <h1>new Ad</h1>
      <form className="form-video-pannel" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title"> Title </label>
          <input
            type="text"
            {...register("title", {
              minLength: {
                value: 2,
                message: "You need at least 2 characters",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="owner"> Owner </label>
          <input
            type="text"
            {...register("owner", {
              minLength: {
                value: 2,
                message: "You need at least 2 characters",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="description"> Description </label>
          <textarea
            {...register("description", {
              minLength: {
                value: 10,
                message: "You need at least 10 characters",
              },
            })}
            placeholder="minimun 10 characters"
          />
        </div>

        <div>
          <label htmlFor="category">Choose a category </label>
          <select {...register("category_id")}>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {`${cat.name.charAt(0).toUpperCase()}${cat.name.slice(1)}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="picture">Image</label>
          <input type="text" {...register("picture", {})} />
        </div>
        <div>
          <label htmlFor="price"> Prix </label>
          <input
            type="number"
            {...register("price", {
              minLength: {
                value: 2,
                message: "You need at least 2 characters",
              },
            })}
          />
        </div>
        <div>
          <label htmlFor="location"> Lieux </label>
          <input
            type="location"
            {...register("location", {
              minLength: {
                value: 2,
                message: "You need at least 2 characters",
              },
            })}
          />
        </div>
        <button type="submit" className="button-form-panel">
          Post Ad
        </button>
      </form>
      <AddCategory />
    </div>
  );
}
