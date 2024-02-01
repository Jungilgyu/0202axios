import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Avatar } from "@mui/material";
import logo1 from "../../../assets/images/logo_nct.png";
import logo2 from "../../../assets/images/logo_shinee.jpg";

const GroupDropdown = ({ defaultGroup, onChange }) => {
  const groupItems = [
    { value: "NCT", label: "NCT", avatarSrc: logo1 },
    { value: "샤이니", label: "샤이니", avatarSrc: logo2 },
    { value: "세븐틴", label: "세븐틴", avatarSrc: logo1 },
    { value: "스트레이키즈", label: "스트레이키즈", avatarSrc: logo1 },
  ];

  const [value, setValue] = useState(defaultGroup);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        size="small"
        id="group-dropdown"
        options={groupItems}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{ width: "12rem" }}
        noOptionsText="해당 그룹이 없습니다"
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <Avatar
              src={option.avatarSrc}
              sx={{ mr: 1, width: "1.5rem", height: "1.5rem" }}
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <React.Fragment>
                  {value && (
                    <Avatar
                      sx={{ ml: 1, width: "1.5rem", height: "1.5rem" }}
                      src={
                        groupItems.find(
                          (option) => option.label === value.label
                        )?.avatarSrc
                      }
                    />
                  )}
                  {params.InputProps.startAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default GroupDropdown;
