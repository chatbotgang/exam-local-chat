import { useRef, useState } from "react";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const contenteditableRef = useRef<HTMLDivElement | null>(null);

  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    setMessage(event.currentTarget.innerText);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  }
  function handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      if (contenteditableRef.current === null) return;

      const isOnlySpacesOrLineBreaks =
        message.replace(/[\s\r\n]+/g, "").length === 0;
      if (!isOnlySpacesOrLineBreaks) {
        contenteditableRef.current.innerHTML = "";
        setMessage("");
        // TODO: send message to chat room
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full mt-6 flex flex-col">
        <div className="h-64 overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col">
            <div>
              <span className="text-green-500">Name</span>
              <span className="ml-1 text-gray-500 text-xs">
                Today at 3:05 PM
              </span>
            </div>
            <div className="dark:text-white">Hello</div>
          </div>
        </div>
        <div
          ref={contenteditableRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 empty:before:content-[attr(aria-placeholder)] empty:before:text-gray-500"
          contentEditable
          suppressContentEditableWarning
          aria-placeholder="Type your message"
          onInput={handleInput}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
