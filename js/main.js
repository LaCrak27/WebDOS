const BlinkingIntervalID = setInterval(blinker, 150);
let currentpath = []; //Would display as \ABOUT\SOCIALS (navigating the obj directly)
let commandsUsed = [];
let currentCommandIndex = -1;
//File system
let fs = {
    ABOUT: {
        type: '&lt;DIR&gt;',
        contents: {
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
            },
            ABOUTME: {
                type: 'TXT',
                contents: 'My name\'s Ivan, and I\'m a 17yo developer from spain. Im studying software engineering at the moment, and working on several side projects, as well as in my game Star Strike (you can learn more at www.starstrikegame.com). I really am down to code just anything, as I\'m comfortable with most languages (except python, fuck python) so if you have anything you need, don\'t hesitate to contact me! (check SOCIALS folder).'
            },
            ABOUTWEBDOS: {
                type: 'TXT',
                contents: 'This is a website that I originally intended to be my portfolio, similar to those console based ones, but I thought that making it resemble DOS and have some of it\'s commands instead of just your basic "youtube" and "help" commands would be nice, so this is what ended up coming out of it. Made in a weekend with <3 by LaCrak27, using pure html/css/js.'
            }
        }
    },
    WINDOWS: {
        type: '&lt;DIR&gt;',
        contents: {

        }
    },
    COMMAND: {
        type: 'COM',
        contents: '€ú/uÆú\€> u&Æ \ \ ´:¢^@<@t"ý€> u¿Ÿ ¾ ¹ ó¤&£ ü£¢< èEø¾€ ¬ŠÈ2íãC¾ ¬< t<	t:ª'
    },
    HELP: {
        type: 'TXT',
        contents: `This is a DOS simulator for js. It works similar to how an actual DOS works.<br>
        (All commands are case insensitive, just like in DOS)<br>
        Available commands are:<br><br>
        DIR: Shows files and folders in the current directory.<br>
        TYPE foo: Prints the contents of "foo" into the console.<br>
        CD foo: Goes into directory (folder) "foo" (also use cd.. to move back a directory).<br>
        REN foo bar: Renames file "foo" into "bar".<br>
        COPY foo bar: Copies file "foo" into a new file named "bar".<br>
        ERASE foo: Deletes file "foo".<br>
        RMDIR foo: Deltes directory "foo" and all its contents.<br>
        MKDIR foo: Makes a new directory with name "FOO".<br>
        MKFILE foo: Makes a new TXT file with name "FOO".<br>
        EDIT foo bar lorem: Editing files, type EDIT and press enter for more help.<br>
        ECHO foo: Just prints "foo" to the screen.<br>
        PING foo: Tries to ping host "foo" over the internet.<br>
        CLS: Clears the screen.<br>
        DOWN foo: Downloads file foo.
        `
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
    }
}
let file = {
    type: 'TXT',
    contents: ''
};
let folder = {
    type: '&lt;DIR&gt;',
    contents: {

    }
};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "Enter":
            uc = document.getElementById("input").innerHTML;
            ucu = uc.toUpperCase();
            args = document.getElementById("input").innerHTML.split(' ');
            uppercaseCommand = args.shift().toUpperCase();
            replacedCommand = uppercaseCommand.replaceAll('\.', "p");
            processCommand(replacedCommand, args, ucu);
            commandsUsed.push(document.getElementById("input").innerHTML);
            document.getElementById("input").innerHTML = "";
            currentCommandIndex = commandsUsed.length - 1;
            break;
        case "Backspace":
            document.getElementById("input").innerHTML = document.getElementById("input").innerHTML.slice(0, -1); //Removes last keystroke. 
            break;
        case "ArrowUp":
            if (commandsUsed[currentCommandIndex] != undefined) {
                document.getElementById("input").innerHTML = commandsUsed[currentCommandIndex];
                currentCommandIndex--;
                window.scrollTo(0, document.body.scrollHeight);
            }
            event.preventDefault();
            break;
        case "ArrowDown":
            if (commandsUsed[currentCommandIndex] != undefined) {
                document.getElementById("input").innerHTML = commandsUsed[currentCommandIndex];
                currentCommandIndex++;
                window.scrollTo(0, document.body.scrollHeight);
            }
            break;
        default:
            if (event.metaKey || event.altKey || event.ctrlKey) break;
            if (event.key.length > 1) break; //Prevent keys like CapsLock from registering
            document.getElementById("input").innerHTML = document.getElementById("input").innerHTML + event.key; //Adds the key.
            break;
    }
    return false;
});
document.addEventListener('touchstart', (e) => {
    document.getElementById("hfield").focus();
    e.preventDefault();
})

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
    if (args.length != 1) {
        return "Command structure: PING host";
    }
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
            if (folderToMoveTo == 'WINDOWS') return "Access Denied";
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
    if (args.length != 1) {
        return "Command structure: TYPE FileToSee.EXTENSION";
    }
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
function REN(args) {
    if (args.length != 2) {
        return "Command structure: REN FileToRename NewName (no extensions)";
    }
    else {
        oldName = args[0].toUpperCase();
        newName = args[1].toUpperCase();
        if (getStuffInDir().includes(oldName) && (getStuffInDir().includes(newName) == false)) {
            if (getCurrentDir()[oldName].type != '&lt;DIR&gt;') {
                rename(oldName, newName);
                return "Renamed Succesfully";
            }
            else {
                return `File ${oldName} was not found.`;
            }
        }
        else {
            return `File ${oldName} was not found or file ${newName} already exists in directory.`;
        }
    }
}
function COPY(args) {
    if (args.length != 2) {
        return "Command structure: COPY FileToCopyFrom NewFileName (no extensions)";
    }
    else {
        oldName = args[0].toUpperCase();
        newName = args[1].toUpperCase();
        if (getStuffInDir().includes(oldName) && (getStuffInDir().includes(newName) == false)) {
            if (getCurrentDir()[oldName].type != '&lt;DIR&gt;') {
                copy(oldName, newName);
                return "File copied succesfully.";
            }
            else {
                return `File ${oldName} was not found.`;
            }
        }
        else {
            return `File ${oldName} was not found or file ${newName} already exists in directory.`;
        }
    }
}
function ERASE(args) {
    if (args.length != 1) {
        return "Command structure: ERASE FileToErase (no extensions)";
    }
    else {
        fileToErase = args[0].toUpperCase();
        if (getStuffInDir().includes(fileToErase)) {
            if (getCurrentDir()[fileToErase].type != '&lt;DIR&gt;') {
                deleteFile(fileToErase);
                return "File deleted succesfully.";
            }
            else {
                return `File ${fileToErase} was not found.`;
            }
        }
        else {
            return `File ${fileToErase} was not found.`;
        }
    }
}
function RMDIR(args) {
    if (args.length != 1) {
        return "Command structure: RMDIR DirectoryToErase";
    }
    else {
        dirToErase = args[0].toUpperCase();
        if (getStuffInDir().includes(dirToErase)) {
            if (getCurrentDir()[dirToErase].type === '&lt;DIR&gt;') {
                deleteFile(dirToErase);
                return "Directory deleted succesfully.";
            }
            else {
                return `Directory ${dirToErase} was not found.`;
            }
        }
        else {
            return `Directory ${dirToErase} was not found.`;
        }
    }
}
function MKFILE(args) {
    if (args.length != 1) {
        return "Command structure: MKFILE NewFileName";
    }
    newFileName = args[0].toUpperCase();
    if (getStuffInDir().includes(newFileName)) {
        return `File ${newFileName} already exists on current directory.`;
    }
    else {
        createFile(newFileName);
        return "File created succesfully."
    }
}
function MKDIR(args) {
    if (args.length != 1) {
        return "Command structure: MKDIR NewDirectoryName";
    }
    newDirName = args[0].toUpperCase();
    if (currentpath.includes(newDirName)) {
        return "Unknown error occured, please try with a different dir name."
    }
    if (getStuffInDir().includes(newDirName)) {
        return `Directory ${newDirName} already exists on current directory.`;
    }
    else {
        createDir(newDirName);
        return "Directory created succesfully."
    }
}
function EDIT(args) {
    if (args.length < 3) {
        return "Command structure: EDIT ADD FileToEdit StringToAdd.<br>EDIT REM FileToEdit NumberOfCharactersToErase (no extensions) (use <br> for line breaks).";
    }
    else {
        action = args.shift().toUpperCase();
        FileName = args.shift().toUpperCase();
        if (action === 'REM') {
            if (isNumeric(args[0])) {
                if (getStuffInDir().includes(FileName)) {
                    if (getCurrentDir()[fileName].type != '&lt;DIR&gt;') {
                        for (let i = 0; i < args[0]; i++) {
                            getCurrentDir()[FileName].contents = getCurrentDir()[FileName].contents.slice(0, -1);//For loop here to prevent out of bounds exception
                            return "Operation completed succesfully";
                        }
                    }
                    else {
                        return "Command structure: EDIT ADD FileToEdit StringToAdd.<br>EDIT REM FileToEdit NumberOfCharactersToErase (no extensions) (use <br> for line breaks).";
                    }
                }
            }
            else {
                return "Command structure: EDIT ADD FileToEdit StringToAdd.<br>EDIT REM FileToEdit NumberOfCharactersToErase (no extensions) (use <br> for line breaks).";
            }
        }
        if (action === 'ADD') {
            if (getStuffInDir().includes(FileName)) {
                if (getCurrentDir()[fileName].type != '&lt;DIR&gt;') {
                    stuffToAdd = ""
                    args.forEach(word => {
                        stuffToAdd = stuffToAdd + word + " ";
                    });
                    getCurrentDir()[FileName].contents = getCurrentDir()[FileName].contents + stuffToAdd;
                    return "Operation completed succesfully";
                }
                else {
                    return "Command structure: EDIT ADD FileToEdit StringToAdd.<br>EDIT REM FileToEdit NumberOfCharactersToErase (no extensions) (use <br> for line breaks).";
                }
            }
        }
    }
    return "Command structure: EDIT ADD FileToEdit StringToAdd.<br>EDIT REM FileToEdit NumberOfCharactersToErase (no extensions) (use <br> for line breaks).";
}
function DOWN(args) {
    if (args.length != 1) {
        return "Command structure: DOWN FileToDownload (no extensions).";
    }
    else {
        if (getStuffInDir().includes(args[0].toUpperCase())) {
            downloadFile(getCurrentDir()[args[0].toUpperCase()].contents, args[0].toUpperCase(), getCurrentDir()[args[0].toUpperCase()].type)
            return "Downloading...";
        }
        else {
            return "File could not be found.";
        }
    }
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
function rename(oldName, newName) {
    getCurrentDir()[newName] = getCurrentDir()[oldName];
    delete getCurrentDir()[oldName];
}
function copy(fileToCopyFrom, newFileName) {
    getCurrentDir()[newFileName] = getCurrentDir()[fileToCopyFrom];
}
function deleteFile(fileToDelete) {
    delete getCurrentDir()[fileToDelete];
}
function createFile(newFileName) {
    let tempObj = JSON.parse(JSON.stringify(file)); //Weird ass clone creating tech, need it so that the clone doesn't affect the new folder
    getCurrentDir()[newFileName] = tempObj;
}
function createDir(newDirName) {
    let tempObj = JSON.parse(JSON.stringify(folder));
    getCurrentDir()[newDirName] = tempObj;
    console.log(fs);
}
const isNumeric = value =>
    value.length !== 0 && [...value].every(c => c >= '0' && c <= '9');

const downloadFile = (fileContent, fileName, fileExtension) => {
    const link = document.createElement("a");
    const content = fileContent;
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = `${fileName}.${fileExtension}`;
    link.click();
    URL.revokeObjectURL(link.href);
};