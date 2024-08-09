import DarkModeSwitcher from "./DarkModeSwitcher";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div>Exam Local Chat</div>
          <DarkModeSwitcher />
        </div>
      </div>
    </header>
  );
}
