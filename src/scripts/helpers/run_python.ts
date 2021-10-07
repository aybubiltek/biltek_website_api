import { spawn } from "child_process";
import readline from "readline";

const proc = spawn('python3', ['-u','/home/osman/projects/biltek_website_api/src/scripts/helpers/ctf.py'], {
    detached:true
})

var lineReader = readline.createInterface({
    input: proc.stdout,
    output: proc.stdin,
    terminal:false
})

proc.stdout.on("data", (data)=>{
    console.log(data)
})

lineReader.on('line', (line) => {
    console.log(line)
})

proc.on('close', (code, signal) => {
    console.log(`child process closed with code ${code} and signal ${signal}`);
});
