import { api } from "~/utils/api";

// interface categories{
//   id: string;
//   name: string;
// }[];

export default function Home() {
  const { isLoading, data } = api.category.fetchCategories.useQuery();

  isLoading ? <h2>Categories are loading</h2> : null;
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {data?.map(({ name, id }) => (
            <p key={id} className="text-2xl text-white">
              {name}
            </p>
          ))}
        </div>
      </main>
    </>
  );
}
