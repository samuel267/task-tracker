import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const isBrowser = typeof window !== 'undefined';

const loadState = () => {
    if (!isBrowser) return undefined;
    try {
        const serializedState = localStorage.getItem('tasks');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error('Could not load state:', error);
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
    preloadedState: {
        tasks: loadState(),
    },
});

if (isBrowser) {
    store.subscribe(() => {
        const state = store.getState();
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
