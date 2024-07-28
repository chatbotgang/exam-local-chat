import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useUpdateUserName() {
  const navigate = useNavigate();

  return useCallback(
    (userName: string) => {
      navigate(`/${userName}`);
    },
    [navigate],
  );
}
