import DarkModeSwitcher from "./DarkModeSwitcher";

export default function Header() {
  return (
    <header className="shadow dark:shadow-white bg-white/90 dark:bg-gray-800/90 dark:text-white">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div>Exam Local Chat</div>
          <DarkModeSwitcher />
        </div>
      </div>
    </header>
  );
}
