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

  it('reorders activities', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const phase = 'arrival';
    const initialFirstId = result.current.activities[phase][0].id;
    const initialSecondId = result.current.activities[phase][1].id;

    act(() => {
      result.current.reorderActivities(phase, 0, 1);
    });

    expect(result.current.activities[phase][0].id).toBe(initialSecondId);
    expect(result.current.activities[phase][1].id).toBe(initialFirstId);
  });

  it('updates phase names', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const phase = 'arrival';
    const newName = { en: 'Morning Fun', af: 'Oggend Pret' };

    act(() => {
      result.current.updatePhaseName(phase, newName);
    });

    expect(result.current.phaseNames[phase]).toEqual(newName);
  });

  it('adds and removes activities', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const phase = 'arrival';
    const initialCount = result.current.activities[phase].length;

    act(() => {
      result.current.addActivity(phase, {
        label: { en: 'New Task', af: 'Nuwe Taak' },
        iconName: 'Smile',
        hasTimer: false
      });
    });

    expect(result.current.activities[phase].length).toBe(initialCount + 1);
    const addedTask = result.current.activities[phase][initialCount];
    expect(addedTask.label.en).toBe('New Task');

    act(() => {
      result.current.removeActivity(phase, addedTask.id);
    });

    expect(result.current.activities[phase].length).toBe(initialCount);
  });

  it('resets progress', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    
    act(() => {
      result.current.toggleTask('rest');
      result.current.resetProgress();
    });

    expect(result.current.completedTasks.length).toBe(0);
    expect(result.current.lastInteraction).toBeNull();
  });
});
