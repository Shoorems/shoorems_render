
const users = require('../models/users');
const mongoose= require('mongoose');

class sweetfunctions {

    async debitUser(username, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (amount<0) {
            throw new Error('Amount can not be less than 0');
        }

        // Debit from sender's account
        const senderAccount = await users.findOneAndUpdate(
            { username:username, wallet: { $gte: amount } },
            { $inc: { wallet: -amount } },
            { new: true, session }
        );

        if (!senderAccount) {
            throw new Error('Insufficient Balance, kindly fund your wallet and try again');
        }

        
        await session.commitTransaction();
        session.endSession();

        console.log('user debited successfully');
        //return { success: true, message: 'Transfer successful ooo' };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Transaction aborted:', error.message);
        return {status:"fail", success: "fail",message:error.message, error: error.message };
    }
}
async creditUser(username, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Debit from sender's account
        const senderAccount = await users.findOneAndUpdate(
            { username:username},{ $inc: { wallet: amount } },
            { new: true, session }
        );

        if (!senderAccount) {
            throw new Error('User not found');
        }

        

        await session.commitTransaction();
        session.endSession();

        console.log('User credited successfully');
       // return { success: true, message: 'Transfer successful ooo' };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Transaction aborted:', error.message);
      //  return { success: false, error: error.message };
    }
}


    async getwallet(username) {


        try {
            const fetchWallet = await users.findOne({ username }, { wallet: 1, _id: 0 })
            const wallet = fetchWallet.wallet;
            return wallet
        } catch (err) {
            console.log(err)
        }

    }
    async getUserPin(username) {


        try {
            const fetchWallet = await users.findOne({ username }, { pin: 1, _id: 0 })
            const pin = fetchWallet.pin;
            return pin
        } catch (err) {
            console.log(err)
        }

    }
    async getValidator(username) {


        try {
            const fetchWallet = await users.findOne({ username }, { validator: 1, _id: 0 })
            const validator = fetchWallet.validator;
            return validator
        } catch (err) {
            console.log(err)
        }

    }
    async getWebHook(username) {


        try {
            const fetchWallet = await users.findOne({ username }, { webhook_url: 1, _id: 0 })
            const webhook_url = fetchWallet.webhook_url;
            return webhook_url
        } catch (err) {
            console.log(err)
        }

    }
    async getEmail(username) {


        try {
            const fetchWallet = await users.findOne({ username }, { email: 1, _id: 0 })
            const email = fetchWallet.email;
            return email
        } catch (err) {
            console.log(err)
        }

    }
    
    async upgradeUser(username, reseller) {

        try {
            const update = await users.updateOne({ username }, { $set: { reseller } })
            console.log(update)

        } catch (err) {
            console.log(err)
        }

    }

}

module.exports = sweetfunctions;