import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    // Here, you can send the feedback to your server or perform any other necessary actions.
    // For this example, we'll just mark it as submitted.
    setSubmitted(true);
  };

  return (
    <Container className="mt-5">
      <h2>Feedback</h2>
      {submitted ? (
        <div>
          <p>Thank you for your feedback!</p>
          <p>We appreciate your input.</p>
        </div>
      ) : (
        <Form>
          <Form.Group controlId="feedback">
            <Form.Label>Share your feedback:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={feedback}
              onChange={handleFeedbackChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default Feedback;
