import React from 'react';
import reactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { Appointment, AppointmentsDayView } from '../src/Appointment';

// 1st arg is Name or description of test. Name same as component being tested.
// 2nd arg function where define tests
describe('Appointment', () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement('div');
    })

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