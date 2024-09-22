import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import {
  AssignCourse,
  AddCourse,
  GetAllCourses,
  GetCoursesByUser,
  GetCoursesWithUsers,
  IsCourseAssigned,
  CheckUserActivity,
  EditCourse,
  EditUpdateCourse,
  DeleteCourse,
  DeleteCourseName,
  DeleteUserCourse,
} from "./courseAPI";

import {
  CoursesResponse,
  UsersResponse,
  UserCourseAssignmentResponse,
} from "../components/Home/ts/types";

// Funkcja pomocnicza do tworzenia zapytań
const createQueryFn =
  <T>(fn: () => Promise<T>) =>
  async () =>
    await fn();

// Hook do pobierania wszystkich kursów
export const useCoursesQuery = (
  options?: UseQueryOptions<CoursesResponse, Error>
) =>
  useQuery({
    queryKey: ["courses"],
    queryFn: createQueryFn(GetAllCourses),
    staleTime: 60000,
    ...options,
  });

// Hook do pobierania wszystkich użytkowników

// Hook do pobierania przypisań kursów do użytkowników
export const useCoursesWithUsersQuery = (
  options?: UseQueryOptions<UserCourseAssignmentResponse, Error>
) =>
  useQuery({
    queryKey: ["coursesWithUsers"],
    queryFn: createQueryFn(GetCoursesWithUsers),
    staleTime: 60000,
    ...options,
  });

// Hook do pobierania kursów przypisanych do danego użytkownika
export const useCourseByUserQuery = (
  userId: string,
  options?: UseQueryOptions<UserCourseAssignmentResponse, Error>
) =>
  useQuery({
    queryKey: ["courseByUser", userId],
    queryFn: createQueryFn(() => GetCoursesByUser(userId)),
    staleTime: 60000,
    ...options,
  });

// Hook do dodawania nowego kursu
export const useAddCourseMutation = (
  options?: UseMutationOptions<any, Error, any>
) =>
  useMutation({
    mutationFn: async (courseData: any) => await AddCourse(courseData),
    ...options,
  });
