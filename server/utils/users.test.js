const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {    
    var users;

    beforeEach (() => {
        users = new Users();
        users.users = [{id: 1, name: "Mike", room: "Node Course"}, {id: 2, name: "Jen", room: "React Course"}, {id: 3, name: "Julie", room: "Node Course"}]
    });
    
    if('should add new user', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'Hugo',
            room: 'The Office Fans'
        };

        var responseUsers = users.addUser(user.id, user.name, user.room);

        expect(responseUsers.users).toEqual([user]);
    });

    if('should return names for node course', () => {
        var userList = users.getUserList('Node Course');        

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    if('should return names for React', () => {
        var userList = users.getUserList('react Course');        

        expect(userList).toEqual(['Jen']);
    });

    if('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    if('should not find user', () => {
        var userId = '200';
        var user = users.getUser(userId);

        expect(user).toNotExist();        
    });

    if('should remove the user', () => {
        var userId = '1';

        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    if('should not remove the user', () => {
        var userId = '99';

        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});