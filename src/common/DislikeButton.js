import { Button } from "reactstrap";

function DislikeButton({ handleClick, choice }) {
  return (
    <div>
      <Button onClick={() => handleClick(choice)} color="danger">
        Dislike
      </Button>
    </div>
  );
}

export default DislikeButton;
