import { Socket } from "socket.io";

const handleEvent = (
  socket: Socket,
  handler: (...args: any[]) => Promise<void>
) => {
  return async (...args: any[]): Promise<void> => {
    try {
      await handler(...args);
    } catch (error: any) {
      console.error(error);
      socket.emit("error", error.message);
    }
  };
};
export default handleEvent;
