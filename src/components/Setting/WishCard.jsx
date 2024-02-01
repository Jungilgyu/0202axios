import React, { useState } from "react";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

import GroupDropdown from "../UI/Dropdown/GroupDropdown";
import MemberDropdown from "../UI/Dropdown/MemberDropdown";

const WishCard = () => {
  const [selectedGroup, setSelectedGroup] = useState({
    value: "",
    label: "",
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleGroupChange = (group) => {
    if (group == null) {
      group = {
        value: "",
        label: "",
        avatarSrc: "",
      };
    }
    setSelectedGroup(group);
  };

  const handleMemberChange = (member) => {
    setSelectedMember(member);
  };

  const generateImageUrl = (group, member) => {
    if (group && member) {
      return `assets/images/${group}_${member}.PNG`;
    }
    return null;
  };

  const handleWishCard = () => {
    // 갈망포카 등록 메서드
  };

  // 키워드 관련
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [helperText, setHelperText] = useState("");

  const getChipColor = (index) => {
    const colors = ["#FB37A3", "#FD9DD1", "rgba(142, 96, 203, 1)"];
    return colors[index];
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setHelperText("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (tags.length < 3) {
        setTags([
          ...tags,
          { label: inputValue.trim(), color: getChipColor(tags.length) },
        ]);
        setInputValue("");
      } else {
        setHelperText("태그 개수는 최대 3개입니다.");
      }
    }
  };

  const handleChipDelete = (deletedTag) => {
    setTags(tags.filter((tag) => tag !== deletedTag));
    setHelperText("");
  };

  return (
    <div className="profile-item-container">
      <h2 className="profile-title">갈망포카 추가</h2>
      <div className="profile-dropdown-container">
        <div className="profile-group-container">
          <div>그룹명</div>
          <div>
            <GroupDropdown
              onChange={(group) => {
                handleGroupChange(group);
              }}
            />
          </div>
        </div>
        <div id="wishcard-member-container">
          <div>멤버명</div>
          <div>
            <MemberDropdown
              selectedGroup={selectedGroup.value}
              onChange={(member) => {
                handleMemberChange(member);
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div id="wishcard-input-container">
          <TextField
            size="small"
            placeholder="앨범명, 콘서트명, 버전명, 종류 등을 입력하세요."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            sx={{ width: "100%" }}
            helperText={helperText}
          />

          <div>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag.label}
                variant="outlined"
                onClick={() => handleChipDelete(tag)}
                onDelete={() => handleChipDelete(tag)}
                size="small"
                style={{
                  margin: "4px",
                  border: 0,
                  backgroundColor: tag.color,
                  color: "white",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Button variant="contained" onClick={handleWishCard}>
          적용
        </Button>
      </div>
    </div>
  );
};

export default WishCard;
