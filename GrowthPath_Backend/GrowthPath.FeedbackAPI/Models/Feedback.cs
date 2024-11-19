namespace GrowthPath.FeedbackAPI.Models
{

    public class Feedback
    {
        public int FeedbackId { get; set; }
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public int Rating { get; set; }
        public string Suggestion { get; set; }
    }
}