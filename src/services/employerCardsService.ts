import moment from 'moment';
import Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.SECRET_KEY);

import { AppError } from "../errors/AppError.js";
import { findById, update } from "../repositories/cardRepository.js";

export async function activateCard(id: any, cvc: number, password: string) {
    const passwordEncrypt = cryptr.encrypt(password);
    await verifyCardIsValid(id, cvc);
    await updateCard(id, passwordEncrypt);
}

async function verifyCardIsValid(idCard: any, cvc: number) {
    const card = await findCard(idCard);
    await verifyExpiration(card.expirationDate);
    if (card.password) {
        throw new AppError("Unable to activate, card is already active", 401);
    }
    verifyCVC(card.securityCode, cvc);
}

async function findCard(idCard: number){
    const card = await findById(idCard);

    if (!card) {
        throw new AppError("Card not found", 404);
    }
    return card;
}

async function verifyExpiration(expiration:string) {
    const atualDate = moment(new Date()).format('MM/YY');
    
    const atual = new Date(atualDate);
    const exp = new Date(expiration);

    const difference = exp.getTime()-atual.getTime();

    if (difference <= 0) {
        throw new AppError("Unable to activate, card expired", 401)
    }
}

function verifyCVC(cvcCard: string, cvcRequest: number) {
    const cvcDecript = Number(cryptr.decrypt(cvcCard));
    if (cvcDecript !== cvcRequest) {
        throw new AppError("Unable to activate, security code inválid", 401);
    }
}

async function updateCard(id: any, password: string) {
    await update(id, {password});
}