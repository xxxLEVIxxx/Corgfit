import React from 'react';
import { render } from '@testing-library/react-native';
import TargetMuscle from '../TargetMuscle';

// Mock the useExercises hook to provide test data
jest.mock('@/app/Context', () => ({
    useExercises: () => ({
      exercises: [
        { category: 'Back' },
        { category: 'Biceps' },
        { category: 'Chest' },
      ],
      setExercises: jest.fn(),
    }),
  }));
  
  describe('TargetMuscle Component', () => {
    it('renders the target muscles correctly', () => {
      const { getByText } = render(<TargetMuscle />);
      
      expect(getByText('Back')).toBeTruthy();
      expect(getByText('Biceps')).toBeTruthy();
      expect(getByText('Chest')).toBeTruthy();
    });
  });