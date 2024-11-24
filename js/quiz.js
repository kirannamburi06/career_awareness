document.getElementById('quiz-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the values from the form
  const decided = document.querySelector('input[name="decided"]:checked');
  const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(input => input.value);
  const goal = document.querySelector('input[name="goal"]:checked');
  const subject = document.querySelector('input[name="subject"]:checked');
  const workType = document.querySelector('input[name="work-type"]:checked');
  const teamwork = document.querySelector('input[name="teamwork"]:checked');
  const problemSolving = document.querySelector('input[name="problem-solving"]:checked');
  const challenge = document.querySelector('input[name="challenge"]:checked');
  const workPreference = document.querySelector('input[name="work-preference"]:checked');
  const travel = document.querySelector('input[name="travel"]:checked');

  if (!decided || !goal || !subject || !workType || !teamwork || !problemSolving || !challenge || !workPreference || !travel) {
    alert('Please answer all questions!');
    return;
  }

  // Prepare the data to send to the API
  const quizData = {
    decided: decided.value,
    interests: interests,
    goal: goal.value,
    subject: subject.value,
    workType: workType.value,
    teamwork: teamwork.value,
    problemSolving: problemSolving.value,
    challenge: challenge.value,
    workPreference: workPreference.value,
    travel: travel.value,
  };

  const apiKey = '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'; // Replace with your actual OpenAI API key
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a career counselor helping students design a roadmap based on their quiz answers.'
          },
          {
            role: 'user',
            content: `Based on the following details, please generate a career roadmap for the user: 
                   Decided after 10th: ${quizData.decided}
                   Interests: ${quizData.interests.join(', ')}
                   Future goal: ${quizData.goal}
                   Favorite subject: ${quizData.subject}
                   Preferred work type: ${quizData.workType}
                   Teamwork preference: ${quizData.teamwork}
                   Problem-solving preference: ${quizData.problemSolving}
                   Challenge handling: ${quizData.challenge}
                   Work preference: ${quizData.workPreference}
                   Travel willingness: ${quizData.travel}`
          }
        ]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const roadmapContainer = document.getElementById('roadmap-container');
      
      const roadmapElement = document.getElementById('roadmap');

      // Parse the response and create HTML structure
      const roadmapText = data.choices[0].message.content;
      const roadmapLines = roadmapText.split('\n');

      let roadmapHTML = `
        <h3>Your Career Roadmap</h3>`;

      roadmapLines.forEach(line => {
        if (line.trim().startsWith('**')) { // Identify section headers
          roadmapHTML += `<h4>${line}</h4><ul>`;
        } else if (line.trim().endsWith('**')) { // Close sections
          roadmapHTML += `</ul>`;
        } else {
          roadmapHTML += `<li>${line}</li>`;
        }
      });

      roadmapHTML += `</ul>`; // Close the final list if open
      roadmapElement.innerHTML = roadmapHTML;
      roadmapContainer.style.display = 'block';
    }else {
      const errorData = await response.json();
      console.error('Error generating roadmap:', errorData);
      alert(`API Error: ${errorData.error.message}`);
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    alert('An error occurred while generating your roadmap. Please try again later.');
    
  }
});