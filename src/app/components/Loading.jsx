import { FaSpinner } from "react-icons/fa6";

export default function Loading(props) {
  return (
      <FaSpinner size={props.size} color="var(--dark)" className="animate-spin" />
  );
}