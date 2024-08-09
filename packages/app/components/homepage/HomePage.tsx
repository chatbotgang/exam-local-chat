import useCurrentUser from "@/hooks/useCurrentUser";
import usePersistentCallback from "@/hooks/usePersistentCallback";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { curUserName, setCurUserName } = useCurrentUser();
  const navigate = useNavigate();

  if (curUserName) {
    navigate("/chat");
  }

  const handleKeyDown = usePersistentCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setCurUserName(e.currentTarget.value);
      }
    },
  );

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="fixed left-0 top-0 w-screen h-screen z-[-1]">
        <picture>
          <source
            srcSet="
    homepage/homepage-320.jpg 320w,
    homepage/homepage-480.jpg 480w,
    homepage/homepage-640.jpg 640w,
    homepage/homepage-750.jpg 750w,
    homepage/homepage-1080.jpg 1080w,
    homepage/homepage-1280.jpg 1280w,
    homepage/homepage-1440.jpg 1440w,
    homepage/homepage-1920.jpg 1920w,
    homepage/homepage-2560.jpg 2560w
  "
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 640px) 600px, (max-width: 750px) 700px, (max-width: 1080px) 1000px, (max-width: 1280px) 1200px, (max-width: 1440px) 1400px, (max-width: 1920px) 1900px, 2560px"
          ></source>
          <img
            className="w-full h-full"
            src="homepage/homepage-320.jpg"
            alt="Responsive Homepage Image"
          />
        </picture>
      </div>
      <div className="bg-black bg-opacity-50 p-1 md:p-4 lg:p-10 rounded-md">
        <TextField
          label="User Name"
          InputProps={{ onKeyDown: handleKeyDown }}
        />
      </div>
    </div>
  );
}
