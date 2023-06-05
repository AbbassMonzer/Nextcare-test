import { createAction } from '@ngrx/store'; //Creates a configured Creator function that, when called, returns an object in the shape of the Action interface.

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
