import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { Button } from "@mui/base/Button";
import { Popper } from "@mui/base/Popper";
import { styled } from "@mui/system";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearIcon from "@mui/icons-material/Clear";

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  const [selectedValue, setSelectedValue] = useState(null);

  // const handleOptionClick = (value) => {
  //   setSelectedValue(value.label);
  //   props.onSelect && props.onSelect(value.label); // 새로운 onSelect props를 호출하여 선택한 값을 부모 컴포넌트로 전달합니다.
  // };

  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    componentName: "BaseAutocompleteIntroduction",
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <React.Fragment>
      <StyledAutocompleteRoot
        {...getRootProps(other)}
        ref={rootRef}
        className={focused ? "focused" : undefined}
      >
        <StyledInput
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
        />
        {hasClearIcon && (
          <StyledClearIndicator {...getClearProps()}>
            <ClearIcon />
          </StyledClearIndicator>
        )}

        <StyledPopupIndicator
          {...getPopupIndicatorProps()}
          className={popupOpen ? "popupOpen" : undefined}
        >
          <ArrowDropDownIcon />
        </StyledPopupIndicator>
      </StyledAutocompleteRoot>
      {anchorEl ? (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slots={{
            root: StyledPopper,
          }}
          modifiers={[
            { name: "flip", enabled: false },
            { name: "preventOverflow", enabled: false },
          ]}
        >
          <StyledListbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });

              return (
                <StyledOption {...optionProps}>{option.label}</StyledOption>
              );
            })}

            {groupedOptions.length === 0 && (
              <StyledNoOptions>No results</StyledNoOptions>
            )}
          </StyledListbox>
        </Popper>
      ) : null}
    </React.Fragment>
  );
});

Autocomplete.propTypes = {
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.oneOf([false]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly: PropTypes.bool,
};

export default function SearchBar() {
  return <Autocomplete options={top100Films} />;
}

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledAutocompleteRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: flex;
  gap: 5px;
  padding-right: 5px;
  overflow: hidden;
  width: 220px;

  &.focused {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  flex: 1 0 auto;
`
);

// ComponentPageTabs has z-index: 1000
const StyledPopper = styled("div")`
  position: relative;
  z-index: 1001;
  width: 220px;
`;

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 220px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  max-height: 100px;
  z-index: 1;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.3)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const StyledOption = styled("li")(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    cursor: pointer;
  }

  &[aria-selected=true] {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.base--focused,
  &.base--focusVisible {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.base--focusVisible {
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  &[aria-selected=true].base--focused,
  &[aria-selected=true].base--focusVisible {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }
  `
);

const StyledPopupIndicator = styled(Button)(
  ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;

    &:hover {
      background-color: ${
        theme.palette.mode === "dark" ? grey[700] : blue[100]
      };
      cursor: pointer;
    }

    & > svg {
      transform: translateY(2px);
    }

    &.popupOpen > svg {
      transform: translateY(2px) rotate(180deg);
    }
  `
);

const StyledClearIndicator = styled(Button)(
  ({ theme }) => `
    outline: 0;
    box-shadow: none;
    border: 0;
    border-radius: 4px;
    background-color: transparent;
    align-self: center;
    padding: 0 2px;

    &:hover {
      background-color: ${
        theme.palette.mode === "dark" ? grey[700] : blue[100]
      };
      cursor: pointer;
    }

    & > svg {
      transform: translateY(2px) scale(0.9);
    }
  `
);

const StyledNoOptions = styled("li")`
  list-style: none;
  padding: 8px;
  cursor: default;
`;

const top100Films = [
  { label: "테스트1" },
  { label: "테스트2" },
  { label: "테스트3" },
  { label: "테스트4" },
];
