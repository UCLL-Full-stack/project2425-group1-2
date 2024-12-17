export class StudentShortView {
    name:string;

    constructor(student:{name: string} ){
        if(student.name.length === 0){
            throw new Error("Name is required.")
        }
        this.name = student.name;
    }
}