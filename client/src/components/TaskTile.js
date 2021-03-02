import React from 'react'
import { Card, Button } from 'react-bootstrap';
function TaskTile(props) {
    return (

        <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
                <Card.Title>{new Date(props.data.date).toDateString()}</Card.Title>
                <Card.Text>
                    {props.data.taskArray.map(e => e.name)}
                </Card.Text>
                <Button onClick={()=>{ 
fetch('/api/task',{method:"patch",body:{
    type: 1
}})


                }}>Done</Button>
                <Button>Postpone</Button>
            </Card.Body>
        </Card>
    )
}
export default TaskTile;