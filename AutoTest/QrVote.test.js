// File: src/components/qr/QRPage.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Qrver from './Qrver';

beforeEach(() => {
  // Limpiar localStorage antes de cada prueba
  localStorage.clear();
});

describe('Qrver Component', () => {

  it('should display the QR code after fetching it from the API', async () => {
    // Mock the fetch API to simulate a QR code response
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        qrCode: 'https://example.com/qr.png',
      }),
    });

    render(<Qrver />);

    // Check if loading message appears initially
    expect(screen.getByText(/Cargando código QR.../i)).toBeInTheDocument();

    // Wait for the QR code to appear
    await waitFor(() => screen.getByAltText(/QR Code/i));

    // Check if the QR code image appears
    const qrImage = screen.getByAltText('QR Code');
    expect(qrImage).toBeInTheDocument();
    expect(qrImage.src).toBe('https://example.com/qr.png');

    // Check if countdown is displayed
    expect(screen.getByText(/QR se actualizará en:/i)).toBeInTheDocument();
  });

  it('should use QR code from localStorage if available and countdown should be accurate', async () => {
    const mockQRCode = 'https://example.com/stored-qr.png';
    const mockTime = Date.now() - 60000; // Simulate 60 seconds passed
    localStorage.setItem('qrCode', mockQRCode);
    localStorage.setItem('lastQRCodeUpdate', mockTime);

    render(<Qrver />);

    // Check if the QR code is loaded from localStorage
    await waitFor(() => screen.getByAltText('QR Code'));
    const qrImage = screen.getByAltText('QR Code');
    expect(qrImage.src).toBe(mockQRCode);

    // Check the countdown time (should be approximately 60 seconds)
    expect(screen.getByText(/QR se actualizará en:/i)).toBeInTheDocument();
    expect(screen.getByText(/QR se actualizará en: 60 segundos/i)).toBeInTheDocument();
  });

  it('should call fetchQRCode and update countdown every second', async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        qrCode: 'https://example.com/qr.png',
      }),
    });

    render(<Qrver />);

    // Initially, QR code should be loading
    expect(screen.getByText(/Cargando código QR.../i)).toBeInTheDocument();

    // Fast-forward time to simulate countdown
    jest.advanceTimersByTime(1000);

    // Verify countdown decrementing by 1 second
    expect(screen.getByText(/QR se actualizará en:/i)).toHaveTextContent('QR se actualizará en: 119 segundos');

    // Simulate countdown reaching 0 and QR code should refresh
    jest.advanceTimersByTime(119000); // Advance time to 120 seconds
    expect(fetch).toHaveBeenCalledTimes(2); // Fetch should have been called twice (once initially, once after 120 seconds)
    
    jest.useRealTimers();
  });

});
