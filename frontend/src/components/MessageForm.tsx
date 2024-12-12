import { FormEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addMessage } from "../features/messagesSlice.ts";
import { Box, Button, TextField, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const MessageForm = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const newMessage = {
      author: author || "Аноним",
      message,
      image: image ? URL.createObjectURL(image) : undefined,
    };

    dispatch(addMessage(newMessage));

    setAuthor("");
    setMessage("");
    setImage(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: "2" }}
    >
      <Typography variant="h6" color="primary">
        Add message
      </Typography>
      <TextField
        label="Name (not necessary)"
        variant="outlined"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
      >
        Send
      </Button>
    </Box>
  );
};

export default MessageForm;
