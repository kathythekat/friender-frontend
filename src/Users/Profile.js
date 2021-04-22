import { useContext, useState } from "react";

import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import DislikeButton from "../common/DislikeButton";
import LikeButton from "../common/LikeButton";
import FrienderApi from "../api";
import UserContext from "../auth/userContext";

function Profile({ user }) {
  const { currentUser, filterUsers } = useContext(UserContext);
  const { username, firstName, age, interests, bio, location } = user;

  async function handleClick(choice) {
    if (choice === "like") {
      await FrienderApi.likeUser(currentUser.username, username);
    }
    if (choice === "dislike") {
      await FrienderApi.dislikeUser(currentUser.username, username);
    }
    filterUsers(username);
  }

  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src="/assets/318x180.svg"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">
            {firstName}, {age}
          </CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {bio}, {location}
          </CardSubtitle>
          <CardText>Interests: {interests}</CardText>
          <LikeButton handleClick={handleClick} choice="like" />
          <DislikeButton handleClick={handleClick} choice="dislike" />
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
