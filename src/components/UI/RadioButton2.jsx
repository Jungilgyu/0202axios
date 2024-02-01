// 글 작성 라디오 버튼
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function RadioButton({ defaultType, onChange }) {
  const [value, setValue] = useState(defaultType); // 선택된 값 상태

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value); // 새로운 값으로 변경된 경우 콜백 호출
  };

  return (
    <FormControl component="fieldset" disabled={defaultType != null}>
      <div>
        <RadioGroup
          row
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="교환" control={<Radio />} label="교환" />
          <FormControlLabel value="판매" control={<Radio />} label="판매" />
        </RadioGroup>
      </div>
    </FormControl>
  );
}

export default RadioButton;
