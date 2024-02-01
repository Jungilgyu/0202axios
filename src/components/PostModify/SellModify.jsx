import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GroupDropdown from "../UI/Dropdown/GroupDropdown.jsx";
import MemberDropdown from "../UI/Dropdown/MemberDropdown.jsx";

import Chip from "@mui/material/Chip";

const SellModify = ({ defaultGroup, defaultOwnMember, onChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedGroup, setSelectedGroup] = useState({
    value: "",
    label: "",
    avatarSrc: "",
  });

  const handleGroupChange = (group) => {
    setSelectedGroup(group || { value: "", label: "", avatarSrc: "" });
  };

  const [ownMembers, setOwnMembers] = useState([]);

  const handleOwnMemberChange = (member) => {
    if (member) {
      setOwnMembers((prevOwnMembers) => [...prevOwnMembers, member]);
      onChange([...ownMembers, member]);
    }
  };

  // 멤버 삭제 관련
  const handleOwnMemberDelete = (deletedMember) => {
    setOwnMembers(ownMembers.filter((member) => member !== deletedMember));
  };

  return (
    <div>
      <div id="group-input">
        <h3>그룹명</h3>
        <GroupDropdown
          onChange={(group) => {
            handleGroupChange(group);
          }}
        />
      </div>
      <div id="member-input">
        <div id="own-member-dropdown">
          <h3>멤버</h3>
          <MemberDropdown
            selectedGroup={selectedGroup.value}
            defaultMember={defaultOwnMember}
            onChange={(member) => {
              handleOwnMemberChange(member);
            }}
          />
          <div>
            {ownMembers &&
              ownMembers.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag?.label}
                  variant="outlined"
                  onClick={() => handleOwnMemberDelete(tag)}
                  onDelete={() => handleOwnMemberDelete(tag)}
                  style={{
                    margin: "4px",
                    border: 0,
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellModify;
