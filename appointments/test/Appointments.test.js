import React from 'react';
import reactDom from 'react-dom';
import { Appointment } from '../src/Appointment';

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