"use client";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "~/components/Layout";

import Pagination from "~/components/Pagination";

export default function Home() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // CHECK TOKEN AND REDIRECT
  useEffect(() => {
    const checkTokenAndRedirect = () => {
      console.log("checking the token");
      const token = localStorage.getItem("token");
      console.log("TOKEN form LS =>", token);
      if (!token) {
        console.log("Token not found ", token);
        router.push("/login");
      }
    };

    checkTokenAndRedirect();
  }, [router]);

  // USER ID FROM LOCAL STORAGE
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId") ?? "";
    setUserId(userIdFromStorage);
  }, []);

  // FETCH USER'S SELECTED CATEGORY
  const { data: favoriteCategories } = api.user.getFavoriteCategory.useQuery(
    {
      userId,
    },
    {
      initialData: [],
    },
  );

  useEffect(() => {
    setSelectedCategories((prev) => [...prev, ...favoriteCategories]);
  }, [favoriteCategories]);

  // FETCH ALL CATEGORY
  const { data: categories, error: fetchAllCategoriesError } =
    api.category.fetchCategories.useQuery(
      { pageNo: pageNumber },
      { initialData: [] },
    );

  useEffect(() => {
    if (fetchAllCategoriesError?.data?.code === "UNAUTHORIZED") {
      router.push("/login");
    }
  }, [fetchAllCategoriesError, router]);

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

  const handleEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
    categoryId: string,
  ) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      addFavorite(categoryId);
    } else {
      removeFavorite(categoryId);
    }
  };

  const addFavorite = (categoryId: string) => {
    addFavoriteCategory.mutate({
      userId: localStorage.getItem("userId") ?? "",
      categoryId: categoryId,
    });
  };

  const removeFavorite = (categoryId: string) => {
    removeFavoriteCategory.mutate({
      userId: localStorage.getItem("userId") ?? "",
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
          {categories?.map(({ name, id }) => {
            return (
              <label key={id} className="flex items-center space-x-2">
                <input
                  onChange={(event) => handleEvent(event, id)}
                  type="checkbox"
                  checked={selectedCategories.includes(id)}
                  className="form-checkbox h-5 w-5  rounded-md checked:accent-black  "
                />
                <span className=" text-lg text-black">{name}</span>
              </label>
            );
          })}
        </div>

        {/* PAGINATION  */}
        <Pagination
          currentPage={pageNumber}
          totalPages={17}
          onPageChange={setPageNumber}
        />
      </div>
    </Layout>
  );
}
