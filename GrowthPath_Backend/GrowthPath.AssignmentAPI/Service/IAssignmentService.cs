
using GRowthPath.AssignmentAPI.Models;
using GRowthPath.AssignmentAPI.Models.DTO;

namespace GRowthPath.AssignmentAPI.Service
{
    public interface IAssignmentService

    {

        Task<bool> AssignCourse(string employeeId, int courseId);

        // Task<IEnumerable<CourseAssignment>> GetAssignedCoursesForEmployee(string employeeId);

        Task<bool> UpdateCourseProgress(string employeeId, int courseId, int modulesCompleted);

        Task<List<CourseAssignment>> GetAssignedCourses(string employeeId);

    }
}