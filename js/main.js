const BlinkingIntervalID = setInterval(blinker, 150);

//File system
let fs = {
    COMMAND: {
        type: 'COM',
        contents: '€ú/uÆú\€> u&Æ \ \ ´:¢^@<@t"ý€> u¿Ÿ ¾ ¹ ó¤&£ ü£¢< èEø¾€ ¬ŠÈ2íãC¾ ¬< t<	t:ª'
    },
    AUTOEXEC: {
        type: 'BAT',
        contents: `@echo off
        SET SOUND=C:\\PROGRA~1\\CREATIVE\\CTSND
        SET BLASTER=A220 I5 D1 H5 P330 E620 T6
        SET PATH=C:\\COMMAND.COM
        LH C:\\Windows\\COMMAND\\MSCDEX.EXE /D:123`
    },
    BOOT: {
        type: 'COM',
        contents: 'uñï6*‹Ç&¢4*èÂ	è1ögÿt	º5*èÔè[è!té3¾5*¿ƒ+¸)Í!<t <ÿuéÔ é„Š¢f+° ¹	 Gò®°	*Á¢ƒ+¿ 3ÉV¬ª<'
    },
    CONFIG: {
        type: 'SYS',
        contents: `DOS=HIGH,UMB
        FILES=30
        STACKS=0,0
        BUFFERS=20`
    },
    ABOUT: {
        type: 'directory',
        contents: {
            ABOUTME: {
                type: 'TXT',
                contents: 'My name\'s Ivan, and I\'m a 17yo programmer from spain. Im studying software engineering at the moment, and working on several said projects... (to be finished lmao)'
            },
            SOCIALS: {
                type: 'directory',
                contents: {
                    GITHUB: {
                        type: 'TXT',
                        contents: 'https://github.com/LaCrak27'
                    },
                    DISCORD: {
                        type: 'TXT',
                        contents: 'Talk to me on discord! My username is "lacrak27".'
                    },
                    YOUTUBE: {
                        type: 'TXT',
                        contents: 'https://www.youtube.com/channel/UCz1Vf9qmV1rpmzDvKf3WptQ'
                    }
                }
            }
        }
    }
}
let currentpath = ".ABOUT.SOCIALS"; //Would display as \ABOUT\SOCIALS (navigating the obj directly)
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "Enter":
            args = document.getElementById("input").innerHTML.split(' ');
            uppercaseCommand = args.shift().toUpperCase();
            processCommand(uppercaseCommand, args);
            document.getElementById("input").innerHTML = "";
            break;
        case "Backspace":
            document.getElementById("input").innerHTML = document.getElementById("input").innerHTML.slice(0, -1); //Removes last keystroke. 
            break;
        default:
            if (event.metaKey || event.altKey || event.ctrlKey) break;
            if (event.key.length > 1) break; //Prevent keys like CapsLock from registering
            document.getElementById("input").innerHTML = document.getElementById("input").innerHTML + event.key; //Adds the key.
            break;
    }
    return false;
});

async function processCommand(command, args) {
    if (command === "" || undefined) {
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "C:\\" + document.getElementById("path").innerHTML + ">" + "<br>";
    }
    else {
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "C:\\" + document.getElementById("path").innerHTML + ">" + document.getElementById("input").innerHTML + "<br>";
        if (typeof window[command] === 'function') {
            document.getElementById("line").style.visibility = "hidden";
            result = await window[command](args);
            document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + result;
            document.getElementById("line").style.visibility = "";
        }
        else {
            document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
        }
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "<br><br>";
    }
    window.scrollTo(0, document.body.scrollHeight);
}

//Blinking cursor
function blinker() {
    let blinking = document.getElementById("blink");
    blinking.style.visibility = (blinking.style.visibility == "hidden" ? "" : "hidden");
}

//COMMANDS FROM HERE, STRUCTURE: (async) function COMMANDNAME(args: string) > returns a string. (see example)
function ECHO(args) {
    s = "";
    args.forEach(word => {
        s = s + ' ' + word
    });
    return s;
}
async function PING(args) {
    host = args[0];
    await pauseforXmiliseconds(getRandomInt(3000));
    return `Ping request could not find host ${host}. Please check the name and try again.`;
}
function CLS(args) {
    document.getElementById("commands").innerHTML = "";
    return "";
}


//Helper functions
function pauseforXmiliseconds(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('done');
        }, time);
    });
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}