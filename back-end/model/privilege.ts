export class Privilege {
    public readonly id?: number; // This is optional
    public readonly name: string;
    public readonly description: string;

    constructor(privilege: { id?: number; name: string; description: string }) { // 'id' is optional here
        this.validate(privilege);
        this.id = privilege.id;
        this.name = privilege.name;
        this.description = privilege.description;
    }

    validate(privilege: { name: string; description: string }) {
        if (!privilege.name || privilege.name.length === 0) {
            throw new Error("Name is required.");
        }
        if (!privilege.description || privilege.description.length === 0) {
            throw new Error("Description is required.");
        }
    }
}
