import cardUtils from "../utils/cardUtils.js";
import { findById } from "../repositories/businessRepository.js"
import { AppError } from "../errors/AppError.js";
import { findByCardId, insert } from "../repositories/paymentRepository.js";
import { findByCardId as findRechargeByCardId} from "../repositories/rechargeRepository.js";

export interface IPurchaseData {
    cardId: number;
    storeId: number;
    password: string;
    amount: number;
}

export async function saveNewPurchase({cardId, storeId, password, amount}: IPurchaseData) {
    const card = await cardUtils.findCard(cardId);
    cardUtils.checkIsActive(card.password);
    cardUtils.verifyExpiration(card.expirationDate);
    cardUtils.checkIsBlocked(card.isBlocked);
    cardUtils.checkIfPasswordIsCorrect(password, card.password);
    const busine = await findBusine(storeId);
    checkType(card.type, busine.type);
    await checkBalance(cardId, amount);
    await insertPayment(cardId, storeId, amount);
}

async function findBusine(id: number) {
    const busine = await findById(id);
    if (!busine) {
        throw new AppError("Busine not found", 404);
    }
    return busine
}

function checkType(cardType: string, businessType: string){
    if (cardType !== businessType) {
        throw new AppError("Card and store have different types", 401);
    }
}

async function insertPayment(cardId, businessId, amount) {
    await insert({cardId, businessId, amount})
}

async function checkBalance(cardId: number, amount: number){
    const spends = await getSpends(cardId);
    const recharges = await getRecharges(cardId);

    const balance = recharges - spends;

    if (balance-amount <0) {
        throw new AppError("Insufficient funds", 401);
    }
    
}

async function getSpends(cardId: number){
    const spends = await findByCardId(cardId);
    let exits = 0
    spends.forEach(element => {
        exits += element.amount
    });

    return exits;
}

async function getRecharges(cardId: number){
    const entryes = await findRechargeByCardId(cardId);
    let recharges = 0
    entryes.forEach(element => {
        recharges += element.amount
    });
    return recharges;
}
