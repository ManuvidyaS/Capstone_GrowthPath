﻿using GRowthPath.AssignmentAPI.Models.DTO;
using GRowthPath.AssignmentAPI.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GRowthPath.AssignmentAPI.Controllers
{
    [Route("api/[controller]")]


    [ApiController]


    public class AssignmentController : ControllerBase


    {



        private readonly IAssignmentService _assignmentService;



        public AssignmentController(IAssignmentService assignmentService)


        {


            _assignmentService = assignmentService;


        }



        [HttpPost("assign-course")]


        public async Task<IActionResult> AssignCourse([FromBody] CourseAssignmentDto request)


        {


            if (string.IsNullOrEmpty(request.EmployeeId) || request.CourseId == 0)


            {


                return BadRequest(new ApiResponse


                {


                    IsSuccess = false,


                    Message = "Employee ID and Course ID are required."


                });


            }



            var result = await _assignmentService.AssignCourse(request.EmployeeId, request.CourseId);



            if (!result)


            {


                return Conflict(new ApiResponse


                {


                    IsSuccess = false,


                    Message = "Course already assigned to this employee."


                });


            }



            return Ok(new ApiResponse


            {


                IsSuccess = true,


                Message = "Course assigned successfully."


            });


        }


        [HttpPost("update-progress")]


        public async Task<IActionResult> UpdateCourseProgress([FromBody] UpdateProgressDto request)


        {


            if (string.IsNullOrEmpty(request.EmployeeId) || request.CourseId == 0)


            {


                return BadRequest(new ApiResponse


                {


                    IsSuccess = false,


                    Message = "Employee ID and Course ID are required."


                });


            }



            var success = await _assignmentService.UpdateCourseProgress(request.EmployeeId, request.CourseId, request.ModulesCompleted);



            if (!success)


            {


                return BadRequest(new ApiResponse


                {


                    IsSuccess = false,


                    Message = "Progress update failed."


                });


            }



            return Ok(new ApiResponse


            {


                IsSuccess = true,


                Message = "Progress updated successfully."


            });


        }


        [HttpGet("get-assigned-courses/{employeeId}")]


        public async Task<IActionResult> GetAssignedCourses(string employeeId)


        {


            var courses = await _assignmentService.GetAssignedCourses(employeeId);


            if (courses == null || !courses.Any())


            {


                return NotFound(new ApiResponse


                {


                    IsSuccess = false,


                    Message = "No courses found for the specified employee."


                });


            }



            return Ok(new ApiResponse


            {


                IsSuccess = true,


                Message = "Courses retrieved successfully.",


                Data = courses


            });


        }

        [HttpDelete("get-assigned-courses/{courseId}")]

        public IActionResult DeleteCourse(int courseId)

        {

            var deleted = _assignmentService.DeleteCourse(courseId);

            if (!deleted) return NotFound();


            return Ok();

        }

    }



}



