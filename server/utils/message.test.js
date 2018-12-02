var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'from Hugo';
        var text = 'This is the text...';

        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: from,
            text: text
        });

        
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'from Hugo';
        var latitude = 43.278335999999996;
        var longitude = -2.9696;
        var url = "https://www.google.com/maps?q=43.278335999999996,-2.9696";

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: from,
            url: url
        });

        
    });
});