using GrowthPath.FeedbackAPI.Data;
using GrowthPath.FeedbackAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace GrowthPath.FeedbackAPI.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly FeedbackDbContext _context;

        public FeedbackRepository(FeedbackDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            try
            {
                return await _context.Feedbacks.ToListAsync();
            }
            catch (Exception ex)
            {
                // Log exception
                Console.Error.WriteLine($"Error fetching all feedbacks: {ex.Message}");
                throw;
            }
        }

        public async Task<Feedback> GetFeedbackById(string feedbackId)
        {
            try
            {
                return await _context.Feedbacks.FindAsync(feedbackId);
            }
            catch (Exception ex)
            {
                // Log exception
                Console.Error.WriteLine($"Error fetching feedback with ID {feedbackId}: {ex.Message}");
                throw;
            }
        }

        public async Task<IEnumerable<Feedback>> GetFeedbacksByCourseId(int courseId)
        {
            try
            {
                return await _context.Feedbacks.Where(f => f.CourseId == courseId).ToListAsync();
            }
            catch (Exception ex)
            {
                // Log exception
                Console.Error.WriteLine($"Error fetching feedbacks for course ID {courseId}: {ex.Message}");
                throw;
            }
        }

        public async Task AddFeedback(Feedback feedback)
        {
            try
            {
                _context.Feedbacks.Add(feedback);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception
                Console.Error.WriteLine($"Error adding feedback: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateFeedback(Feedback feedback)
        {
            try
            {
                _context.Entry(feedback).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception
                Console.Error.WriteLine($"Error updating feedback with ID {feedback.FeedbackId}: {ex.Message}");
                throw;
            }
        }

        public async Task DeleteFeedback(int feedbackId)
        {
            try
            {
                var feedback = await _context.Feedbacks.FindAsync(feedbackId);
                if (feedback != null)
                {
                    _context.Feedbacks.Remove(feedback);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    Console.Error.WriteLine($"Feedback with ID {feedbackId} not found.");
                }
            }
            catch (Exception ex)
            {
                // Log exception
                Console.Error.WriteLine($"Error deleting feedback with ID {feedbackId}: {ex.Message}");
                throw;
            }
        }
    }
}
