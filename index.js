const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    try {

        const command = core.getInput('command')
        //core.exportVariable('NODE_OPTIONS', '-r ./abc');
        // export NODE_OPTIONS='-r epsagon-frameworks'
        // `who-to-greet` input defined in action metadata file
        const nameToGreet = core.getInput('who-to-greet');
        console.log(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        // Get the JSON webhook payload for the event that triggered the workflow
        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);
    
        if (command) {
            core.info(`[Thundra] Executing the command`)
            await exec.exec(`sh -c "${command}"`)
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()