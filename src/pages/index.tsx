"use client";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "~/components/Layout";

export default function Home() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, [router]);

  const { data: preSelectedCategories } = api.user.getFavoriteCategory.useQuery(
    {
      userId,
    },
  );

  useEffect(() => {
    setSelectedCategories((prev) => [...prev, preSelectedCategories]);
  }, []);

  // Fetching Categories
  const { data } = api.category.fetchCategories.useQuery();

  // Add Favorite Mutation
  const addFavoriteCategory = api.user.addFavoriteCategory.useMutation({
    onSuccess({ categoryId }) {
      setSelectedCategories((prevState) => [...prevState, categoryId]);
    },
  });

  // Remove Favorite Mutation
  const removeFavoriteCategory = api.user.removeFavoriteCategory.useMutation({
    onSuccess({ categoryId }) {
      setSelectedCategories((prevState) =>
        prevState.filter((id) => id !== categoryId),
      );
    },
  });

  const handleEvent = (event, categoryId) => {
    if (event.target.checked) {
      addFavorite(categoryId);
    } else {
      removeFavorite(categoryId);
    }
  };

  const addFavorite = (categoryId) => {
    addFavoriteCategory.mutate({
      userId: localStorage.getItem("userId"),
      categoryId: categoryId,
    });
  };

  const removeFavorite = (categoryId) => {
    removeFavoriteCategory.mutate({
      userId: localStorage.getItem("userId"),
      categoryId: categoryId,
    });
  };

  return (
    <Layout>
      <div className=" m-auto mt-4 flex max-h-[550px] max-w-md	 flex-col  rounded-3xl border border-solid border-stone-300 bg-white px-12 pb-12 pt-8 text-base max-md:px-5">
        <div className="self-center text-2xl font-semibold text-black">
          Please mark your interests!
        </div>

        <div className="self-center text-xl font-normal  text-black">
          We will keep you notified.
        </div>

        <div className=" h-full overflow-scroll scroll-smooth">
          {data?.map(({ name, id }) => {
            return (
              <label key={id} className="flex items-center space-x-2">
                <input
                  onClick={(event) => handleEvent(event, id)}
                  type="checkbox"
                  checked={selectedCategories.includes(id)}
                  className="form-checkbox h-5 w-5  rounded-md checked:accent-black  "
                />
                <span className=" text-lg text-black">{name}</span>
              </label>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
