import { createSlice } from '@reduxjs/toolkit';

const eventListSlice = createSlice({
    name: 'eventList',
    initialState: {
        eventData: [],
    },
    reducers: {
        setEventData: (state, action) => {
            state.eventData = action.payload;
        },
    },
});

const { reducer } = eventListSlice;
const selectorCustomer = (state) => state.eventList;
const { setEventData } = eventListSlice.actions;
export { setEventData, selectorCustomer };

export default reducer;