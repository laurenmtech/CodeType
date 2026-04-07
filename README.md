# CodeType - Coding Practice Typing Website

A typing practice web application focused on computer science concepts, designed specifically for learning coding terminology through fill-in-the-blank exercises. Inspired by my need to study for exams but wanting to practice coding more. 

## Features

- **6 Practice Sections:**
  - Operating Systems
  - Algorithms
  - Data Structures
  - Java
  - C
  - C++

- **Fill-in-the-Blank Learning:**
  - Read definitions and descriptions with missing key terms
  - Type the correct answer for each blank
  - Instant visual feedback (green for correct, red for incorrect)
  - See correct answers when you make mistakes

- **Real-time Statistics:**
  - Words Per Minute (WPM)
  - Accuracy tracking
  - Progress indicator
  - Timer

- **Interactive Practice:**
  - 8 prompts per section covering key concepts
  - Educational definitions with contextual learning
  - Clean, modern UI with smooth animations
  - Responsive design

## How to Use

1. Open `index.html` in your browser
2. Select a section (OS, Algorithms, Data Structures, Java, C, or C++)
3. Read the sentence with blanks (shown as `___`)
4. Type the missing word or term
5. Press **Enter** to submit your answer
6. Continue filling all blanks to complete the exercise
7. View your final results with WPM, accuracy, and errors

## Example

**Prompt:** "Bubble sort repeatedly compares ___ elements and swaps them if they are in wrong order. Time complexity is ___."

**Answers:** "adjacent", "O(n²)"

## Adding New Content

To add more practice prompts, edit `sections.js`:

```javascript
{
    topic: "Your Topic Name",
    text: "Your definition with ___ for blanks and more ___ blanks.",
    answers: ["first answer", "second answer"]
}
```

Make sure the number of `___` in the text matches the number of items in the `answers` array.

## File Structure

- `index.html` - Main HTML structure
- `style.css` - Styling and animations
- `sections.js` - Practice content for each section
- `app.js` - Application logic and typing mechanics

## Customization

- **Colors:** Edit CSS variables in `style.css` (`:root` section)
- **Difficulty:** Add longer or more complex prompts in `sections.js`
- **New Sections:** Add new categories by extending the `sections` object

## Future Enhancements

- User profiles and progress tracking
- Difficulty levels (beginner, intermediate, advanced)
- Code snippet typing (with syntax)
- Leaderboards
- Practice history and analytics
- Custom prompt creation

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
