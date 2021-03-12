import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';


test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)

    const header = screen.getByText('Contact Form')
    expect(header).toBeVisible()
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText("First Name*")
    userEvent.type(firstNameInput, 'Hey')
    // screen.debug()
    const firstNameError = await screen.getByTestId('error')
   

    expect(firstNameError).toBeInTheDocument()
    // screen.debug()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

    render(<ContactForm/>);

    const button = screen.getByRole('button')

    userEvent.click(button)
    // screen.debug()

    const errors = await screen.findAllByTestId(/error/i)

    expect(errors.length).toEqual(3)
    // screen.debug()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    
    const firstNameInput = screen.getByLabelText("First Name*")
    userEvent.type(firstNameInput, 'Randy')
    // expect(firstNameError).toBeInTheDocument()

    const lastNameInput = screen.getByLabelText('Last Name*')
    userEvent.type(lastNameInput, 'Ortiz')
    // expect(lastNameError).toBeInTheDocument()
    
    const button = screen.getByRole('button')
    
    userEvent.click(button)

    const error = await screen.findAllByTestId(/error/i)
    expect(error.length).toEqual(1)
    //  screen.debug()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);

    const emailInput = screen.getByLabelText(/email/i)
    userEvent.type(emailInput, 'Randyortiz')
    const emailError = await screen.getByTestId('error')
    expect(emailError).toBeInTheDocument()
    // screen.debug()
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const lastNameInput = screen.getByLabelText('Last Name*')
    userEvent.type(lastNameInput, '')

    const button = screen.getByRole('button')
    userEvent.click(button)

    const lastNameError = await screen.findByText(/lastName is a required field/i)
    expect(lastNameError).toBeInTheDocument()
    screen.debug()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});