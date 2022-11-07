const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function run() {
    try {
        
        const inputTryer = core.getInput('tags_input_tryer');

        console.log('inputTryer', inputTryer);
        core.exportVariable('inputTryer', inputTryer);

        const aaa = core.getMultilineInput('tags_*', {
            required: false
        })

        console.log('aaa', aaa);
        core.exportVariable('aaa', aaa);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()