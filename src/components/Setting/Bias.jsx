import React, { useState } from "react";

import { Avatar, Button } from "@mui/material";
import GroupDropdown from "../UI/Dropdown/GroupDropdown";
import MemberDropdown from "../UI/Dropdown/MemberDropdown";

const Bias = () => {
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

  const handleApplyClick = () => {
    const url = generateImageUrl(selectedGroup.value, selectedMember?.value);
    setImageUrl(url);
  };

  return (
    <div className="profile-item-container">
      <h2 className="profile-title">최애 추가</h2>
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
        <div id="bias-member-container">
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
        <Avatar id="bias-avatar" key={imageUrl} src={imageUrl} />
      </div>
      <div>
        <Button variant="contained" onClick={handleApplyClick}>
          적용
        </Button>
      </div>
    </div>
  );
};

export default Bias;
