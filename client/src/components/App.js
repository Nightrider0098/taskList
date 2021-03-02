import TaskTile from './TaskTile'
import { Calendar } from 'react-calendar';
import { CardColumns } from 'react-bootstrap';
import { TimePicker, DatePicker, Space } from 'antd';
import moment from 'moment';
const { useState, useEffect } = require('react')
require('../styles/App.css');
require('react-calendar/dist/Calendar.css');



function App() {
  const [currentTaskList, setCurrentTaskList] = useState([])
  const [calendarDate, setCalendarDate] = useState(moment().format('L'))
  const [calendarTime, setCalendarTime] = useState(moment().format('LTS'))

  useEffect(() => {
    fetch('/api/task').then(e => {
      if (e.status == 200) return e.json();
      if (e.status == 500) throw { message: 'backend server failed to respond' }
      throw e.json()
    }).then(data => {
      setCurrentTaskList(data)
    }).catch(e => {
      if (e.message)
        alert(e.message);
      else {
        alert("unknown error")
      }
    })

  }, [])


  return (
    <div className="App mt-5">
      <div>
        <input  onKeyDown={e => {
          if (e.key === 'Enter') {
            let taskName = e.target.value;
            fetch('/api/task', {
              method: 'post', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ date: new Date(), taskArray: { name: taskName, remindMeAt: calendarDate, toTrack: true } })
            }).then(e => {
              if (e.status == 200) {
                setCurrentTaskList([...currentTaskList, { date: new Date(calendarDate + " " + calendarTime), taskArray: [{ name: taskName, remindMeAt: new Date(), toTrack: true }] }]);
                alert('task added');
              }
            })
          }
        }} />


        <TimePicker onChange={(time, timeString) => { setCalendarTime(time.format('L')) }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
        <DatePicker onChange={(date, dateString) => { setCalendarDate(date.format('LTS')) }} />
      </div>
      <CardColumns className="mt-5 m-s-5">
        {typeof (currentTaskList) == typeof ([]) ? currentTaskList.map(e => <TaskTile data={e} />) : ""}
      </CardColumns>


    </div>
  );
}

export default App;
