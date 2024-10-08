import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GetNavs, GetArticles, GetPosts, GetNews, GetPages } from "./homeAPI";

import {
  PostsResponse,
  ArticlesResponse,
  NewsResponse,
} from "../components/Home/ts/types";

const createQueryFn =
  <T>(fn: () => Promise<T>) =>
  async () =>
    await fn();

export const usePostsQuery = (
  options?: UseQueryOptions<PostsResponse, Error>
) =>
  useQuery({
    queryKey: ["lastPosts"],
    queryFn: createQueryFn(GetPosts),
    staleTime: 60000,
    ...options,
  });

export const useNavsQuery = (options?: UseQueryOptions<any, Error>) =>
  useQuery({
    queryKey: ["menu"],
    queryFn: createQueryFn(GetNavs),
    staleTime: 60000,
    ...options,
  });

export const useArticlesQuery = (
  options?: UseQueryOptions<ArticlesResponse, Error>
) =>
  useQuery({
    queryKey: ["lastArticles"],
    queryFn: createQueryFn(GetArticles),
    staleTime: 60000,
    ...options,
  });

export const useNewsQuery = (options?: UseQueryOptions<NewsResponse, Error>) =>
  useQuery({
    queryKey: ["lastNews"],
    queryFn: createQueryFn(GetNews),
    staleTime: 60000,
    ...options,
  });

export const useSubPostsQuery = (
  category: string,
  id?: string | null,
  subid?: string | null,
  options?: UseQueryOptions<NewsResponse, Error>
) => {
  const queryId = id ?? '';
  const querySubId = subid ?? '';
  
  return useQuery<NewsResponse, Error>({
    queryKey: ["Posts", category, queryId, querySubId],
    queryFn: () => GetPages({ category, id: queryId, subid: querySubId }), // Pass subid along with id
    staleTime: 60000,
    ...options,
  });
};
