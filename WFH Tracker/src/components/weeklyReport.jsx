import { useState } from "react";

export default function WeeklyReport() {
  const [numberOfReport, setNumberOfReport] = useState("");
  const [reportData, setReportData] = useState([]);
  const [producedData, setProducedData] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // New state for alert message

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setReportData(jsonData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        } finally {
          event.target.value = ""; // Reset the file input
        }
      };
      reader.readAsText(file);
    }
  };

  const handleProduceReport = () => {
    if (!numberOfReport || isNaN(numberOfReport) || numberOfReport <= 0) {
      setAlertMessage("Please enter a valid number of reports to produce.");
      return;
    }

    // Flatten the nested arrays
    const flattenedData = reportData.flat();

    // Sort the data in reverse order and then slice the number of entries based on numberOfReport
    const producedEntries = flattenedData
      .slice()
      .reverse()
      .slice(0, numberOfReport);

    if (producedEntries.length < numberOfReport) {
      setAlertMessage(`Only ${producedEntries.length} records available.`);
    } else {
      setAlertMessage(""); // Clear the alert message
    }

    setProducedData(producedEntries);
  };

  // Function to generate the table rows from the JSON data
  const generateTableRows = (data) => {
    return data.map((entry, index) => (
      <tr key={index}>
        <td>{entry.weekNumber}</td>
        <td>{entry.employeeID}</td>
        <td>{entry.employeeName}</td>
        <td>{entry.Monday}</td>
        <td>{entry.Tuesday}</td>
        <td>{entry.Wednesday}</td>
        <td>{entry.Thursday}</td>
        <td>{entry.Friday}</td>
      </tr>
    ));
  };

  return (
    <div className="weekly-container">
      <h1>Produce Weekly Report</h1>
      <form>
        <label>
          Select the number of entries you would like to display
          <input
            type="number"
            value={numberOfReport}
            onChange={(e) => setNumberOfReport(e.target.value)}
          />
        </label>

        <label htmlFor="fileInput">Select report file</label>
        <input
          id="fileInput"
          className="file-input"
          type="file"
          onChange={(e) => {
            handleFileUpload(e);
            const fileName = e.target.files[0]?.name;
            document.getElementById("fileInput").nextElementSibling.innerHTML = fileName || "No file chosen";
          }}
        />
      </form>

      <button onClick={() => handleProduceReport()}>Produce report</button>

      {alertMessage && <div className="alert">{alertMessage}</div>} {/* Show alert message if present */}

      {producedData.length > 0 && (
        <div className="produced-data">
          <h2>Produced Data</h2>
          <table>
            <thead>
              <tr>
                <th>Week Number</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>{generateTableRows(producedData)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
