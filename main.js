const Discord = require("discord.js");
const helpers = require('./helpers');
const client = new Discord.Client();
const client2 = new Discord.Client();

let channeid = "channelid"; // Ganti channelid dengan ID channel yang ingin Anda gunakan
let spammed = 0;
let reconnect = false;

function random() {
    return Math.floor(Math.random() * 1) + 15
}

function junk(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function updateStatus() {
  const currentTime = new Date();
  const uptime = currentTime - client.readyAt;
  
  const days = Math.floor(uptime / 86400000);
  const hours = Math.floor(uptime / 3600000);
  const minutes = Math.floor((uptime % 3600000) / 60000);
  const seconds = Math.floor((uptime % 60000) / 1000);

  const statusString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  client.user.setPresence({ activity: { name: statusString, type: 'WATCHING' }, status: 'online' })
    .then(console.log)
    .catch(console.error);

  // Mengubah status setiap 10 menit (600000 milidetik)
  setTimeout(updateStatus, 10000 );
}

client.on("ready", () => {
    reconnect = false
    console.log(client.user.tag + " Just logged in!")
    updateStatus();
    const channelS = client.channels.cache.find(channel => channel.id == channeid)
    const spammer = setInterval(() => {
        const repeat = random()
        let texttospam = '';
        for (let i = 0; i < repeat; i++) {
            texttospam += 'ss ' + junk(repeat) + '\n';
        }
        channelS.send(texttospam)
        spammed++
        console.log(`Dab! successfully sent ${spammed} messages`)
    }, helpers.getRandomInt(150, 300));
})

client.login("token"); // Ganti token dengan token bot Anda
