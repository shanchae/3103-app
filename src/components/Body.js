/* eslint-disable eqeqeq */
import { useEffect, useState } from "react"
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker"
import 'react-datetime-picker/dist/DateTimePicker.css'
import events from "../data/events"
import EditModal from "./EditModal"
import CalendarComponent from "./CalendarComponent"


function Body() {
    const [ newEvent, setNewEvent ] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [currentEvent, setCurrentEvent] = useState({})

    const [ allEvents, setAllEvents ] = useState(() => {

        const savedEvents = localStorage.getItem("events")

        if (savedEvents) {
            return JSON.parse(savedEvents)
        } else {
            return events
        }
    })

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(allEvents))
    }, [allEvents])

    function handleClickEvent(newEvent){
        setOpenModal(true)
        setCurrentEvent({...newEvent})
    }

    function handleUpdateEvent(id, updatedEvent) {
        const updatedItem = allEvents.map((event) => {
            return event.id === id ? updatedEvent : event
        })
        setAllEvents(updatedItem)
    }

    function handleAddEvent(e){
        e.preventDefault()
        
        if (newEvent !== {}) {
            setAllEvents([
                ...allEvents,
                {...newEvent,
                    id: new Date()
                }
            ])
        }
        
        console.log(newEvent)
        setNewEvent({})
    }  


    
    return (
        <div className="cal-body">
            <div className="picker">
                <input 
                    type="text"
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DateTimePicker
                    disableClock={true}
                    disableCalendar={true}
                    selected={newEvent.start}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    onChange={(start) => setNewEvent({...newEvent, start : new Date(start)})}
                />
                <DateTimePicker
                    disableClock={true}
                    disableCalendar={true}
                    style={{
                        background: "white"
                    }}
                    selected={newEvent.end}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    hourPlaceholder="hh"
                    minutePlaceholder="mm"
                    onChange={(end) => setNewEvent({...newEvent, end : new Date(end)})}
                />
                <button className="button" onClick={handleAddEvent}>Add</button>
            </div>
            
            {openModal && 
                <EditModal 
                    closeModal={setOpenModal}
                    onUpdateEvent={handleUpdateEvent}
                    currentEvent={currentEvent} 
                />
            }
            <div className="calendar">
                <CalendarComponent
                    events={allEvents}
                    onClickEvent={handleClickEvent}
                />
            </div>
        </div>
    )
}

export default Body
