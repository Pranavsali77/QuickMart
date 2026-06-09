package com.marketplace.E_commerce.controllers;

import com.marketplace.E_commerce.models.Feedback;
import com.marketplace.E_commerce.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/feedback")
@CrossOrigin(origins = "*")
public class UserFeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // POST: User submits feedback
    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok(savedFeedback);
    }
}
