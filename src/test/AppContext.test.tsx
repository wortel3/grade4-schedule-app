import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppProvider } from '../context/AppContext';
import { useApp } from '../hooks/use-app';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <AppProvider>{children}</AppProvider>
);

describe('AppContext', () => {
  it('initializes with default user', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.user.name).toBe('');
    expect(result.current.user.onboardingComplete).toBe(false);
  });

  it('updates user data', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    
    act(() => {
      result.current.updateUser({ name: 'Gerhard', onboardingComplete: true });
    });
    
    expect(result.current.user.name).toBe('Gerhard');
    expect(result.current.user.onboardingComplete).toBe(true);
  });

  it('toggles tasks', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    
    act(() => {
      result.current.toggleTask('rest');
    });
    
    expect(result.current.completedTasks).toContain('rest');
    
    act(() => {
      result.current.toggleTask('rest');
    });
    
    expect(result.current.completedTasks).not.toContain('rest');
  });
});
