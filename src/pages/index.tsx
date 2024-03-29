"use client";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "~/components/Layout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const { isLoading, data } = api.category.fetchCategories.useQuery();

  isLoading ? <h2>Categories are loading</h2> : null;

  return (
    <Layout>
      <div className=" m-auto mt-4 flex max-h-[700px] max-w-md	 flex-col  rounded-3xl border border-solid border-stone-300 bg-white px-12 pb-12 pt-8 text-base max-md:px-5">
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
                  type="checkbox"
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
