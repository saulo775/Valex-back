import dotenv from 'dotenv';
import {faker} from "@faker-js/faker";
import Cryptr from "cryptr";
import moment from "moment";

dotenv.config();
const cryptr = new Cryptr(process.env.SECRET_KEY);

import { findByTypeAndEmployeeId, insert } from "../repositories/cardRepository.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findByCPF } from "../repositories/employeeRepository.js";
import { AppError } from '../errors/AppError.js';

export async function createCard(cpfEmployee: string, typeCard: string, keyCompany: any){
    const company = await findByApiKey(keyCompany);
    const employeer = await findByCPF(cpfEmployee);
    if (company.id !== employeer.companyId) {
        throw new AppError("employee is not from this company", 422);
    }

    await getCard(typeCard, employeer.id);
    await saveNewCard(typeCard, employeer.id, employeer.fullName);
}

async function getCard(typeCard: any, employeerId: number) {
    const cardExists = await findByTypeAndEmployeeId(typeCard, employeerId);

    if (!!cardExists) {
        throw new AppError(`Employee already has a ${typeCard} card`, 409);
    }
}

async function saveNewCard(typeCard: string, employeeId: number, employeeName: string) {
    const cardNumber = faker.random.numeric(16);
    const cvc = cryptr.encrypt(faker.random.numeric(3));
    const cardHolderName = generateCardName(employeeName);
    const expirationDate = generateExpiration();

    const cardData: any = {
        employeeId,
        number: cardNumber,
        cardholderName: cardHolderName,
        securityCode: cvc,
        expirationDate: expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: typeCard,
    }

    await insert(cardData);
}

function generateCardName(name:string) {
    const nameArray = name.split(" ");
    let cardName = nameArray[0];

    for (let i = 1; i < nameArray.length-1; i++) {
        if (i=== nameArray.length-1) {
            cardName +=nameArray[i];
        }
        if (nameArray[i].length>=3) {
            cardName += " "+ nameArray[i].slice(0, 1);
        }
    }
    cardName += " " + nameArray[nameArray.length-1]

    return cardName.toUpperCase();
}

function generateExpiration() {
    const timeExpiration = 5;
    const date = new Date()
    date.setFullYear(date.getFullYear() + timeExpiration);

    return moment(date).format('MM/YY')
}
