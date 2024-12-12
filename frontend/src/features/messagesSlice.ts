import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../axiosApi.ts';

interface Message {
  author?: string;
  message: string;
  image?: string;
}

interface MessagesState {
  items: Message[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MessagesState = {
  items: [],
  status: 'idle',
};

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await axiosAPI.get('/api/messages');
  return response.data;
});

export const addMessage = createAsyncThunk('messages/addMessage', async (newMessage: Message) => {
  const response = await axiosAPI.post('/api/messages', newMessage);
  return response.data;
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.items.push(action.payload);
      });
  },
});

export default messagesSlice.reducer;
