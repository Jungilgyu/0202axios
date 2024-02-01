import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const MemberDropdown = ({ selectedGroup, defaultMember, onChange }) => {
  const [value, setValue] = useState(defaultMember);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  const memberItems = [
    { value: "도영", label: "도영", group: "NCT" },
    { value: "제노", label: "제노", group: "NCT" },
    { value: "재현", label: "재현", group: "NCT" },
    { value: "키", label: "키", group: "샤이니" },
    { value: "태민", label: "태민", group: "샤이니" },
    { value: "민호", label: "민호", group: "샤이니" },
    { value: "우지", label: "우지", group: "세븐틴" },
    { value: "호시", label: "호시", group: "세븐틴" },
    { value: "에스쿱스", label: "에스쿱스", group: "세븐틴" },
    { value: "필릭스", label: "필릭스", group: "스트레이키즈" },
  ];

  useEffect(() => {
    setValue(null);
    onChange(null);

    const filteredOptions = memberItems.filter(
      (option) => option.group === selectedGroup
    );
    setFilteredOptions(filteredOptions);
  }, [selectedGroup]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handleChange}
        size="small"
        disablePortal
        id="group-dropdown"
        options={filteredOptions}
        sx={{ width: "12rem" }}
        noOptionsText="해당 멤버가 없습니다"
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth />
        )}
      />
    </div>
  );
};

export default MemberDropdown;
