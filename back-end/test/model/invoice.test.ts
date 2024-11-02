import { IspStatus } from "@prisma/client";
import { Invoice } from "../../model/invoice";
import { ISP } from "../../model/isp";
import { Student } from "../../model/student";

const mockStudent = new Student({
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password123",
    nationality: "Belgian",
    passedCourses: []
})

const mockISP = new ISP({
    id: 1,
    status: IspStatus.SUBMITTED,
    totalCredits: 30,
    startYear: 2022,
    courses: [],
    student: mockStudent
});

test("given: valid values for Invoice, when: Invoice is created, then: Invoice is created with those values", () => {
    const invoice = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    expect(invoice.id).toEqual(1);
    expect(invoice.totalAmount).toEqual(100);
    expect(invoice.deadline).toEqual(new Date("2024-12-31"));
    expect(invoice.paidAmount).toEqual(50);
    expect(invoice.isp).toEqual(mockISP);
});

test("given: negative totalAmount, when: Invoice is created, then: an error is thrown", () => {
    const createInvoice = () => new Invoice({
        id: 2,
        totalAmount: -100,
        deadline: new Date("2024-12-31"),
        paidAmount: 0,
        isp: mockISP
    });

    expect(createInvoice).toThrow("Total amount cannot be negative.");
});

test("given: missing deadline, when: Invoice is created, then: an error is thrown", () => {
    const createInvoice = () => new Invoice({
        id: 3,
        totalAmount: 100,
        deadline: undefined as any,
        paidAmount: 0,
        isp: mockISP
    });

    expect(createInvoice).toThrow("Deadline is required.");
});

test("given: negative paidAmount, when: Invoice is created, then: an error is thrown", () => {
    const createInvoice = () => new Invoice({
        id: 4,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: -20,
        isp: mockISP
    });

    expect(createInvoice).toThrow("Paid amount cannot be negative.");
});

test("given: missing ISP, when: Invoice is created, then: an error is thrown", () => {
    const createInvoice = () => new Invoice({
        id: 5,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 1,
        isp: undefined as any
    });

    expect(createInvoice).toThrow("ISP is required.");
});

test("given: two Invoices with the same properties, when: equals is called, then: returns true", () => {
    const invoice1 = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    const invoice2 = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    expect(invoice1.equals(invoice2)).toBe(true);
});

test("given: two Invoices with different properties, when: equals is called, then: returns false", () => {
    const invoice1 = new Invoice({
        id: 1,
        totalAmount: 100,
        deadline: new Date("2024-12-31"),
        paidAmount: 50,
        isp: mockISP
    });

    const invoice2 = new Invoice({
        id: 2,
        totalAmount: 200,
        deadline: new Date("2025-12-31"),
        paidAmount: 60,
        isp: mockISP
    });

    expect(invoice1.equals(invoice2)).toBe(false);
});
