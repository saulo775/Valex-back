import moment from 'moment';
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

import { AppError } from "../errors/AppError.js";
import { findById, update, } from "../repositories/cardRepository.js";
import { insert } from '../repositories/rechargeRepository.js';
import { findByCardId } from '../repositories/paymentRepository.js';
import { findByCardId as findRechargesByCardId } from '../repositories/rechargeRepository.js';


export async function activateCard(id: any, cvc: number, password: string) {
    const passwordEncrypt = cryptr.encrypt(password);
    
    await verifyCardIsValid(id, cvc);

    await updateCard(id, {password: passwordEncrypt});
}

export async function getAllTransactions(id: number) {
    const payments =  await findByCardId(id);
    const recharges = await findRechargesByCardId(id);
    let exits = 0;
    let entryes = 0;
    payments.forEach(element => {
        exits+=element.amount;
    });

    recharges.forEach(element => {
        entryes+=element.amount;
    });

    const balance = entryes-exits;


    const operationsData = {
        balance,
        transacions: [...payments],
        recharges: [...recharges]
    }
    return operationsData;
}

export async function unblockOneCard(id: number, password: string){
    const card = await findCard(id);
    await verifyExpiration(card.expirationDate);
    if (card.isBlocked === false) {
        throw new AppError("Card is already unlocked", 401);
    }
    checkIfPasswordIsCorrect(password, card.password);
    updateCard(id, {isBlocked: false});
}

export async function blockOneCard(id: number, password: string){
    const card = await findCard(id);
    await verifyExpiration(card.expirationDate);
    if (card.isBlocked === true) {
        throw new AppError("Card is already locked", 401);
    }
    checkIfPasswordIsCorrect(password, card.password);
    updateCard(id, {isBlocked: true});
}

export async function rechargeOneCard(cardId: number, keyCompany: string, amount: number){
    const card = await findCard(cardId);
    await verifyExpiration(card.expirationDate);
    if (!card.password) {
        throw new AppError("Inactive card, can't recharge", 401);
    }
    await insert({cardId, amount});
}

async function verifyCardIsValid(idCard: any, cvc: number) {
    const card = await findCard(idCard);
    await verifyExpiration(card.expirationDate);
    if (card.password) {
        throw new AppError("Unable to activate, card is already active", 401);
    }
    
    await verifyCVC(card.securityCode, cvc);
}

async function findCard(idCard: number) {
    const card = await findById(idCard);

    if (!card) {
        throw new AppError("Card not found", 404);
    }
    return card;
}

async function verifyExpiration(expiration: string) {
    const atualDate = moment(new Date()).format('MM/YY');

    const atual = new Date(atualDate);
    const exp = new Date(expiration);

    const difference = exp.getTime() - atual.getTime();

    if (difference <= 0) {
        throw new AppError("Unable to activate, card expired", 401)
    }
}

async function verifyCVC(cvcCard: string, cvcRequest: number) {
    const cvcDecript = Number(cryptr.decrypt(cvcCard));
    if (cvcDecript !== cvcRequest) {
        throw new AppError("Unable to activate, security code inválid", 401);
    }
}

async function updateCard(id: any, cardData: any) {
    await update(id, cardData);
}

function checkIfPasswordIsCorrect(passwordRequest:string, passwordSave: string) {
    const passwordDescript = cryptr.decrypt(passwordSave);
    if (passwordRequest !== passwordDescript) {
        throw new AppError("Passwords don't match", 403);
    }
}


