import { Privilege } from "../../model/privilege";

test('given: valid privilege data, when: privilege is created, then: fields are set correctly', () => {
    const privilege = new Privilege({
        id: 1,
        name: 'Admin Access',
        description: 'Grants access to admin features'
    });

    expect(privilege.id).toEqual(1);
    expect(privilege.name).toEqual('Admin Access');
    expect(privilege.description).toEqual('Grants access to admin features');
});

test('given: missing name, when: privilege is created, then: an error is thrown', () => {
    const createPrivilege = () => new Privilege({
        id: 2,
        name: '',
        description: 'Grants access to admin features'
    });

    expect(createPrivilege).toThrow('Name is required.');
});

test('given: missing description, when: privilege is created, then: an error is thrown', () => {
    const createPrivilege = () => new Privilege({
        id: 3,
        name: 'User Access',
        description: ''
    });

    expect(createPrivilege).toThrow('Description is required.');
});

test('given: valid privilege with undefined id, when: privilege is created, then: fields are set correctly without id', () => {
    const privilege = new Privilege({
        name: 'Editor Access',
        description: 'Grants access to edit content'
    });

    expect(privilege.id).toBeUndefined();
    expect(privilege.name).toEqual('Editor Access');
    expect(privilege.description).toEqual('Grants access to edit content');
});
