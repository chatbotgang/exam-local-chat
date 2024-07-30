import Header from "./components/Header";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <UserForm />
    </div>
  );
};

export default App;
