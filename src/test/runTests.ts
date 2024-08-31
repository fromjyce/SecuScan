import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        const extensionTestsPath = path.resolve(__dirname, '../../out/test/extension.test.js');

        console.log(`Extension Development Path: ${extensionDevelopmentPath}`);
        console.log(`Extension Tests Path: ${extensionTestsPath}`);

        // Debug log
        console.log(`Checking if test file exists: ${extensionTestsPath}`);
        const fs = require('fs');
        if (fs.existsSync(extensionTestsPath)) {
            console.log('Test file exists.');
        } else {
            console.error('Test file does not exist.');
        }

        await runTests({ extensionDevelopmentPath, extensionTestsPath });
    } catch (err) {
        console.error('Failed to run tests:', err);
        process.exit(1);
    }
}

main();
