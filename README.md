## Inspiration
MeetingMetric was inspired by the need to streamline business meetings and enhance productivity. HR teams often struggle with analysing meeting productivity and assessing team performance during these meetings, and our goal is to provide more concrete insights to what each person is contributing as well as the areas that can be improved.

## What it does
MeetingMetric uses an advanced AI model to analyse meeting transcripts and provide ratings based off a specific set of criteria. It helps HR teams extract key insights through numerical ratings attributed to each person and each message, as well as the meeting as a whole.

## How we built it
Using language models from huggingface, we extract individual messages from a .txt business meeting transcript inputted by the user and use the model to return a score from 0-1 for a set number of criteria, such as collaboration with others, staying on task, asking insightful questions etc.

## Challenges we ran into
The main challenges we ran into were website implementation problems, GitHub conflicts, file compatibility and language compatibility issues

## Accomplishments that we're proud of
We're proud that we were able to successfully integrate AI into the process of performance evaluation in a meaningful way, and that it successfully parsed the transcript and gave us meaningful insights on the given transcripts.

## What we learned
We learned how to integrate an LLM into a web based project and feed it prompts and receive different types of responses. We also learned a lot of different integration techniques for front and backend development.

## What's next for MeetingMetric
Going forward we hope to integrate more advanced features, such as ways to summarise the meeting as a whole, or providing the user with specific ways in which each individual person could improve during the meetings in order to maximise the effectiveness of the meetings. 
