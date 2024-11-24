document.addEventListener("DOMContentLoaded", () => {
    const roadmapContainer = document.getElementById("roadmap-container");
    const answers = JSON.parse(localStorage.getItem("quizAnswers"));
  
    const roadmap = {
      Science: ["Enroll in Science stream", "Prepare for NEET/JEE", "Pursue B.Sc./Engineering"],
      Arts: ["Choose Arts stream", "Explore creative fields like Design/Media", "Build a portfolio"],
      // Add more mappings
    };
  
    const stream = answers.includes("Science") ? "Science" : "Arts"; // Simplified logic
    const userRoadmap = roadmap[stream];
  
    userRoadmap.forEach(step => {
      const stepDiv = document.createElement("div");
      stepDiv.textContent = step;
      roadmapContainer.appendChild(stepDiv);
    });
  });
  