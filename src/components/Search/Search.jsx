import { useState } from "react";
import { Button } from "../UI/Button.jsx";
// import styled from 'styled-components';
import { addSearchData } from "../../store2/search.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RadioButton2 from "../UI/RadioButton.jsx";
import BarterWrite2 from "../../components/PostWrite/BarterWrite2.jsx";
import SellWrite2 from "../../components/PostWrite/SellWrite2.jsx";
import TypeDropdown2 from "../UI/Dropdown/TypeDropdown2.jsx";
import SearchIcon from '@mui/icons-material/Search';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


const Search = function () {
  const [userInput, setUserInput] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isExchange, setIsExchange] = useState(true);
  const [targetMembers, setTargetMembers] = useState([]);
  const [ownMembers, setOwnMembers] = useState([]);
  const [targetMembersInput, setTargetMembersInput] = useState(null);
  const [ownMembersInput, setOwnMembersInput] = useState(null);
  const [cardType, setCardType] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTypeChange = (cardType) => {
    if (cardType == null) {
      cardType = {
        value: "",
        label: "",
      };
    }
    setCardType(cardType);
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value)
  }

  function onClick() {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  }

  const handleOwnMemberSelection = (members) => {
    setOwnMembers(members);
  };

  const handleTargetMemberSelection = (members) => {
    setTargetMembers(members);
  };

  function onExchangeChange(value) {
    setIsExchange(value === "option1");
  }

  function handleSearchClick () {
    let userInputCondition = {};

    // 사용자가 입력한 값이 있으면 검색 조건에 추가
    if (userInput) {
      userInputCondition = { userInput: userInput };
    }

    const searchData = {
      ownMembers: ownMembers.length > 0 ? ownMembers[0].value : ownMembersInput,
      targetMembers: targetMembers.length > 0 ? targetMembers[0].value : targetMembersInput,
      cardType: cardType ? cardType.value : null,
      ...userInputCondition 
    };

    console.log(searchData)
    dispatch(addSearchData(searchData));
    navigate("/post");
  }

  const handleUserInputClick = (event) => {
    event.stopPropagation(); // 클릭 이벤트 버블링 중단
  }
  
  return (
    // <section id="user-input">
    <div id="search-container"> 
      <h3>어떤 포카를 찾으시나요?</h3>
      
      {!isClicked ? (
        <div style={{ position: 'relative' }}>
          <input
            id="title-input"
            value={userInput}
            
            onChange={handleUserInputChange}
            variant="outlined"
            placeholder='앨범, 버전명 등을 입력해주세요'
            style={{ paddingLeft: '2rem' }} // 아이콘의 공간 확보를 위해 입력 상자의 왼쪽 패딩을 추가
          />
          <FaSearch style={{ position: 'absolute', top: '50%', left: '0.5rem', transform: 'translateY(-50%)', color:'gray' }} />
          <IoIosArrowDown onClick={onClick} style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)' }} />
        </div>
      ) : (
      <div>

        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <RadioButton2 onChange={onExchangeChange} />
        </div>

        <div style={{ position: 'relative' }}>
          <input
            id="title-input"
            value={userInput}
            onChange={handleUserInputChange}
            variant="outlined"
            placeholder='앨범, 버전명 등을 입력해주세요'
            style={{ paddingLeft: '2rem' }} // 아이콘의 공간 확보를 위해 입력 상자의 왼쪽 패딩을 추가
          />
          <FaSearch style={{ position: 'absolute', top: '50%', left: '0.5rem', transform: 'translateY(-50%)', color:'gray' }} />
          <IoIosArrowUp onClick={onClick} style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)' }} />
        </div>

        <div>
          {isExchange ? (
            <BarterWrite2
              onChange={(ownMembers, targetMembers) => {
                handleOwnMemberSelection(ownMembers);
                handleTargetMemberSelection(targetMembers);
              }}
            />
          ) : (
            <SellWrite2 />
          )}
        </div>
        <div>
          <h3>포토카드 종류</h3>
          <TypeDropdown2
            onChange={(type) => {
              handleTypeChange(type);
            }}
          />
        </div>
        <Button 
          onClick={handleSearchClick}
          sx={{
             mt: 2,
             ml: 18,
             width: "120px",
             height: "50px"
            }}
        >
            검색
        </Button>
      </div>
      )}
    </div>
    // </section>
  );
};

export default Search;
