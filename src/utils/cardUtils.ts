import moment from 'moment';
import Cryptr from 'cryptr';

import { AppError } from '../errors/AppError.js';
import { findById } from "../repositories/cardRepository.js";

const cryptr = new Cryptr(process.env.SECRET_KEY);

async function findCard(idCard: number) {
    const card = await findById(idCard);

    if (!card) {
        throw new AppError("Card not found", 404);
    }
    return card;
}

function checkIsActive(password: string) {
    if (!password) {
        throw new AppError("inactive card", 401);
    }
}

function verifyExpiration(expiration: string) {
    const atualDate = moment(new Date()).format('MM/YY');

    const atual = new Date(atualDate);
    const exp = new Date(expiration);

    const difference = exp.getTime() - atual.getTime();

    if (difference <= 0) {
        throw new AppError("Card expired", 401)
    }
}

function checkIsBlocked(isBlocked: boolean){
    if (isBlocked) {
        throw new AppError("Card is blocked", 401);
    }
}

function checkIfPasswordIsCorrect(passwordRequest:string, passwordSave: string) {
    const passwordDescript = cryptr.decrypt(passwordSave);
    if (passwordRequest !== passwordDescript) {
        throw new AppError("Passwords don't match", 403);
    }
}


const cardUtils = {
    findCard,
    checkIsActive,
    verifyExpiration,
    checkIsBlocked,
    checkIfPasswordIsCorrect
}

export default cardUtils;