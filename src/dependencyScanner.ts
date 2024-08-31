import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as vscode from 'vscode';

const vulnerabilityDatabaseUrl = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const apiKey = '44fb5eb1-da14-4e10-9a94-6fa742f58b42';

export async function scanDependencies(folder: string) {
    const files = ['package.json', 'requirements.txt', 'Pipfile', 'Gemfile', 'composer.json', 'pom.xml', 'build.gradle', 'Cargo.toml', 'go.mod'];
    for (const file of files) {
        const filePath = path.join(folder, file);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const dependencies = parseDependencies(content, file);
            await checkVulnerabilities(dependencies);
        }
    }
}

function parseDependencies(content: string, fileName: string): string[] {
    const dependencies: string[] = [];

    if (fileName === 'package.json') {
        const json = JSON.parse(content);
        if (json.dependencies) {
            Object.keys(json.dependencies).forEach(dep => dependencies.push(`${dep}@${json.dependencies[dep]}`));
        }
        if (json.devDependencies) {
            Object.keys(json.devDependencies).forEach(dep => dependencies.push(`${dep}@${json.devDependencies[dep]}`));
        }
    } else if (fileName === 'requirements.txt') {
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                dependencies.push(line.trim());
            }
        });
    } else if (fileName === 'Pipfile') {
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.includes('=') && !line.startsWith('#')) {
                const dep = line.split('=')[0].trim();
                dependencies.push(dep);
            }
        });
    } else if (fileName === 'Gemfile') {
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.startsWith('gem')) {
                const dep = line.split(' ')[1].replace(/['",]/g, '').trim();
                dependencies.push(dep);
            }
        });
    } else if (fileName === 'composer.json') {
        const json = JSON.parse(content);
        if (json.require) {
            Object.keys(json.require).forEach(dep => dependencies.push(`${dep}@${json.require[dep]}`));
        }
        if (json['require-dev']) {
            Object.keys(json['require-dev']).forEach(dep => dependencies.push(`${dep}@${json['require-dev'][dep]}`));
        }
    } else if (fileName === 'pom.xml') {
        const regex = /<dependency>[\s\S]*?<groupId>(.*?)<\/groupId>[\s\S]*?<artifactId>(.*?)<\/artifactId>[\s\S]*?<version>(.*?)<\/version>[\s\S]*?<\/dependency>/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            dependencies.push(`${match[2]}@${match[3]}`);
        }
    } else if (fileName === 'build.gradle') {
        const regex = /(?:implementation|compile|api)\s*['"]([\w\.\-]+):([\w\.\-]+):([\w\.\-]+)['"]/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            dependencies.push(`${match[2]}@${match[3]}`);
        }
    } else if (fileName === 'Cargo.toml') {
        const regex = /\[dependencies\][\s\S]*?([\w\-]+)\s*=\s*["']([\w\.\-]+)["']/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            dependencies.push(`${match[1]}@${match[2]}`);
        }
    } else if (fileName === 'go.mod') {
        const regex = /require\s+([\w\.\-\/]+)\s+([\w\.\-]+)/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            dependencies.push(`${match[1]}@${match[2]}`);
        }
    }

    return dependencies;
}

async function checkVulnerabilities(dependencies: string[]) {
    for (const dep of dependencies) {
        const [packageName] = dep.split('@');
        try {
            const response = await axios.get(`${vulnerabilityDatabaseUrl}?keywordSearch=${packageName}&apiKey=${apiKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.vulnerabilities && response.data.vulnerabilities.length > 0) {
                const vulnList = response.data.vulnerabilities.map((item: any) => item.cve.id).join(', ');
                vscode.window.showWarningMessage(`Vulnerabilities found in ${dep}: ${vulnList}`);
            } else {
                vscode.window.showInformationMessage(`No vulnerabilities found for ${dep}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`Error checking vulnerabilities for ${dep}: ${error.message}`);
            } else {
                vscode.window.showErrorMessage(`An unknown error occurred while checking vulnerabilities for ${dep}`);
            }
        }        
    }
}
