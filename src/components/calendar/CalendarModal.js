import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';

import '../../styles/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

import { uiCloseModal } from '../../actions/ui';
import {
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
} from '../../actions/events';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hour');
const nowPastHour = now.clone().add(1, 'hour');

const initEvent = {
  title: 'Event:',
  notes: '',
  star: now.toDate(),
  end: nowPastHour.toDate(),
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPastHour.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'Please enter a valid date', 'error');
    }
    if (title.trim().length < 3) {
      return setTitleValid(false);
    }
    // TODO: sent form values to db
    if (activeEvent) {
      // actualized
      dispatch(eventUpdated(formValues));
    } else {
      // create a new event
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: '124',
            name: 'Roberto',
          },
        })
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    // <button onClick={openModal}>Open Modal</button>
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-bg"
      closeTimeoutMS={300}
    >
      <h1>{activeEvent ? 'Edit Event' : 'New Event'}</h1>
      <hr />
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>Date time init</label>
          <DatePicker
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            showTimeSelect
            className="form-control"
            onChange={handleStartDateChange}
            selected={dateStart}
          />
        </div>

        <div className="form-group">
          <label>Date time end</label>
          <DatePicker
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            showTimeSelect
            className="form-control"
            onChange={handleEndDateChange}
            selected={endDate}
            minDate={dateStart}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${
              !titleValid ? 'is-invalid' : 'is-valid'
            }`}
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            A short description
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Additional Information
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary w-100 mt-3">
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
