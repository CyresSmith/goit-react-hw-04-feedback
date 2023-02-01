import { useState } from 'react';
import Box from './shared/Box';
import Section from './shared/Section/Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';

const App = () => {
  const [feedbackState, setFeedbackState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const feedbackCollect = key => {
    setFeedbackState(prevState => {
      return { ...prevState, [key]: prevState[key] + 1 };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedbackState;
    const total = { total: good + neutral + bad };
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedbackState;
    const total = countTotalFeedback().total;
    const positive = ((good / total) * 100).toFixed(2);
    const PositiveFeedbackPercentage = {
      positive: positive + '%',
    };
    return PositiveFeedbackPercentage;
  };

  const statTypesArr = Object.keys(feedbackState);

  const statDataObj = Object.assign(
    {},
    feedbackState,
    countTotalFeedback(),
    countPositiveFeedbackPercentage()
  );

  return (
    <Box variant="container">
      <Section title="Pleas Leave Feedback">
        <FeedbackOptions
          statTypesArr={statTypesArr}
          onClick={feedbackCollect}
        />
      </Section>

      <Section title="Statistic">
        <Statistics statDataObj={statDataObj} />
      </Section>
    </Box>
  );
};

export default App;
