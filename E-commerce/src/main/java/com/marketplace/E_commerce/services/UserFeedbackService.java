package com.marketplace.E_commerce.services;

import com.marketplace.E_commerce.models.Feedback;
import com.marketplace.E_commerce.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Save user feedback
    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}
