const {useState,useEffect} = require('react')
require('./App.css');
require('react-calendar/dist/Calendar.css');
const {Calendar} = require('react-calendar');


function App() {
  const [currentTaskList,setCurrentTaskList] = useState([])
const [calendarDate,setCalendarDate] = useState(new Date())
  useEffect(() => {
    fetch('/api/task').then(e=>{
      if(e.status==200)return e.json();
      if(e.status ==500) throw { message: 'backend server failed to respond'}
      throw e.json()
    }).then(data=>{
      setCurrentTaskList(data)
    }).catch(e=>{
      if(e.message)
        alert(e.message);
      else{
        alert("unknown error")
      }
    })
   
  }, [])
  return (
    <div className="App">
      Today's task {JSON.stringify(currentTaskList)}

      <br />
      <div>
        <input onKeyDown={e=>{if(e.key === 'Enter') {
          let taskName = e.target.value;
      fetch('/api/task',{method: 'post', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({date: new Date(),taskArray :{name: taskName, remindMeAt: calendarDate, toTrack: true}})} ).then(e=>{
        if(e.status==200){
          setCurrentTaskList([...currentTaskList , {date: calendarDate,taskArray :{name: taskName, remindMeAt: new Date(), toTrack: true}}]);
          alert('task added');
        }})
        }}}/>
         <Calendar
        onChange={setCalendarDate}
        value={calendarDate}
      />
      
      </div>
    </div>
  );
}

export default App;
