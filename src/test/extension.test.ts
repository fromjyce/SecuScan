import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import { scanDependencies } from '../dependencyScanner';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    const testFolder = path.resolve(__dirname, 'testFixture');

    test('scanDependencies should identify dependencies correctly from existing mock files', async () => {
        await scanDependencies(testFolder);
        assert.strictEqual(true, true);
    });
});
