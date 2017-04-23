const WeatherApp = require('./weather');
const Feed = require('./rss');
const Imap = require('./imap');

let owa = new WeatherApp();
let imap = new Imap();

// owa.currentWeather((resp) => {
//     console.log('Received>>>', resp);
// });
// Feed((articles) => {
//     console.log('Received>>>', articles);
// });

imap.connect(() => {
    // imap.getBoxes((inb) => {
    //     console.log('BOXEEEzzzz>>>', inb);

    //     imap.disconnect(( )=> {
    //         console.log('Disconnected');
    //     });

    // });
    imap.getInbox((messages) => {
        console.log('Returning ', (Object.keys(messages)).length);
        console.log('>>>>', messages);
        imap.disconnect(() => {
            console.log('Disconnected');
        });
    });
});

