import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { Navbar } from '../ui/Navbar';
import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Cumpleaños de Arón',
    start: moment().toDate(),
    end: moment().add(2, 'hour').toDate(),
    notes: 'Comprar el pastel',
    user: {
      _id: '123',
      name: 'John',
    },
  },
];

const CalendarScreen = () => {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#004E89',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: '#F0F7F4',
    };

    return {
      style,
    };
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ height: '85vh', width: '100vw' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lastView}
          components={{
            event: CalendarEvent,
          }}
        />
        <CalendarModal />
      </div>
    </>
  );
};

export default CalendarScreen;
