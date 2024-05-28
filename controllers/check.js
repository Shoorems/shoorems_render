async function creditAccount(accountNumber, amount) {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        const opts = { session, new: true };

        const account = await Account.findOneAndUpdate(
            { accountNumber },
            { $inc: { balance: amount } },
            opts
        );

        await session.commitTransaction();
        session.endSession();

        return account;
    } catch (error) {
        console.error("Error in crediting account:", error);
        throw error;
    }
}

// Function to debit amount from an account
async function debitAccount(accountNumber, amount) {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const opts = { session, new: true };

        const account = await Account.findOneAndUpdate(
            { accountNumber, balance: { $gte: amount } },
            { $inc: { balance: -amount } },
            opts
        );

        if (!account) {
            throw new Error("Insufficient balance");
        }

        await session.commitTransaction();
        session.endSession();

        return account;
    } catch (error) {
        console.error("Error in debiting account:", error);
        throw error;
    }
}