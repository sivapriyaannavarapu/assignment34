import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const DDDetails = ({ onBack, onPrint }) => {
  const [organization, setOrganization] = useState('');
  const [ddNumber, setDDNumber] = useState('');
  const [ddDate, setDDDate] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [city, setCity] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const handleSubmit = () => {
    if (!ddNumber || !ddDate) {
      console.warn('DD Number and Date are required');
      return;
    }
    onPrint({
      check_no: ddNumber,
    //   check_date: ddDate,
      bank,
      branch,
      city,
      ifsc_code: ifscCode,
      organization,
    });
  };

  return (
    <div className="container mt-4">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <p
          style={{
            color: '#82808F',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: 'normal',
            margin: 0,
          }}
        >
          Bank Information
        </p>
        <div
          style={{
            flex: 1,
            height: '1px',
            width: '40%',
            background: 'linear-gradient(to right, transparent 0%, #82808F 0%, transparent 60%)',
          }}
        ></div>
      </div>
      <div className="root mt-3">
        <div className="col-5">
          <Box
            sx={{
              borderRadius: '6px',
              backgroundColor: '#ffff',
              '& .MuiInputLabel-root': {
                color: '#404040',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  color: '#000',
                  fontFamily: 'Segoe UI',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  letterSpacing: '-0.084px',
                }}
              >
                Select Organization
              </InputLabel>
              <Select
                sx={{ width: '140%' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={organization}
                label="Select Organization"
                onChange={(e) => setOrganization(e.target.value)}
              >
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div
          className="col-7 mt-3 d-flex justify-content-between"
          style={{
            gap: '10px',
            color: '#404040',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '-0.072px',
          }}
        >
          <TextField
            sx={{
              width: '75%',
              '& .MuiInputLabel-root': {
                color: '#404040 !important',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
            id="outlined-basic"
            label="Cheque/DD no"
            variant="outlined"
            value={ddNumber}
            onChange={(e) => setDDNumber(e.target.value)}
          />
          <TextField
            sx={{
              width: '75%',
              '& .MuiInputLabel-root': {
                color: '#404040 !important',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
            id="outlined-basic"
            label="Cheque/DD Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={ddDate}
            onChange={(e) => setDDDate(e.target.value)}
          />
        </div>
        <div className="col-7 mt-3 d-flex justify-content-between" style={{ gap: '10px' }}>
          <TextField
            sx={{
              width: '75%',
              '& .MuiInputLabel-root': {
                color: '#404040 !important',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
            id="outlined-basic"
            label="Bank"
            variant="outlined"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
          <TextField
            sx={{
              width: '75%',
              '& .MuiInputLabel-root': {
                color: '#404040 !important',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
            id="outlined-basic"
            label="Branch"
            variant="outlined"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </div>
        <div className="col-7 mt-3 mb-5 d-flex justify-content-between" style={{ gap: '10px' }}>
          <TextField
            sx={{
              width: '75%',
              '& .MuiInputLabel-root': {
                color: '#404040 !important',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
            id="outlined-basic"
            label="City Name"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            sx={{
              width: '75%',
              '& .MuiInputLabel-root': {
                color: '#404040 !important',
                fontSize: '12px',
                fontWeight: 400,
                transform: 'translate(14px, 12px)',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                transform: 'translate(14px, -7px) scale(0.75)',
                color: '#404040',
              },
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '& fieldset': { borderColor: '#7D7D7D !important' },
                '&:hover fieldset': { borderColor: '#7D7D7D !important' },
                '&.Mui-focused fieldset': { borderColor: '#7D7D7D !important', borderWidth: '1px !important' },
              },
            }}
            id="outlined-basic"
            label="IFSC Code"
            variant="outlined"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />
        </div>
      </div>
      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        
        <Button
          variant="contained"
          sx={{ backgroundColor: '#3425FF', textTransform: 'capitalize' }}
          endIcon={<ArrowForward />}
          onClick={handleSubmit}
        >
          Print Receipt
        </Button>
      </Box>
    </div>
  );
};

export default DDDetails;