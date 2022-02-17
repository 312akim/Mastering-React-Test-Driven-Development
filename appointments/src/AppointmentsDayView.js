import React, { useState } from 'react';

const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
}

export const Appointment = ({customer, stylist, service, note, time}) => {
    return (
        <>
            <h2>{time ? time : ""}</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Stylist Name</th>
                        <th>Service</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer ? customer.firstName : "No Customer"}</td>
                        <td>{customer ? customer.lastName : "No Customer"}</td>
                        <td>{customer ? customer.phoneNumber : "No Customer"}</td>
                        <td>{stylist ? stylist.firstName : "No Stylist"}</td>
                        <td>{service ? service : "No Service"}</td>
                        <td>{note ? note : "No Note"}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export const AppointmentsDayView = ({appointments}) => {
    const [selectedAppointment, setSelectedAppointment] = useState(0);

    return (
        <div id="appointmentsDayView">
            <ol>
                {appointments.map((appointment, i) => 
                    <li key={appointment.startsAt}>
                        <button type="button" onClick={() => setSelectedAppointment(i)}>
                            {appointmentTimeOfDay(appointment.startsAt)}
                        </button>
                    </li>
                )}
            </ol>
            {
                appointments.length === 0 ? 
                <p>There are no appointments scheduled for today.</p> :
                <Appointment customer={{...appointments[selectedAppointment]}} time={appointments[selectedAppointment].startsAt} />
            }
        </div>
    )
}