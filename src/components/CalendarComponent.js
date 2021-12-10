import { Calendar } from "react-big-calendar"
import format from "date-fns/format"
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { dateFnsLocalizer } from "react-big-calendar"
import { month } from "react-big-calendar/lib/utils/dates"
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales ={
    "en-US" : require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

function CalendarComponent({events, onClickEvent}) {
    return (
        <>
            <Calendar
                    selectable
                    views={month}
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    popup={true}
                    onSelectEvent={onClickEvent}
                    style={{ 
                        height: 500, 
                        margin:"50px", 
                        background: "white", 
                        color: "black",
                        border: "2px solid black" }}
                />
        </>
    )
}

export default CalendarComponent
