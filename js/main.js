const BlinkingIntervalID = setInterval(blinker, 150);
let currentpath = []; //Would display as \ABOUT\SOCIALS (navigating the obj directly)
//File system
let fs = {
    COMMAND: {
        type: 'COM',
        contents: '€ú/uÆú\€> u&Æ \ \ ´:¢^@<@t"ý€> u¿Ÿ ¾ ¹ ó¤&£ ü£¢< èEø¾€ ¬ŠÈ2íãC¾ ¬< t<	t:ª'
    },
    AUTOEXEC: {
        type: 'BAT',
        contents: `@echo off<br>
        SET SOUND=C:\\PROGRA~1\\CREATIVE\\CTSND<br>
        SET BLASTER=A220 I5 D1 H5 P330 E620 T6<br>
        SET PATH=C:\\COMMAND.COM<br>
        LH C:\\Windows\\COMMAND\\MSCDEX.EXE /D:123`
    },
    BOOT: {
        type: 'COM',
        contents: 'uñï6*‹Ç&¢4*èÂ	è1ögÿt	º5*èÔè[è!té3¾5*¿ƒ+¸)Í!<t <ÿuéÔ é„Š¢f+° ¹	 Gò®°	*Á¢ƒ+¿ 3ÉV¬ª<'
    },
    CONFIG: {
        type: 'SYS',
        contents: `DOS=HIGH,UMB<br>
        FILES=30<br>
        STACKS=0,0<br>
        BUFFERS=20`
    },
    ABOUT: {
        type: '&lt;DIR&gt;',
        contents: {
            ABOUTME: {
                type: 'TXT',
                contents: 'My name\'s Ivan, and I\'m a 17yo developer from spain. Im studying software engineering at the moment, and working on several side projects, as well as in my game Star Strike (you can learn more at www.starstrikegame.com). I really am down to code just anything, as I\'m comfortable with most languages (except python, fuck python) so if you have anything you need, don\'t hesitate to contact me! (check SOCIALS folder).'
            },
            ABOUTWEBDOS: {
                type: 'TXT',
                contents: 'This is a website that I originally intended to be my portfolio, similar to those console based ones, but I thought that making it resemble DOS and have some of it\'s commands instead of just your basic "youtube" and "help" commands would be nice, so this is what ended up coming out of it. Made in a weekend with <3 by LaCrak27, using pure html/css/js.'
            },
            SOCIALS: {
                type: '&lt;DIR&gt;',
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
document.addEventListener('click', (event) => {
    document.getElementById("page").focus();
    document.getElementById("page").click();
});
document.addEventListener('touchstart', (event) => {
    document.getElementById("page").focus();
    document.getElementById("page").click();
});
document.body.ontouchend = function() { document.getElementById("page").focus(); };

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "Enter":
            uc = document.getElementById("input").innerHTML;
            ucu = uc.toUpperCase();
            args = document.getElementById("input").innerHTML.split(' ');
            uppercaseCommand = args.shift().toUpperCase();
            replacedCommand = uppercaseCommand.replaceAll('\.', "p");
            processCommand(replacedCommand, args, ucu);
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

async function processCommand(command, args, uc) {
    if (command === "" || undefined) {
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "C:" + document.getElementById("path").innerHTML + ">" + "<br>";
    }
    else {
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "C:" + document.getElementById("path").innerHTML + ">" + document.getElementById("input").innerHTML + "<br>";
        if (typeof window[command] === 'function') {
            document.getElementById("line").style.visibility = "hidden";
            result = await window[command](args);
            document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + result;
            document.getElementById("line").style.visibility = "";
        }
        else {
            document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + `'${uc}' is not recognized as an internal or external command, operable program or batch file.`;
        }
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "<br><br>";
    }
    window.scrollTo(0, document.body.scrollHeight);
    updatePathDisplay();
    updateURL();
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
function CD(args) {
    if (args.length == 0) {
        return "Please specify the directory to move into."
    }
    else {
        let folderToMoveTo = args[0].toUpperCase();
        if (folderToMoveTo == `..`) {
            CDpp();
            return "";
        }   
        if (folderToMoveTo == `.`) {
            return "";
        }
        if (getStuffInDir().includes(folderToMoveTo)) {
            if (getCurrentDir()[folderToMoveTo].type === '&lt;DIR&gt;') {
                currentpath.push(folderToMoveTo);
                return "";
            }
            else {
                return "Unable to change to: " + args[0];
            }
        }
        else {
            return "Unable to change to: " + args[0];
        }
    }
}
function CDpp(args) {
    if (currentpath.length > 0) {
        currentpath.pop();
    }
    return "";
} function CDp(args) {
    return "";
}
function DIR(args) {
    let stuffinDir = getStuffInDir();
    let ret = "Directory Listing:";
    let fileAmount = 0;
    let spaceString = "&#255;";
    ret = ret + "<br>" + `.${spaceString.repeat(14)}&lt;DIR&gt;`;
    ret = ret + "<br>" + `..${spaceString.repeat(13)}&lt;DIR&gt;`;
    stuffinDir.forEach(element => {
        ret = ret + "<br>" + `${element}${spaceString.repeat(15 - element.length)}${getCurrentDir()[element].type}`;
        fileAmount++;
    });
    ret = ret + "<br>" + `${fileAmount} file(s) in directory.`;
    return ret;
}
function TYPE(args) {
    filetoSee = args[0].split(".");
    if (getStuffInDir().includes(filetoSee[0].toUpperCase())) {
        if (filetoSee[1] != undefined) {
            if (getCurrentDir()[filetoSee[0].toUpperCase()].type === filetoSee[1].toUpperCase()) {
                return getCurrentDir()[filetoSee[0].toUpperCase()].contents;
            }
        }
    }
    return `File ${args} not found.`
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
function updatePathDisplay() {
    let pathText = "";
    if (currentpath.length == 0) {
        pathText = "\\";
    }
    currentpath.forEach(folder => {
        pathText = pathText + "\\" + folder.toUpperCase();
    });
    document.getElementById("path").innerHTML = pathText;
}
function getStuffInDir() {
    dirContent = Object.keys(getCurrentDir());
    return dirContent;
}
function getCurrentDir() {
    depth = currentpath.length;
    dir = fs;
    for (i = 0; i < depth; i++) {
        dir = dir[currentpath[i]].contents;
    }
    return dir;
}
function updateURL() {
    let pathText = "";
    if (currentpath.length == 0) {
        pathText = "/";
    }
    currentpath.forEach(folder => {
        pathText = pathText + "/" + folder.toUpperCase();
    });
    window.history.pushState({}, getCurrentDir(), pathText);
}