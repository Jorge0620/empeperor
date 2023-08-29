import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { BiHomeSmile } from "react-icons/bi";

import './index.scss'

const ContactUS = () => {
    const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <div className='contact-us-page monkey-page'>
        <button className="home-link" onClick={()=>navigate("/home")}><BiHomeSmile /></button>
        <p className="title title-text gradient-text-1" mb={2}>
          Contact Us
        </p>
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            focused 
            color="success"
            InputProps={{
                style: {
                  color: 'white',
                  fontFamily: 'Outfit'
                },
              }}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            focused 
            type="email"
            color="success"
            InputProps={{
                style: {
                  color: 'white',
                  fontFamily: 'Outfit'
                },
              }}
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            focused 
            multiline
            rows={4}
            color="success"
            InputProps={{
                style: {
                  color: 'white',
                  fontFamily: 'Outfit'
                },
              }}
          />
          <Button variant="contained" color='warning' className='send-message-btn description-text' size="medium" type="submit" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default ContactUS;