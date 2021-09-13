const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

const JEST_DEFAULT_ARGUMENTS = [
    '--testRunner=jest-circus/runner',
    '--env=@thundra/core/dist/ForesightBootstrap.js'
    // '--env=ttt/test-environment.js'
];

// --testRunner=jest-circus/runner --env=@thundra/core/dist/ForesightBootstrap.js

async function run() {
    try {
        
        const apikey = core.getInput('apikey')
        const project_id = core.getInput('project_id');

        if (!apikey) {
            core.warning('Thundra API Key is not present. Exiting early...')
            core.warning('Instrumentation failed.')
        
            process.exit(core.ExitCode.Success)
        }
        
        if (!project_id) {
            core.warning('Thundra Project ID is not present. Exiting early...')
            core.warning('Instrumentation failed.')
        
            process.exit(core.ExitCode.Success)
        }

        core.exportVariable('THUNDRA_APIKEY', apikey)
        core.exportVariable('THUNDRA_AGENT_TEST_PROJECT_ID', project_id)

        const command = core.getInput('command');
        const autoTestRun = core.getInput('autoTestRun');
        const loadPredefiendModule = core.getInput('loadPredefiendModule');
       
        // export NODE_OPTIONS='-r epsagon-frameworks'
        // `who-to-greet` input defined in action metadata file
        const nameToGreet = core.getInput('who-to-greet');
        console.log(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
        // Get the JSON webhook payload for the event that triggered the workflow
        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);
        
        if (loadPredefiendModule) {
            console.log('loadPredefiendModule loadPredefiendModule loadPredefiendModule');
            core.exportVariable('NODE_OPTIONS', '-r @thundra/core');
        }

        if (command) {
            core.info(`[Thundra] Executing the command`)
            await exec.exec(`sh -c "${command}"`)
        }
        
        if (autoTestRun) {
            await exec.exec('npm test', ['--', ...JEST_DEFAULT_ARGUMENTS])
            // await exec.exec(`sh -c "jest --testRunner=jest-circus/runner --env=ttt/test-environment.js"`)
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()