import Image from "next/image";

interface StarRatingProps {
  attempts: number;
  height: number;
  width: number;
  maxAttempts: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  attempts,
  height,
  width,
  maxAttempts,
}) => {
  const starOnSrc = "/starOn.svg";
  const starOffSrc = "/starOff.svg";
  let stars = [];
  for (let i = 0; i < attempts; i++) {
    stars.push(
      <Image
        src={starOnSrc}
        height={height}
        width={width}
        alt="star depicts rest of attempts"
      />
    );
  }
  for (let i = 0; i < maxAttempts - attempts; i++) {
    stars.push(
      <Image
        src={starOffSrc}
        height={height}
        width={width}
        alt="star depicts lost attempts"
      />
    );
  }
  return <div>{stars}</div>;
};

export default StarRating;
