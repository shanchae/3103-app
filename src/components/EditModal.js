import DateTimePicker from "react-datetime-picker/dist/DateTimePicker"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from "react"

function EditModal({closeModal, currentEvent, onUpdateEvent}) {
    const [event, setEvent] = useState(currentEvent)
    const start = new Date(currentEvent.start)
    const end = new Date(currentEvent.end)

    function handleEditFormSubmit(e) {
        e.preventDefault()
        onUpdateEvent(event.id, event)
        closeModal(false)
    }

    

    return (
        <div className="modal-bg">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Edit Event</h2>
                    <span 
                        onClick={() => closeModal(false)}
                        className="icon">
                            x
                    </span>
                </div>
                <div className="modal-body">
                    <input 
                        type="text"
                        value={event.title}
                        onChange={(e) => setEvent({...event, title: e.target.value})}
                    />
                    <p>
                        Starts: {start.toDateString()} - {start.toLocaleTimeString()}
                    </p>
                    <DateTimePicker
                        disableClock={true}
                        disableCalendar={true}
                        selected={event.start}
                        dayPlaceholder="dd"
                        monthPlaceholder="mm"
                        yearPlaceholder="yyyy"
                        hourPlaceholder="hh"
                        minutePlaceholder="mm"
                        onChange={(start) => setEvent({...event, start: new Date(start)})}
                    />
                    <p>
                        Ends: {end.toDateString()} - {end.toLocaleTimeString()}
                    </p>
                    <DateTimePicker
                        disableClock={true}
                        disableCalendar={true}
                        selected={event.end}
                        dayPlaceholder="dd"
                        monthPlaceholder="mm"
                        yearPlaceholder="yyyy"
                        hourPlaceholder="hh"
                        minutePlaceholder="mm"
                        onChange={(end) => setEvent({...event, end: new Date(end)})}
                    />
                    <span 
                        className="icon"
                        onClick={handleEditFormSubmit}
                    >
                        ✔
                    </span>
                </div>
            </div>
        </div>
    )
}

export default EditModal

