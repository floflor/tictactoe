import mongoose, { ClientSession } from "mongoose";

const handleTransactions = async <T>(
    fn: (session: ClientSession) => Promise<T>
  ): Promise<T> => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const result = await fn(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };

  export default handleTransactions;