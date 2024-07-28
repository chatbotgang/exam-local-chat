import { Validate } from "react-hook-form";

const requiredWithTrimmed: Validate<string, unknown> = (value) => {
  return !!value.trim();
};

export default requiredWithTrimmed;
