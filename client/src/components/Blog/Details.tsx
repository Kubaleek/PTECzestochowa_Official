import { Params } from "@/app/[category]/[subcategory]/ts/types";
import Courses from "./Courses/Courses";
import SocialsButtons from "./SocialsButtons";
import { usePathname } from "next/navigation";
import { useSubPostsQuery } from "@/services/queryHooks";
import { GetServerSideProps } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetPages } from "@/services/homeAPI";

interface PageProps {
  category: string;
  subcategory: string;
}

// Pobieranie danych na serwerze przed renderowaniem strony
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { category, subcategory } = params as { category: string; subcategory: string };

  const queryClient = new QueryClient();
  
  // Prefetch danych na serwerze
  await queryClient.prefetchQuery({
    queryKey: ['Posts', category, subcategory],
    queryFn: async () => {
      return await GetPages({ category, subcategory });
    },
    staleTime: 1000 * 60, 
  });

  return {  
    props: {
      dehydratedState: dehydrate(queryClient),
      category,
      subcategory,
    },
  };
};

// Komponent renderujący szczegóły postu
export default function Details({ params }: { params: Params }) {
  const paths = usePathname();
  const { category, subcategory } = params;

  // Hook do pobierania postów na podstawie kategorii i podkategorii
  const {
    data: PostsResponse,
    error,
    isLoading,
  } = useSubPostsQuery(category, subcategory);

  const posts = PostsResponse?.data || [];

  return (
    <section className="col-span-12 md:col-span-8 xl:col-span-9">
      <article className="flex flex-col gap-3 mb-20 h-fit bg-white rounded-lg w-full mt-4 p-3 shadow-lg border border-[#333]/25">
        {isLoading ? (
          <div className="text-black">
            {/* ...loading spinner... */}
          </div>
        ) : error ? (
          <div className="flex items-center p-4 mb-4 text-red-800 border-4 border-red-300 bg-red-50 rounded-lg">
            {/* ...error message... */}
          </div>
        ) : (
          <>
            {posts.map(((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div>
                  <h2 className="text-lg font-bold text-[#17822e] break-words whitespace-normal text-pretty leading-relaxed">
                    {item.subtitle}
                  </h2>
                  <h1 className="text-xl md:text-3xl font-bold break-words whitespace-normal text-pretty leading-relaxed">
                    {item.title}
                  </h1>
                </div>
                <div className="flex flex-row gap-2">
                  <SocialsButtons />
                </div>
                <div>
                  {paths === "/kontakt/kontakt" ? (
                    <p>Kontakt</p>
                  ) : paths === "/kursy/szkolenia" ? (
                    <Courses />
                  ) : null}
                  {item.subtext}
                </div>
              </div>
            )))}
          </>
        )}
      </article>
    </section>
  );
}
