import styled from "@emotion/styled";
import Header from "../components/Header";
import ChatRecord from "../components/ChatRecord";
import ChatInput from "../components/ChatInput";

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default function ChatPage() {
  return (
    <PageLayout>
      <Header />
      <ChatRecord />
      <ChatInput />
    </PageLayout>
  );
}
