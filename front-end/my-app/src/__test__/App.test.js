import React from 'react'
import { render,screen } from '@testing-library/react';
import Header from '../header/Header';

test('render test One',()=>{
    render(<Header/>);
    expect(screen.getByText('LOGO')).toBeInTheDocument();
})