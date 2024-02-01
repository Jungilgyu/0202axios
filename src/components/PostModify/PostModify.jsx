import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Container, TextField, Button, TextareaAutosize } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { modifyPost } from "../../store2/post.js";

import RadioButton2 from "../../components/UI/RadioButton2.jsx";
import BarterModify from "./BarterModify.jsx";
import SellModify from "./SellModify.jsx";
import TypeDropdown from "../UI/Dropdown/TypeDropdown.jsx";

const PostModify = () => {
  // 어떤 게시글의 수정페이지 인가?
  const { id } = useParams();
  const posts = useSelector((state) => (state.post ? state.post.posts : []));
  const post = posts.find((p) => p.id == id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post.title);
  const [images, setImages] = useState(post.images);
  const [imagePreviews, setImagePreviews] = useState(post.images);
  const [content, setContent] = useState(post.content);
  const [ownMembers, setOwnMembers] = useState(post.ownMembers);
  const [targetMembers, setTargetMembers] = useState(
    post.type === "교환" ? post.targetMembers : []
  );
  const [cardType, setCardType] = useState(post.cardType);

  const handleOwnMemberSelection = (members) => {
    setOwnMembers(members);
  };

  const handleTargetMemberSelection = (members) => {
    setTargetMembers(members);
  };

  const handleTypeChange = (cardType) => {
    if (cardType == null) {
      cardType = {
        value: "",
        label: "",
      };
    }
    setCardType(cardType);
  };

  // 제목 변경 핸들러
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 이미지 변경 핸들러
  const handleImageDelete = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    setImagePreviews((prevImagePreviews) => {
      const newImagePreviews = [...prevImagePreviews];
      newImagePreviews.splice(index, 1);
      return newImagePreviews;
    });
  };

  const fileInputRef = useRef(null);
  const handleImageAdd = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages((prevImages) => [...prevImages, ...Array.from(files)]);

    const newImages = Array.from(files);
    const newImagePreviews = [];

    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        // 모든 파일의 미리보기 이미지가 준비되면 상태 업데이트
        if (newImagePreviews.length === newImages.length) {
          setImagePreviews((prevImagePreviews) => [
            ...prevImagePreviews,
            ...newImagePreviews,
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // 내용 변경 핸들러
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // 게시물 수정
  // 날짜는 그대로
  const handleModifyClick = () => {
    const modifiedPost =
      post.type === "교환"
        ? {
            id: post.id,
            writerId: post.writerId,
            writerNickname: post.writerNickname,
            title,
            images,
            group: post.group,
            ownMembers,
            targetMembers,
            content,
            cardType,
            type: "교환",
            isBartered: post.isBartered,
          }
        : {
            id: post.id,
            writerId: post.writerId,
            writerNickname: post.writerNickname,
            title,
            images,
            group: post.group,
            ownMembers,
            content,
            type: "판매",
            isSold: post.isSold,
          };

    // Redux를 통해 게시물 수정
    dispatch(modifyPost(modifiedPost));
    navigate("/post");
  };

  const handleCancelButton = () => {
    console.log("게시물 수정 취소");
    navigate("/post");
  };

  return (
    <Container>
      <h2 className="write-title">게시글 수정하기</h2>
      <div id="write-container">
        <div id="write-radio-container">
          <RadioButton2 defaultType={post.type} />
        </div>
        <div id="title-container">
          <h3>제목</h3>
          <input
            id="title-input"
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            placeholder="앨범명, 버전명을 입력하세요"
          />
        </div>

        <div id="group-member-input">
          {post.type === "교환" ? (
            <BarterModify
              defaultGroup={post.group}
              defaultOwnMember={ownMembers}
              defaultTargetMember={targetMembers}
              onChange={(ownMembers, targetMembers) => {
                handleOwnMemberSelection(ownMembers);
                handleTargetMemberSelection(targetMembers);
              }}
            />
          ) : (
            <SellModify
              defaultGroup={post.group}
              defaultOwnMember={ownMembers}
              onChange={(ownMembers) => {
                handleOwnMemberSelection(ownMembers);
              }}
            />
          )}
        </div>
        <div id="card-input">
          <h3>포토카드 종류</h3>
          <TypeDropdown
            defaultCardType={cardType}
            onChange={(type) => {
              handleTypeChange(type);
            }}
          />
        </div>
        <div id="image-input">
          <div>
            <h3>사진 (클릭시 삭제됩니다.)</h3>
            <p className="info-msg">
              * 사진 사이즈는 포토카드 사이즈가 좋아요!
            </p>
          </div>
          <div id="image-list">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
              multiple
            />
            <div id="image-add-button" onClick={handleImageAdd}>
              <AddIcon id="image-add-icon" />
            </div>
            {imagePreviews &&
              imagePreviews.map((preview, index) => (
                <div
                  className="image-container"
                  key={index}
                  onClick={() => handleImageDelete(index)}
                >
                  <img
                    className="image-preview"
                    src={preview}
                    alt={`Image Preview ${index + 1}`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div id="content-input-container">
          <h3>상세 내용</h3>
          <textarea
            className="content-input"
            value={content}
            onChange={handleContentChange}
            placeholder="포토카드 상태에 대한 세부 내용을 적어주세요."
          />
        </div>
        <div id="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleModifyClick}
            style={{ marginRight: "10px" }}
          >
            수정
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleCancelButton}
          >
            취소
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PostModify;
