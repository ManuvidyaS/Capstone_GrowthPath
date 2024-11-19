using GrowthPath.LearningAPI.Models;
using GRowthPath.AssignmentAPI.Data;
using GRowthPath.AssignmentAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;

namespace GRowthPath.AssignmentAPI.Service
{
    public class AssignmentService : IAssignmentService
    {
        private readonly AssignmentDbContext _context;


        private readonly HttpClient _httpClient;



        public AssignmentService(AssignmentDbContext context, HttpClient httpClient)


        {


            _context = context;


            _httpClient = httpClient;


        }



        public async Task<bool> AssignCourse(string employeeId, int courseId)


        {


            // Check if the course is already assigned


            var existingAssignment = await _context.CourseAssignments


              .AnyAsync(a => a.EmployeeId == employeeId && a.CourseId == courseId);


            if (existingAssignment) return false; // Return false if already assigned



            // Get total modules from the Learning API


            var courseModulesResponse = await _httpClient.GetAsync($"http://localhost:7777/learning-api/course/{courseId}");


            if (!courseModulesResponse.IsSuccessStatusCode)


            {


                // Log error (could be extended to handle specific status codes)


                return false;


            }



            var courseData = JsonConvert.DeserializeObject<Course>(await courseModulesResponse.Content.ReadAsStringAsync());


            if (courseData?.TotalModules == null)


            {


                // Handle missing or invalid course data


                return false;


            }



            var totalModules = courseData.TotalModules;


            DateTime endDate = courseData.EndDate;


            // Assign the course


            var assignment = new CourseAssignment


            {


                EmployeeId = employeeId,


                CourseId = courseId,


                TotalModules = totalModules,


                ModulesCompleted = 0, // Default to 0


                Progress = 0,


                EndDate = endDate


                //IsCompleted = false


            };



            _context.CourseAssignments.Add(assignment);


            await _context.SaveChangesAsync();


            return true;


        }



        public async Task<bool> UpdateCourseProgress(string employeeId, int courseId, int modulesCompleted)


        {


            var assignment = await _context.CourseAssignments


              .FirstOrDefaultAsync(a => a.EmployeeId == employeeId && a.CourseId == courseId);



            //if (assignment == null || assignment.IsCompleted) return false;



            assignment.ModulesCompleted = modulesCompleted;



            // Calculate progress percentage


            assignment.Progress = (modulesCompleted * 100) / assignment.TotalModules;




            // Check if course is completed


            if (assignment.Progress >= 100)


            {


                assignment.Progress = 100;


                // assignment.IsCompleted = true;


            }



            await _context.SaveChangesAsync();


            return true;


        }


        public async Task<List<CourseAssignment>> GetAssignedCourses(string employeeId)


        {


            return await _context.CourseAssignments


              .Where(a => a.EmployeeId == employeeId)


              .ToListAsync();


        }

        public bool DeleteCourse(int courseId)

        {

            // Retrieve all course assignments with the given courseId

            var assignments = _context.CourseAssignments.Where(ca => ca.CourseId == courseId).ToList();

            if (!assignments.Any()) return false; // No matching assignments found, return false

            // Remove all the matching assignments

            _context.CourseAssignments.RemoveRange(assignments);

            // Save changes to the database

            _context.SaveChanges();

            return true; // Indicate successful deletion

        }

    }

}




