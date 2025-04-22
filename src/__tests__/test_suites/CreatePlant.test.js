import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

// Mock the global fetch function
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

afterEach(() => {
  global.fetch.mockClear();
});

describe('2nd Deliverable', () => {
  test('adds a new plant when the form is submitted', async () => {
    // Mock initial plants fetch
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    const { getByPlaceholderText, getByText, findByText } = render(<App />);

    const firstPlant = { name: 'foo', image: 'foo_plant_image_url', price: '10' };

    // Mock the POST response
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(firstPlant),
      })
    );

    // Fill out the form
    fireEvent.change(getByPlaceholderText('Plant name'), { 
      target: { value: firstPlant.name } 
    });
    fireEvent.change(getByPlaceholderText('Image URL'), { 
      target: { value: firstPlant.image } 
    });
    fireEvent.change(getByPlaceholderText('Price'), { 
      target: { value: firstPlant.price } 
    });

    // Prevent default form submission
    const form = getByText('Add Plant').closest('form');
    const submitHandler = jest.fn(e => e.preventDefault());
    form.onsubmit = submitHandler;

    // Submit the form
    fireEvent.click(getByText('Add Plant'));

    // Check if fetch was called correctly
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firstPlant),
      });
    });

    // Verify the new plant appears in the DOM
    const newPlant = await findByText('foo');
    expect(newPlant).toBeInTheDocument();
  });
});