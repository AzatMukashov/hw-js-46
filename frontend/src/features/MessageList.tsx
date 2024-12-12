import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { fetchMessages } from "./messagesSlice";
import MessageItem from "../components/MessageItem.tsx";
import { Box } from "@mui/material";

const MessageList = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.items);
  const status = useAppSelector((state) => state.messages.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMessages());
    }
  }, [status, dispatch]);

  return (
    <Box sx={{ maxWidth: 600, Margin: "0 auto" }}>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;
