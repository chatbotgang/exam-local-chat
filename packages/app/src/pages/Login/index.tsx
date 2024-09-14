import { useState } from "react";

const bgUrls = [
  "https://images6.alphacoders.com/135/thumb-1920-1354313.jpeg",
  "https://static.vecteezy.com/system/resources/thumbnails/029/554/988/small_2x/surprised-cat-scottish-isolated-on-white-background-generative-ai-photo.jpg",
  "https://c4.wallpaperflare.com/wallpaper/101/380/61/cat-animals-bokeh-cute-wallpaper-preview.jpg",
];

function getRandomBgUrl() {
  const currentSecond = new Date().getSeconds();
  return bgUrls[currentSecond % bgUrls.length];
}
const url = getRandomBgUrl();

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 items-center justify-center h-screen bg-cover bg-center`}
      style={{ backgroundImage: `url(${url})` }}
    >
      <h1 className="h-12 w-1/2 min-w-[450px] text-2xl font-bold flex justify-center items-center bg-white bg-opacity-80 rounded-2xl border p-4">
        Login
      </h1>
      <form
        className="w-1/2 min-w-[450px] flex gap-4 bg-white bg-opacity-80 rounded-2xl border p-4 overflow-scroll"
        onSubmit={handleLogin}
      >
        <input
          className="flex-1 bg-white p-4 rounded-md outline-none"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button
          className="h-16 min-w-40 p-4 bg-[#110c2b] text-white rounded-md"
          type="submit"
        >
          {`Login ₍^⸝⸝> ·̫ <⸝⸝ ^₎`}
        </button>
      </form>
    </div>
  );
};

export default Login;
