import { useState } from 'react'

import WeeklyReport from './components/weeklyReport'
import DailyReport from './components/dailyReport'
import ExitScreen from './components/exitScreen'
import './App.css'


function App() {
  const [activePage, setActivePage] = useState('');
  const [weeklyReport, setWeeklyReport] = useState([])


  function toggleActivePage(page) {
    setActivePage(page);
  }

  return (
    <div className="main-container">
    <div className='header'>
    <h1>Work From Home Tracker</h1>
    <button onClick={() => setActivePage('')}>Home</button>

    </div>
      {!activePage ? (
        <div className='home-buttons'>
          <button onClick={() => toggleActivePage('employeeRecord')}>Enter Daily Hours Worked</button>
          <button onClick={() => toggleActivePage('weeklyReport')}>Produce Hours Worked Report</button>
          <button onClick={() => toggleActivePage('exit')}>Exit the application</button>
        </div>
      ) : null}

      {activePage === 'employeeRecord' && 
      <DailyReport
      setActivePage = {setActivePage} 
      weeklyReport={weeklyReport}
      setWeeklyReport= {setWeeklyReport}
      />}
      
      
      
      {activePage === 'weeklyReport' && 
      <WeeklyReport 
      setActivePage = {setActivePage} />}
      
      
      
      {activePage === 'exit' && 
      
      <ExitScreen 
      setActivePage = {setActivePage} />}
    </div>
  );
}

export default App;
