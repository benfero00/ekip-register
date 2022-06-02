const { MessageEmbed } = require('discord.js')
const kdb = new Database.table("kayıtlar")
const tdb = new Database.table("taglılar")
const data = require('quick.db')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(ayarlar.registeryt) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayarlar.red)

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

let kayıttabasagelecektag = ayarlar.kayıttabasagelecektag
let nick = args[1]
let yaş = args[2];
if(!member) return message.react(ayarlar.red)
if(!nick) return message.react(ayarlar.red)
if(member.id === client.user.id) return message.react(ayarlar.red)
if (member.hasPermission(8)) return message.react(ayarlar.red)

let taglıalım = await tdb.fetch(`taglıalım.${message.guild.id}`)
if(taglıalım === true){
    if(!member.user.username.includes(ayarlar.tag) && !member.user.discriminator.includes(ayarlar.etiket) && !member.roles.cache.has(ayarlar.taglırol) && !member.roles.cache.has(ayarlar.booster)) return message.channel.send(embed.setDescription(`Sunucumuzda taglı alım modu açıktır kayıt olmak için isminize \`${ayarlar.tag}\` sembolünü alabilir veya \`Boost\` basarak giriş yapabilirsiniz.`)).then(x => x.delete({timeout: 5000})).then(message.react(emoji.red));
}

data.add(`yetkili.${message.author.id}.kadın`, 1)
data.add(`puan.${message.author.id}.kkayit`, 5)
data.add(`yetkili.${message.author.id}.toplam`, 1)
data.add(`ksayi.${message.author.id}.toplam`, 1)
let kayıtlar = data.fetch(`yetkili.${message.author.id}.toplam`)
let isim =  db.get(`isimler.${member.id}`)
db.push(`isimler.${member.id}`, `\`${nick}\` (<@&${ayarlar.kadın}>)`)

member.setNickname(`${kayıttabasagelecektag} ${nick} ${sembol} ${yaş}`) 
message.react(ayarlar.onay)
member.roles.add(ayarlar.kadın)
member.roles.add(ayarlar.kadın)
member.roles.add(ayarlar.kadın)
member.roles.add(ayarlar.kadınroller)
member.roles.add(ayarlar.kadınroller)
member.roles.add(ayarlar.kadınroller)
member.roles.remove(ayarlar.Unregister)
member.roles.remove(ayarlar.Unregister)
message.react(ayarlar.onay)


client.channels.cache.get(ayarlar.chat).send(`${member} sunucumuza hoşgeldin, seninle birlikte **${message.guild.memberCount}** kişiye ulaştık !`).then(x => x.delete({timeout: 5000}))}

exports.conf = {
    aliases: ['Kadın'],
    permLevel: 0
  };
  exports.help = {
    name: 'k',
    açıklama:"",
    komut: "[Kadın]",
    help: "Kadın ",
    cooldown: 0
  };