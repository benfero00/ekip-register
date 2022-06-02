const { Client, MessageEmbed, Collection } = require("discord.js");
const Discord = require("discord.js");
const client = global.client = new Discord.Client();
const db = require("quick.db");
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
const chalk = require('chalk');
const ayarlar = require("./ayarlar.json");
require("moment-duration-format");

client.cooldown = new Map();

var prefix = ayarlar.prefix;
client.cooldowns = new Discord.Collection();

const log = (message) => {
  console.log(chalk.red`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(chalk.white`${files.length} komut yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./commands/${f}`);
    log(chalk.blue`Yüklenen komut | [${props.help.name}]`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  log(chalk.red`Yüklenen eventler | [${event.name}]`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}


client.elevation = (message) => {
  if (!message.guild) {
    let perm = 2;
    ayarlar.owner.forEach((a) => {
      if (a == message.author.id) perm = 5;
    });
    return perm;
  }
  let permlvl = 0;
  if (message.member.hasPermission("CREATE_INSTANT_INVITE")) permlvl = 2;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if (message.author.id === ayarlar.owner) permlvl = 5;
  return permlvl;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 24) hours -= 24;
      if (hours === 0) hours = 24;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
process.on('uncaughtException', function(err) { 
    console.log(err) 
  });
  /////////////////////////////////////HOŞGEDLİN MESAJI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': ``,
          '1': ``,
          '2': ``,
          '3': ``,
          '4': ``, // BOTUN OLDUĞU SUNUCUDA OLMA ŞARTI İLE HARAKETLİ EMOJİDE KOYABİLİRSİNİZ!
          '5': ``,
          '6': ``,
          '7': ``,
          '8': ``,
          '9': ``}[d];})}
  const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.weclome)); 
  let user = client.users.cache.get(member.id);//
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
  var kontrol;
if (kurulus < 1296000000) kontrol = ''//Güvenilir Değil EMOJI
if (kurulus > 1296000000) kontrol = ''//Güvenilir EMOJI
  moment.locale("tr");


  kanal.send(`
  **Sunucu İsmi gir  ** Hoşgeldin <@`+ member + `> Seninle birlikte sunucumuz (`+üyesayısı+`) kişiyiz  

  Hesabını \`${moment(member.createdAt).format("DD MM YY・HH:mm:ss")}\` Tarihi `+kontrol+`
  
   Kurallar sunucunun düzenini sağlamak için konulmuştur <#973323872109752340> kanalından kurallarımızı okumayı ihmal etme. <@&977895397408264204>

\`Tagımızı alarak bizleri destekleyebilirsin tag gir | İyi eğlenceler\`
`)});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  client.on("userUpdate", async function(oldUser, newUser) { 
    const db = require('quick.db');
    let tag = (ayarlar.tag)
    const roleID = (ayarlar.taglırol)
     const guildID = (ayarlar.sunucuid)
    const chat = (ayarlar.chat)
    const log2 = (ayarlar.taglog)
    const etiket = (ayarlar.etiket)
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.set(ayarlar.kayıtsızRolleri)
            member.roles.remove(roleID)
            member.setNickname(`Kayıtsız`)
            db.delete(`isimler_${member.user.id}`)
            db.delete(`kayıt_${member.id}`)
            client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **${tag}** sildi \n \`Alınan Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
            client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **${tag}** tagını aldı \n \`Verilen Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == `${etiket}` && newUser.discriminator !== `${etiket}`) {
            member.roles.set(ayarlar.kayıtsızRolleri)
            member.setNickname(`Kayıtsız`)
            client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **#${etiket}** sildi \n \`Alınan Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
        } else if (oldUser.discriminator !== `${etiket}` && newUser.discriminator == `${etiket}`) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **#${etiket}** tagını aldı \n \`Verilen Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
            client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
        }
    }
  
  }) 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  client.on("guildMemberAdd", member => {

    let yasakli = [ayarlar.yasaklıtag] // yasaklı tagları buraya yazin
    
    if(member.user.username.includes(yasakli)) {
      member.kick()
      member.guild.channels.cache.get(ayarlar.yasaklılog).send("Oruspu Cocogu Girme Bu Sunucuya Sikdir git")
    }
  });


client.login(ayarlar.token).then(x => console.log(`Bot  olarak giriş yaptı!`)).catch(err => console.error(` - Bot giriş yapamadı | Hata: ${err}`))