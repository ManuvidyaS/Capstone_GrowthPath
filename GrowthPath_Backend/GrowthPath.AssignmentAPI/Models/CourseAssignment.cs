using System.ComponentModel.DataAnnotations;

namespace GRowthPath.AssignmentAPI.Models
{
    public class CourseAssignment

    {

        [Key]

        public int AssignmentId { get; set; }


        [Required]

        public string EmployeeId { get; set; } // UserId from Auth API with role Employee


        [Required]

        public int CourseId { get; set; }      // CourseId from Learning API


        public DateTime AssignedDate { get; set; } = DateTime.UtcNow;


        public int ModulesCompleted { get; set; } = 0;

        //public int TotalModules { get; set; } = 0;


        // Use double for progress to avoid precision issues with percentages

        public int Progress { get; set; } = 0; // Progress in percentage


        //public bool IsCompleted { get; set; } = false;

        public int TotalModules { get; internal set; }


        public DateTime EndDate { get; set; } = DateTime.UtcNow;

    }

}


