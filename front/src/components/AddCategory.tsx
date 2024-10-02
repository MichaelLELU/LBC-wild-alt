import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddCategory() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (uploadData) => {
    try {
      await axios
        .post(`http://localhost:3000/api/category`, uploadData)
        .then(() => reset());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Category</h1>
      <form>
        <div>
          <label htmlFor="name"> Category Name </label>
          <input
            type="name"
            {...register("name", {
              minLength: {
                value: 2,
                message: "You need at least 2 characters",
              },
            })}
          />
        </div>
        <button onClick={handleSubmit(onSubmit)}>create Category</button>
      </form>
    </div>
  );
}
