import { Button } from "reactstrap";

function LikeButton({ handleClick, choice }) {
  return (
    <div>
      <Button onClick={() => handleClick(choice)} color="primary">Like</Button>{" "}
    </div>
  );
}

export default LikeButton;
