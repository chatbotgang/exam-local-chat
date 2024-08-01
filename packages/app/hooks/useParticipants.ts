const DEMO_PARTICIPANTS_KEY: string = "DEMO_PARTICIPANTS_KEY";

type useParticipantsReturn = {
  joinRoom: (username: string) => void;
  leaveRoom: (username: string) => void;
  getParticipants: () => string[];
};

const useParticipants = (): useParticipantsReturn => {
  const getParticipants = (): string[] => {
    const participantsString = localStorage.getItem(DEMO_PARTICIPANTS_KEY);
    if (participantsString) {
      return JSON.parse(participantsString) as string[];
    }

    return [];
  };

  const joinRoom = (username: string) => {
    const participants: string[] = getParticipants();

    if (participants.find((participant) => participant === username)) {
      return;
    }
    localStorage.setItem(
      DEMO_PARTICIPANTS_KEY,
      JSON.stringify([...participants, username]),
    );
  };

  const leaveRoom = (username: string) => {
    const participants: string[] = getParticipants();
    localStorage.setItem(
      DEMO_PARTICIPANTS_KEY,
      JSON.stringify(
        participants.filter((participant) => participant !== username),
      ),
    );
  };

  return { joinRoom, leaveRoom, getParticipants };
};

export default useParticipants;
