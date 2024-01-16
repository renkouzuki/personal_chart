import React, { useEffect, useRef } from "react";

function App() {
  const data = [
    { name: "Renko1", age: 25, salary: 600 },
    { name: "Renko2", age: 25, salary: 800 },
    { name: "Renko3", age: 25, salary: 200 },
    { name: "Renko4", age: 25, salary: 300 },
    { name: "Renko5", age: 25, salary: 400 },
    { name: "Renko6", age: 25, salary: 500 },
    { name: "Renko7", age: 25, salary: 600 },
    { name: "Renko8", age: 25, salary: 220 },
    { name: "Renko9", age: 25, salary: 600 },
    { name: "Renko10", age: 25, salary: 310 },
    { name: "Renko11", age: 25, salary: 700 },
    { name: "Renko12", age: 25, salary: 800 },
    { name: "Renko13", age: 25, salary: 600 },
    // Add more data as needed
  ];
  const canvasRef = useRef(null);

  const extractChartData = () => {
    const labels = data.map((item) => item.name);
    const salaryData = data.map((item) => item.salary);

    return { labels, salaryData };
  };

  const referenceValues = [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { labels, salaryData } = extractChartData();

    // Calculate canvas width dynamically based on the number of labels
    const canvasWidth = Math.max(labels.length * 50, 600); // Minimum width of 600
    canvas.width = canvasWidth;
    canvas.height = 300;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw X-axis
    context.beginPath();
    context.moveTo(50, 250);
    context.lineTo(canvasWidth - 50, 250);
    context.stroke();

    // Draw Y-axis
    context.beginPath();
    context.moveTo(50, 250);
    context.lineTo(50, 50);
    context.stroke();

    // Display salary values on the left side bar
    for (let i = 0; i < salaryData.length; i++) {
      const x = -15; // Adjust the X-coordinate for left side bar values
      const y = 250 - (salaryData[i] / 1000) * 150; // Adjust the Y-coordinate

      // Display salary values on the left side bar
      context.fillStyle = "red";
      context.fillText(salaryData[i], x + 20, y + 10);
    }

    // Draw the reference horizontal lines with thinner height and lineWidth
    context.lineWidth = 1; // Adjust the value to make the line thinner
    context.strokeStyle = "#d3d3d3"; // Adjust color as needed
    for (let i = 0; i < referenceValues.length; i++) {
      const referenceY = 250 - (referenceValues[i] / 1000) * 150;
      context.beginPath();
      context.moveTo(50, referenceY);
      context.lineTo(canvasWidth - 50, referenceY);
      context.stroke();
    }

    // Draw the line with smooth curves
    context.beginPath();
    context.moveTo(50, 250 - (salaryData[0] / 1000) * 150);

    for (let i = 0; i < labels.length - 1; i++) {
      const x1 = 50 + (i / (labels.length - 1)) * (canvasWidth - 100);
      const y1 = 250 - (salaryData[i] / 1000) * 150;
      const x2 = 50 + ((i + 1) / (labels.length - 1)) * (canvasWidth - 100);
      const y2 = 250 - (salaryData[i + 1] / 1000) * 150;

      const cp1x = x1 + (x2 - x1) / 4;
      const cp1y = y1;
      const cp2x = x1 + (x2 - x1) / 2;
      const cp2y = y2;

      context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
    }

    // Draw the actual line
    context.lineWidth = 2;
    context.strokeStyle = "red";
    context.stroke();

    // Draw dots as pin points
    for (let i = 0; i < labels.length; i++) {
      const x = 50 + (i / (labels.length - 1)) * (canvasWidth - 100);
      const y = 250 - (salaryData[i] / 1000) * 150;

      context.beginPath();
      context.arc(x, y, 5, 0, 2 * Math.PI);
      context.fillStyle = "darkRed";
      context.fill();
      context.stroke();

      // Display value label on top of each point as a text message icon with border radius
      context.fillStyle = "red";
      const iconWidth = 30;
      const iconHeight = 20;
      const borderRadius = 5;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x - 5, y - 15);
      context.lineTo(x + 5, y - 15);
      context.lineTo(x, y - 10);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.moveTo(x - 15 + borderRadius, y - 34);
      context.lineTo(x + 15 - borderRadius, y - 34);
      context.quadraticCurveTo(x + 15, y - 34, x + 15, y - 34 + borderRadius);
      context.lineTo(x + 15, y - 14 - borderRadius);
      context.quadraticCurveTo(x + 15, y - 14, x + 15 - borderRadius, y - 14);
      context.lineTo(x - 15 + borderRadius, y - 14);
      context.quadraticCurveTo(x - 15, y - 14, x - 15, y - 14 - borderRadius);
      context.lineTo(x - 15, y - 34 + borderRadius);
      context.quadraticCurveTo(x - 15, y - 34, x - 15 + borderRadius, y - 34);
      context.closePath();
      context.fill();
      context.stroke();
      context.fillStyle = "white";
      context.fillText(salaryData[i], x - 8, y - 20);
    }

    // Display name label under each point
    for (let i = 0; i < labels.length; i++) {
      const x = 50 + (i / (labels.length - 1)) * (canvasWidth - 100);
      const y = 265; // Adjust the Y-coordinate for name labels

      context.fillStyle = "black";
      context.fillText(labels[i], x, y + 15); // Adjust the Y-coordinate for name labels
    }

    // Create a linear gradient only under the graph line
    const gradient = context.createLinearGradient(0, 250, 0, 50);
    gradient.addColorStop(0, "rgba(255,0,0,0)"); // Transparent color
    gradient.addColorStop(1, "rgba(255,160,122,1)"); // Background color

    context.save();
    context.beginPath();
    context.moveTo(50, 250 - (salaryData[0] / 1000) * 150);

    for (let i = 0; i < labels.length - 1; i++) {
      const x1 = 50 + (i / (labels.length - 1)) * (canvasWidth - 100);
      const y1 = 250 - (salaryData[i] / 1000) * 150;
      const x2 = 50 + ((i + 1) / (labels.length - 1)) * (canvasWidth - 100);
      const y2 = 250 - (salaryData[i + 1] / 1000) * 150;

      const cp1x = x1 + (x2 - x1) / 4;
      const cp1y = y1;
      const cp2x = x1 + (x2 - x1) / 2;
      const cp2y = y2;

      context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
    }

    context.lineTo(
      50 + ((labels.length - 1) / (labels.length - 1)) * (canvasWidth - 100),
      250
    );
    context.lineTo(50, 250);
    context.closePath();

    context.clip();
    context.fillStyle = gradient;
    context.fillRect(50, 50, canvasWidth - 100, 200);
    context.restore();
  }, [data]);

  return (
    <div>
      <h2>Custom Chart Made By Renko</h2>
      <canvas ref={canvasRef} style={{ border: "1px solid #000" }} />
    </div>
  )
}

export default App
