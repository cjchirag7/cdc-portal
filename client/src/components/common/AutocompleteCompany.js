import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Chip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddCompanyDialog from './AddCompanyDialog';

const filter = createFilterOptions();

function AutocompleteCompany(props) {
  const [inputValue, setInputValue] = useState('');
  const { selectedCompany, setSelectedCompany, label, companiesData, isLoading, required } = props;
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  return (
    <>
      <Autocomplete
        fullWidth
        options={companiesData}
        autoHighlight
        loading={isLoading}
        value={selectedCompany}
        inputValue={inputValue}
        onInputChange={(e, newValue) => setInputValue(newValue)}
        onChange={(e, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              setOpenDialogCreate(true);
              setSelectedCompany({
                name: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            setOpenDialogCreate(true);
            setSelectedCompany({
              name: newValue.inputValue,
              category: '',
              website: '',
            });
          } else {
            setSelectedCompany(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const foundExactMatch = filtered.length >= 1 && filtered[0].name === params.inputValue;
          if (params.inputValue !== '' && !foundExactMatch) {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.name} &nbsp;{' '}
            {option.category && <Chip label={option.category} variant="outlined" color="primary" />}
          </Box>
        )}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            required={required || false}
            label={label}
            fullWidth
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <AddCompanyDialog
        openDialogCreate={openDialogCreate}
        setOpenDialogCreate={setOpenDialogCreate}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    </>
  );
}

export default AutocompleteCompany;
