import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import GroupDropdown from "../UI/Dropdown/GroupDropdown.jsx";
import MemberDropdown from "../UI/Dropdown/MemberDropdown.jsx";

import Chip from "@mui/material/Chip";

const BarterModify = ({
  defaultGroup,
  defaultOwnMember,
  defaultTargetMember,
  onChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedGroup, setSelectedGroup] = useState({ defaultGroup });

  const handleGroupChange = (group) => {
    setSelectedGroup(group || { value: "", label: "", avatarSrc: "" });
  };

  const [ownMembers, setOwnMembers] = useState([]);
  const [targetMembers, setTargetMembers] = useState([]);

  const [ownMembersInput, setOwnMembersInput] = useState("");
  const [targetMembersInput, setTargetMembersInput] = useState("");

  /// 수정해야함
  const handleOwnMemberChange = (member) => {
    if (member) {
      setOwnMembers((prevOwnMembers) => [...prevOwnMembers, member]);
      onChange([...ownMembers, member], targetMembers);
      setOwnMembersInput(member.value);
    } else {
      setOwnMembersInput(ownMembersInput);
    }
  };

  const handleTargetMemberChange = (member) => {
    if (member) {
      setTargetMembers((prevTargetMembers) => [...prevTargetMembers, member]);
      onChange(ownMembers, [...targetMembers, member]);
      setTargetMembersInput(member.value);
    } else {
      setTargetMembersInput(targetMembersInput);
    }
  };

  // 멤버 삭제 관련
  const handleOwnMemberDelete = (deletedMember) => {
    setOwnMembers(ownMembers.filter((member) => member !== deletedMember));
  };

  const handleTargetMemberDelete = (deletedMember) => {
    setTargetMembers(
      targetMembers.filter((member) => member !== deletedMember)
    );
  };

  return (
    <div>
      <div id="group-input" className="search-box-group">
        <h3>그룹명</h3>
        <GroupDropdown
          defaultGroup={defaultGroup}
          onChange={(group) => {
            handleGroupChange(group);
          }}
          stlye={{ width: "24rem !important" }}
        />
      </div>
      <div id="member-input">
        <div id="own-member-dropdown">
          <h3>보유한 멤버</h3>
          <MemberDropdown
            selectedGroup={defaultGroup.value}
            onChange={(member) => {
              handleOwnMemberChange(member);
            }}
          />
          <div>
            {defaultOwnMember &&
              defaultOwnMember.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag?.label}
                  variant="outlined"
                  onClick={() => handleOwnMemberDelete(tag)}
                  onDelete={() => handleOwnMemberDelete(tag)}
                  style={{
                    margin: "4px",
                    border: 0,
                    // backgroundColor: tag.color,
                    // color: "white",
                  }}
                />
              ))}
          </div>
        </div>
        <div>
          <h3>찾는 멤버</h3>
          <MemberDropdown
            selectedGroup={defaultGroup.value}
            defaultMember={defaultTargetMember}
            onChange={(member) => {
              handleTargetMemberChange(member);
            }}
          />
          <div>
            {defaultTargetMember &&
              defaultTargetMember.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag?.label}
                  variant="outlined"
                  onClick={() => handleTargetMemberDelete(tag)}
                  onDelete={() => handleTargetMemberDelete(tag)}
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

export default BarterModify;
