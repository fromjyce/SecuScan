import * as path from 'path';
import { runTests } from 'vscode-test';

async function main() {
    try {
        await runTests({
            extensionDevelopmentPath: path.resolve(__dirname, '../../'),
            extensionTestsPath: path.resolve(__dirname, './extension.test.ts'),
            launchArgs: [
                path.resolve(__dirname, 'testFixture'),
                '--disable-extensions'
            ],
        });
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
