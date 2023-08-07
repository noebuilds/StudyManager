// Get all the input elements
const inputElements = document.querySelectorAll('.calculator input[type="number"]');

// Group 1 elements: School Time, Homework Time
const group1Elements = [
  document.getElementById('workTime'),
  document.getElementById('sideHustlesTime'),
];

// Group 2 elements: Sleep Time and Play Time / Screen Time
const group2Elements = [
  document.getElementById('sleepTime'),
  document.getElementById('exerciseTime'),
];

// Store the original input values
const originalInputValues = {};
inputElements.forEach(input => {
  originalInputValues[input.id] = parseInt(input.value) || 0;
});

// Function to calculate and update the remaining time for each group
function updateRemainingTime() {
  // Calculate total hours entered by the user for each group
  let totalGroup1Hours = 0;
  group1Elements.forEach(input => {
    totalGroup1Hours += parseInt(input.value) || 0;
  });

  let totalGroup2Hours = 0;
  group2Elements.forEach(input => {
    totalGroup2Hours += parseInt(input.value) || 0;
  });

  let totalGroup3Hours = 0;
  inputElements.forEach(input => {
    if (!group1Elements.includes(input) && !group2Elements.includes(input)) {
      totalGroup3Hours += parseInt(input.value) || 0;
    }
  });

  // Calculate remaining time
  const remainingTime = 168 - (totalGroup1Hours + totalGroup2Hours + totalGroup3Hours);

  // Display remaining time near the chart
  const remainingTimeElement = document.getElementById('remainingTime');
  remainingTimeElement.textContent = `Remaining Time: ${remainingTime} hours`;

  // Display hours recorded per group near the chart
  const hoursPerGroupElement = document.getElementById('hoursPerGroup');
  hoursPerGroupElement.innerHTML = `
    <p>School Hours: ${totalGroup1Hours} hours</p>
    <p>Sleep & Play Time: ${totalGroup2Hours} hours</p>
    <p>Family Time: ${totalGroup3Hours} hours</p>
  `;

  // Update the pie chart
  const ctx = document.getElementById('time-chart').getContext('2d');
  const chartData = {
    labels: ['School', 'Sleep & Play', 'Family'],
    datasets: [
      {
        data: [totalGroup1Hours, totalGroup2Hours, totalGroup3Hours],
        backgroundColor: ['#F38CE6', '#36a2eb', '#ffce56'],
      },
    ],
  };

  const chartConfig = {
    type: 'pie',
    data: chartData,
    options: {
      maintainAspectRatio: false,
    },
  };

  // Destroy the previous chart instance to avoid duplicate charts
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Create the pie chart
  window.myChart = new Chart(ctx, chartConfig);
}

// Add event listener to each input element to update info whenever a user inputs something
inputElements.forEach(input => {
  input.addEventListener('input', updateRemainingTime);
});
