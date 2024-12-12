import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface MessageProps {
  message: {
    author?: string;
    message: string;
    image?: string;
  };
}

const MessageItem: React.FC<MessageProps> = ({ message }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "1rem auto" }}>
      <CardContent>
        <Typography variant="h6">{message.author}</Typography>
        <Typography variant="body1">{message.message}</Typography>
        {message.image && (
          <CardMedia
            component="img"
            image={message.image}
            alt="message"
            sx={{ marginTop: "1rem" }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MessageItem;
