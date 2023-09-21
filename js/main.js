const BlinkingIntervalID = setInterval(blinker, 200);
var date = new Date();
//Setting Version based off date
//document.getElementById("versiontext").innerHTML = date.getHours() + "." + date.getMinutes() + "." + date.getDay() + date.getMonth() + date.getFullYear.slice(2, 0)
//Input for console handler
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

function processCommand(command, args) {
    if (command === "" || undefined) {
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "C:\\" + document.getElementById("path").innerHTML + ">" + "<br>";
    }
    else {
        document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + "C:\\" + document.getElementById("path").innerHTML + ">" + document.getElementById("input").innerHTML + "<br>";
        if (typeof window[command] === 'function') {
            result = window[command](args);
            document.getElementById("commands").innerHTML = document.getElementById("commands").innerHTML + result;
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
    var blinking = document.getElementById("blink");
    blinking.style.visibility = (blinking.style.visibility == "hidden" ? "" : "hidden");
}

//COMMANDS FROM HERE, STRUCTURE: function COMMANDNAME(args: string) > returns a string. (see example)
function ECHO(args) {
    s = "";
    args.forEach(word => {
        s = s + ' ' + word
    });
    return s;
}