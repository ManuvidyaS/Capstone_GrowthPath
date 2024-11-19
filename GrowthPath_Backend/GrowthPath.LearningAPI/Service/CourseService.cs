using GrowthPath.LearningAPI.Data;
using GrowthPath.LearningAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GrowthPath.LearningAPI.Service
{
    public class CourseService : ICourseService
    {
        private readonly CourseDbContext _context;

        public CourseService(CourseDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllCoursesAsync()
        {
            try
            {
                return await _context.Courses.ToListAsync();
            }
            catch (Exception ex)
            {
                // Log the exception (use a logger if available)
                Console.Error.WriteLine($"Error fetching all courses: {ex.Message}");
                throw;
            }
        }

        public async Task<Course> GetCourseByIdAsync(int id)
        {
            try
            {
                return await _context.Courses.FindAsync(id);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error fetching course with ID {id}: {ex.Message}");
                throw;
            }
        }

        public async Task<Course> AddCourseAsync(Course course)
        {
            try
            {
                _context.Courses.Add(course);
                await _context.SaveChangesAsync();
                return course;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error adding course: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> UpdateCourseAsync(Course course)
        {
            try
            {
                var existingCourse = await _context.Courses.FindAsync(course.CourseId);
                if (existingCourse == null) return false;

                existingCourse.Title = course.Title;
                existingCourse.Description = course.Description;
                existingCourse.EndDate = course.EndDate;
                existingCourse.TotalModules = course.TotalModules; // Update the total modules

                _context.Courses.Update(existingCourse);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error updating course with ID {course.CourseId}: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteCourseAsync(int id)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null) return false;

                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.Error.WriteLine($"Error deleting course with ID {id}: {ex.Message}");
                throw;
            }
        }
    }
}
