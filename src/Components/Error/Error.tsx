import { FC } from "react";

import "./Error.css";

interface Errors {
  error: string;
}

const Error: FC<Errors> = ({ error }) => {
  return <div className="error">{error}</div>;
};
export default Error;
