import { ISP } from "./isp";
import { Invoice as PrismaInvoice, Isp as PrismaISP, Course as PrismaCourse } from "@prisma/client";
import { PrismaStudent } from "../types/prismaTypesExtension";

export class Invoice {
    public readonly id?: number;
    public readonly totalAmount: number;
    public readonly deadline: Date;
    public readonly paidAmount?: number;
    public readonly isp: ISP;

    constructor(invoice: {
        id: number;
        totalAmount: number;
        deadline: Date;
        paidAmount?: number;
        isp: ISP;
    }) {
        this.validate(invoice);
        this.id = invoice.id;
        this.totalAmount = invoice.totalAmount;
        this.deadline = invoice.deadline;
        this.paidAmount = invoice.paidAmount||0;
        this.isp = invoice.isp;
    }

    validate(invoice: {totalAmount: number; deadline: Date; paidAmount?: number; isp: ISP;}) {
        if (!invoice.totalAmount || invoice.totalAmount < 0 ){
            throw new Error("Total amount cannot be negative.")
        }
        if (!invoice.deadline){
            throw new Error("Deadline is required.")
        }
        if (!invoice.paidAmount ||invoice.paidAmount < 0 ){
            throw new Error("Paid amount cannot be negative.")
        }
        if (!invoice.isp){
            throw new Error("ISP is required.")
        }
    }


    public equals(invoice: Invoice): boolean {
        return (
            this.id === invoice.id &&
            this.totalAmount === invoice.totalAmount &&
            this.deadline.getTime() === invoice.deadline.getTime() &&
            this.paidAmount === invoice.paidAmount&&
            this.isp === invoice.isp
        );
    }

    public static from({
        id,
        totalAmount,
        deadline,
        paidAmount,
        isp,
    }: PrismaInvoice & { isp : PrismaISP & { courses : PrismaCourse[], student: PrismaStudent }}): Invoice {
        return new Invoice({
            id,
            totalAmount,
            deadline,
            paidAmount,
            isp: ISP.from(isp),
        });
    }
}
