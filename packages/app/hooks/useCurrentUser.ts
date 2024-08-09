import useStorage from "./useStorage";

export default function useCurrentUser() {
  const [curUserName, setCurUserName] = useStorage("username", "", "session");
  return {
    curUserName,
    setCurUserName,
  };
}
