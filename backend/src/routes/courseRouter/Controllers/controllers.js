import AppError from '../../../../utils/ErrorHandler.js';
import courseService from '../../../services.js/courseService.js';
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getAllCourses();
        res.json({ data: courses });
    } catch (error) {
        console.error("Error detected at fetching all courses", error);
        next(new AppError(error, 500));
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await courseService.DeleteCourse(id);
        if (result) {
            res.json({ message: "Course deleted successfully" });
        } else {
            next(new AppError("Course not found", 404));
        }
    } catch (error) {
        console.error("Error detected at deleting course", error);
        next(new AppError(error, 500));
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await courseService.getAllUsers();
        res.json({ data: users });
    } catch (error) {
        console.error("Error detected at fetching all users", error);
        next(new AppError(error, 500));
    }
};
const getCompletedCourses = async (req,res,next)=>{
    try{
        const {userID} = req.params;
        const courses = await courseService.getCompletedCourses(userID)
        res.json({ data: courses });

    }catch(error){
        console.error("Error detected at fetching completed courses", error);
        next(new AppError(error, 500));
    }
}
const getCoursesWithUser = async (req, res, next) => {
    try {
        const courses = await courseService.getCoursesWithUser();
        res.json({ data: courses });
    } catch (error) {
        console.error("Error detected at fetching courses with users", error);
        next(new AppError(error, 500));
    }
};
const getUsersFromCourse = async (req,res,next)=>{
    try{
        const {courseID} = req.body;
        const courses = await courseService.getUsersFromCourse(courseID);
        res.json({ data: courses });
    }catch (error) {
        console.error("Error detected at fetching users from course", error);
        next(new AppError(error, 500));
    }
}
const deleteUserFromCourse = async (req,res,next)=>{
    try{
        const {courseID,userID} = req.body;
         await courseService.deleteUserFromCourse(userID,courseID);
        res.json({ status: "success",message:"user from course has been removed"  });
    }catch (error) {
        console.error("Error detected at fetching users from course", error);
        next(new AppError(error, 500));
    }
}
const getUsersFinal = async (req, res, next) => {
    try {
      // Step 1: Fetch all courses with assigned users
      const courses = await courseService.getCoursesWithUser();
      // Step 2: Initialize an array to store the courses along with their users
      const coursesWithUsers = [];
      const uniqueCourseIds = new Set(); // Create a set to store unique course IDs

      for (const course of courses) {
        if (!uniqueCourseIds.has(course.course_id)) { // Check if the course ID is not already in the set
            uniqueCourseIds.add(course.course_id); // Add the course ID to the set
            const users = await courseService.getUsersFromCourse(course.course_id); // Fetch users by course ID
            coursesWithUsers.push({
              ...course,        // Spread course details
              users: users      // Add users list to the course object
            });
          }
      }

      res.json({
        data:coursesWithUsers,
      });
  
    } catch (error) {
      console.error("Error detected while fetching courses with their users:", error);
      next(new AppError(error, 500)); // Error handling
    }
  };
  
const getCoursesByUser = async (req, res, next) => {
    try {
        const {userID} = req.params;
        const courses = await courseService.getCourseByUser(userID);
        res.json({ data: courses });
    } catch (error) {
        console.error("Error detected at fetching courses with users", error);
        next(new AppError(error, 500));
    }
};
const checkUserActivity = async (req, res, next) => {
    try {
        const { userID } = req.params;
        const { redirect, location } = await courseService.checkUserActivity(userID);
        if (redirect) {
            res.redirect(location);
        } else {
            res.json({ message: "User is still active" });
        }
    } catch (error) {
        console.error("Error detected at checking user activity", error);
        next(new AppError(error, 500));
    }
};

const getCourseName = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const courseName = await courseService.getCourseName(courseId);
        res.json({ data: courseName });
    } catch (error) {
        console.error("Error detected at fetching course name", error);
        next(new AppError(error, 500));
    }
};
const getCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const courseName = await courseService.getCourse(courseId);
        res.json({ data: courseName });
    } catch (error) {
        console.error("Error detected at fetching course name", error);
        next(new AppError(error, 500));
    }
};
const getUsersAndCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getCourses();
        const users = await courseService.getAllUsers();
        res.json({ courses:courses,user:users });
    } catch (error) {
        console.error("Error detected at fetching course name", error);
        next(new AppError(error, 500));
    }
};

const courseExists = async (req, res, next) => {
    try {
        const { courseName } = req.params;
        const exists = await courseService.courseExists(courseName);
        res.json({ exists });
    } catch (error) {
        console.error("Error detected at checking if course exists", error);
        next(new AppError(error, 500));
    }
};

const addCourse = async (req, res, next) => {
    try {
        // Access fields from the request body and file
        const { name, description, date,file } = req.body;
        const link = req.file?.path; // Get file path from multer upload

        console.log('Received body:', req.body);



        // Call the service method to insert into the database
        const result = await courseService.addCourse(name, date, description, file);

        if (result) {
            return res.json({ success: true, message: 'Course added successfully!' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to add course.' });
        }
    } catch (error) {
        console.error("Error in addCourse:", error);
        next(new AppError(error.message, 500));
    }
};

  
  

const editCourse = async (req, res, next) => {
    try {
      const course = req.body; // The course object containing all course data
      const courseId = req.params.id || course.id; // Fetch courseId from either route params or course body
  
      const result = await courseService.EditCourse(course, courseId); // Pass both course and courseId
      res.json({ success: result, data: course });
    } catch (error) {
      console.error("Error detected while editing course:", error);
      next(new AppError(error, 500));
    }
  };    
  

const editUpdateCourse = async (req, res, next) => {
    try {
        const { userCourseCert, userCourseStatus, userCourseDateCompleted, userCourseId } = req.body;
        const result = await courseService.editUpdateCourse(userCourseCert, userCourseStatus, userCourseDateCompleted, userCourseId);
        res.json({ success: result });
    } catch (error) {
        console.error("Error detected at updating course", error);
        next(new AppError(error, 500));
    }
};

const deleteUsername = async (req, res, next) => {
    try {
        const { userCourseId } = req.params;
        const username = await courseService.deleteUsername(userCourseId);
        res.json({ data: username });
    } catch (error) {
        console.error("Error detected at deleting username", error);
        next(new AppError(error, 500));
    }
};

const deleteCourseName = async (req, res, next) => {
    try {
        const { userCourseId } = req.params;
        const courseName = await courseService.deleteCourseName(userCourseId);
        res.json({ data: courseName });
    } catch (error) {
        console.error("Error detected at deleting course name", error);
        next(new AppError(error, 500));
    }
};

const isCourseAssigned = async (req, res, next) => {
    try {
        const { userId, courseId } = req.params;
        const assigned = await courseService.isCourseAssigned(userId, courseId);
        res.json({ assigned });
    } catch (error) {
        console.error("Error detected at checking if course is assigned", error);
        next(new AppError(error, 500));
    }
};

const assignCourse = async (req, res, next) => {
    try {
        const { userId, courseId, certificate, status, dateCompleted } = req.body;
        const result = await courseService.assignCourse(userId, courseId, certificate, status, dateCompleted);
        res.json({ success: result });
    } catch (error) {
        console.error("Error detected at assigning course", error);
        next(new AppError(error, 500));
    }
};
const deleteUserCourse = async (req, res, next) => {
    try {
        const { userCourseId } = req.params;
        const result = await courseService.deleteUserCourse(userCourseId);
        res.json({ success: result });
    } catch (error) {
        console.error("Error detected at deleting user course", error);
        next(new AppError(error, 500));
    }
};

export const Controllers = {
    getAllCourses,
    deleteCourse,
    getAllUsers,
    getCoursesWithUser,
    checkUserActivity,
    getCourseName,
    getCourse,
    courseExists,
    getUsersAndCourses,
    getCompletedCourses,
    addCourse,
    getCoursesByUser,
    editCourse,
    getUsersFinal,
    editUpdateCourse,
    deleteUserFromCourse,
    deleteUsername,
    deleteCourseName,
    isCourseAssigned,
    assignCourse,
    deleteUserCourse,
    getUsersFromCourse
};
