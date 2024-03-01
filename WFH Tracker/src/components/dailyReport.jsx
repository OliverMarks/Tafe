import { useState } from 'react';



export default function DailyReport({ setActivePage, setWeeklyReport, weeklyReport}) {
 
    const [employee, setEmployee] = useState({
    weekNumber: "",
    employeeID: '',
    employeeName: '',
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Total: '',
  })


  const [writeReport, setWriteReport] = useState([])


  const [dailyMessages, setDailyMessages] = useState({})
  const [weeklyMessage, setWeeklyMessage] = useState('')



  const [reportsSubmitted, setReportsSubmitted] = useState(1)
  const [submitState, setSubmitState] = useState(true)
  

  const handleChange = (event, key) => {
    const value = event.target.value
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [key]: value,
    }))
  }

  const getTotalWeekHours = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    return days.reduce((total, day) => total + Number(employee[day]), 0)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const totalWeekHours = getTotalWeekHours()
    setEmployee((prevEmployee) => ({
        ...prevEmployee,
        Total: totalWeekHours,
      }))
    const messages = {
      lessThanFour: 'Insufficient hours worked on',
      moreThanTen: 'Too many hours worked on',
      lessThanThirty: 'You didn’t do enough work this week',
      moreThanForty: 'You are working too hard!',
    }

    // Process daily hours and set appropriate messages
    const dailyMessages = {}
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    days.forEach((day) => {
      const hours = Number(employee[day])
      if (hours < 4) {
        dailyMessages[day] = `${messages.lessThanFour} ${day}`
      } else if (hours > 10) {
        dailyMessages[day] = `${messages.moreThanTen} ${day}`
      }
      console.log(dailyMessages[day])
    })

     let weeklyMessage = '';
     if (totalWeekHours < 30) {
       weeklyMessage = messages.lessThanThirty;
     } else if (totalWeekHours > 40) {
       weeklyMessage = messages.moreThanForty;
     }
     console.log(weeklyMessage);

    // Update state with the messages
    setDailyMessages(dailyMessages)
    setWeeklyMessage(weeklyMessage);

    setSubmitState(!submitState)


    // updates weekly report state as an array of objects
    setWeeklyReport((prevWeeklyReport) => [
      ...prevWeeklyReport,
      {
        weekNumber: employee.weekNumber,
        data: {
          [employee.employeeID]: getTotalWeekHours(),
        },
      },
    ]);


    //setting state of report to write 
    setWriteReport((prevWriteReport) => [...prevWriteReport, [employee]])

      checkWeeklyReportAvailability();

      

   
  }

  const checkWeeklyReportAvailability = () => {
    const weekNumber  = employee.weekNumber;
    const weekEntriesCount = Object.keys(weeklyReport[weekNumber] || {}).length;
    if (weekEntriesCount === 7) {
      alert(`Weekly report available for Week ${weekNumber}`);
    }
  };

  const handleNextEmployeeReport = () => {
    setDailyMessages("")
    setWeeklyMessage("")
    setEmployee({
        weekNumber: "",
        employeeID: '',
        employeeName: '',
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Total: '',
      })
      setSubmitState(!submitState)
    setReportsSubmitted(prevSubmitted => prevSubmitted +1)
  }

  function generateWeeklyStatements(weeklyReport) {
    let less = 0
    let more = 0
    let right = 0

    weeklyReport.forEach((weekData) => {
        const values = Object.values(weekData.data);
        if (values < 30) {
            less++
        } else if (values > 40) {
            more++
        } else if (values >= 37 && values <= 39) {
            right++
        }
    });

    return <>
            <p>The number of employees who worked less than 30 hours a week = {less} </p>
            <p> The number of employees who worked more than 40 hours a week = {more} </p>
            <p>The number of employees who worked between 37-39 hours = {right}</p>
            </>
  }

const handleWriteToFile = () => {
  const fileData = JSON.stringify(writeReport)
  const blob = new Blob([fileData], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.download = "user-info.txt"
  link.href = url
  link.click()
}








  return (
    <>
    {reportsSubmitted === 8 ? 
    
    <div className="week-report">


        <h3>Weekly Report</h3>
        <table className="weekly-rep-table">
          <tr>
            <th>Employee Number</th>
            {/* Loop through the weeklyReport to create the top row 
                Loop through the weeklyReport to create the second row */}
            {weeklyReport.map((weekData) => (
              <th key={weekData.weekNumber}>{Object.keys(weekData.data).join(', ')}</th>
            ))}
          </tr>
          <tr>
            <td>Total Hours</td>
            {weeklyReport.map((weekData) => (
              <td key={weekData.weekNumber}>{Object.values(weekData.data).join(', ')}</td>
            ))}
          </tr>
      </table>

              {generateWeeklyStatements(weeklyReport)}


              {/* Button should create text file of employee record */}
        <button onClick={handleWriteToFile}>Download Employee Record for the Week </button>

    </div>
    

 : 
        <div>
      <div className="daily-header">
        <h1>Daily Hours Worked</h1>
        <p>Employee Number {reportsSubmitted}</p>
      </div>

      <div className="daily-form">
        <form onSubmit={handleSubmit}>
          <label>
            Current Working Week Number
            <input required 
            type="number"
            value={employee.weekNumber}
            onChange={(event) => handleChange(event, 'weekNumber')}
            />
          </label>

          <div className="daily-employee-details">
            <label>
              Employee ID
              <input
                type="number"
                value={employee.employeeID}
                onChange={(event) => handleChange(event, 'employeeID')}
                required
              />
            </label>

            <label>
              Employee Name
              <input
                className='name-input'
                type="text"
                value={employee.employeeName}
                onChange={(event) => handleChange(event, 'employeeName')}
                required
              />
            </label>
          </div>


            <div className="form-days-message">

            <div className="form-days">
          <label>
            Monday
            <input
              type="number"
              value={employee.Monday}
              onChange={(event) => handleChange(event, 'Monday')}
              required
            />
          </label>

          <label>
            Tuesday
            <input
              type="number"
              value={employee.Tuesday}
              onChange={(event) => handleChange(event, 'Tuesday')}
              required
            />
          </label>

          <label>
            Wednesday
            <input
              type="number"
              value={employee.Wednesday}
              onChange={(event) => handleChange(event, 'Wednesday')}
              required
            />
          </label>

          <label>
            Thursday
            <input
              type="number"
              value={employee.Thursday}
              onChange={(event) => handleChange(event, 'Thursday')}
              required
            />
          </label>

          <label>
            Friday
            <input
              type="number"
              value={employee.Friday}
              onChange={(event) => handleChange(event, 'Friday')}
              required
            />
          </label>
          </div>

          <div className="daily-message">
            <h3>Employee Summary</h3>
          {employee.Total ?  <h3>Total hours worked: {employee.Total}</h3> : null}
        {Object.entries(dailyMessages).map(([day, message]) => (
          <p key={day}>{message}</p>
        ))}
        <h4>{weeklyMessage}</h4>

      </div>

      </div>
            <div className='form-buttons'>
          <button type="submit" onSubmit={handleSubmit} disabled = {!submitState ? true : false} >Submit & Generate Report for Employee</button>
          <button onClick={handleNextEmployeeReport} disabled = {submitState ? true : false} >Enter Data for Next Employee</button>
            </div>
        </form>
      </div>
            </div>
        }

    </>
  );
}
