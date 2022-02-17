import React from 'react';
import reactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView';

// 1st arg is Name or description of test. Name same as component being tested.
// 2nd arg function where define tests
describe('Appointment', () => {
    let container;
    let customer;
    let stylist;
    let service;
    let note;
    let time;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component => reactDom.render(component, container);

    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley'};
        render(<Appointment customer={customer} />, container);
        expect(container.textContent).toMatch('Ashley');
    });

    it('renders another customer first name', () => {
        customer = { firstName: 'Jordan'};
        render(<Appointment customer={customer} />, container);
        expect(container.textContent).toMatch('Jordan');
    });

    it('renders a customers last name', () => {
        customer = { lastName: 'Chin'};
        render(<Appointment customer={customer} />, container);
        expect(container.textContent).toMatch('Chin');
    });

    it('renders another customers last name', () => {
        customer = { lastName: 'Smith'};
        render(<Appointment customer={customer} />, container);
        expect(container.textContent).toMatch('Smith');
    });

    it('renders a customers phone number', () => {
        customer = { phoneNumber: '1231231234' };
        render(<Appointment customer={customer} />, container);
        expect(container.textContent).toMatch('1231231234');
    });

    it('renders another customers phone number', () => {
        customer = { phoneNumber: '3213214321' };
        render(<Appointment customer={customer} />, container);
        expect(container.textContent).toMatch('3213214321');
    });

    it('renders the appointments stylists first name', () => {
        stylist = { firstName: "Ralph" };
        customer = { firstName: "John" };
        render(<Appointment customer={customer} stylist={stylist}/>);
        expect(container.textContent).toMatch("Ralph");
    })

    it('renders the service of the appointment', () => {
        service = "Cut";
        render(<Appointment service={service} />);
        expect(container.textContent).toMatch("Cut");
    })
    
    it('renders a note on the appointment', () => {
        note = "VIP"
        render(<Appointment note={note} />);
        expect(container.textContent).toMatch("VIP");
    })

    it('renders the time of the appointment', () => {
        time = "04:15";
        render(<Appointment time={time} />);
        expect(container.textContent).toMatch("04:15")
    })
})

// it function defines a single test. Refers to the noun name, 
// eg. Appointment (it) 
// renders the customer first name

// first argument is description of the test. Present-tense verb, renders, outputs, reads, etc.
// 2nd is test function

// great tests have 3 sections
// Arrange: Set up dependencies
// Act: Executes production code under test
// Assert: Checks expectations are met
// Short, Descriptive, Independent of other tests, has no side effects

describe('AppontmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [
        {
            startsAt: today.setHours(12,0),
            firstName: "Ashley",
        },
        {
            startsAt: today.setHours(13,0),
            firstName: "Jordan"
        },
    ];
    
    beforeEach(() => {
        container = document.createElement('div');
    })

    const render = component => {
        reactDom.render(component, container)
    }
    
    it('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    })

    it('renders multiple appointments in an ol element', () => {
        render(<AppointmentsDayView appointments={appointments} />)
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    })

    it('renders each appointment in an li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00')
        expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00')
    });

    it ('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        )
    });

    it('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li > button')).toHaveLength(2);
        expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
    });

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    })
})