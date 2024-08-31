# SecuScan

SecuScan is a Visual Studio Code extension designed to scan for security vulnerabilities in project dependencies. It helps developers ensure their projects are secure by analyzing and identifying potential vulnerabilities in dependencies using the NVD (National Vulnerability Database) API.

## Features

- **Dependency Scanner**: Scan your project's dependencies for known security vulnerabilities.
- **Custom Commands**: Execute commands to perform security checks on your project dependencies.
- **NVD API Integration**: Uses the National Vulnerability Database (NVD) API to fetch and analyze vulnerability data.

## NVD API Usage

SecuScan leverages the National Vulnerability Database (NVD) API to identify vulnerabilities in project dependencies. The NVD provides a comprehensive source of vulnerability data, including Common Vulnerabilities and Exposures (CVE) identifiers and detailed descriptions.

### How It Works

1. **Dependency Analysis**: When you initiate a scan, SecuScan collects and analyzes the list of dependencies in your project.
2. **API Request**: SecuScan queries the NVD API to fetch vulnerability data related to the dependencies identified in your project.
3. **Data Matching**: The extension matches the fetched vulnerability data with your project's dependencies to identify any known issues.
4. **Results Display**: The results are presented in the VS Code interface, highlighting any vulnerabilities found and providing detailed information about each issue.

### NVD API Integration

SecuScan uses the NVD API endpoints to retrieve the latest vulnerability information. To ensure effective and accurate scanning, the extension is configured to:

- **Fetch Vulnerability Data**: Query the NVD for current vulnerability records related to project dependencies.
- **Update Regularly**: Access the latest updates from the NVD to keep the vulnerability database current.

For more information about the NVD API, visit the [NVD API Documentation](https://nvd.nist.gov/developers/vulnerabilities).

## Installation / Development

To install the SecuScan extension, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/secuscan.git
   cd secuscan
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile the Extension**:
   ```bash
   npm run compile
   ```

4. **Run Tests**:
   ```bash
   npm run test
   ```

5. **Package the Extension**:
   ```bash
   vsce package
   ```

6. **Install the VSIX Package**:
   - Open Visual Studio Code.
   - Go to the Extensions view.
   - Click on the ellipsis (...) and select `Install from VSIX...`.
   - Choose the generated `.vsix` file to install.

## Usage

Once installed, you can use the SecuScan extension to scan your project's dependencies:

1. **Open Command Palette**: Press `Ctrl+Shift+P` or `F1`.
2. **Run Command**: Type `SecuScan: Check Project Dependencies` and select it to run the dependency check.

## Technical Stack

- **Programming Language**: TypeScript, Javascript
- **Build Tool**: Webpack
- **Testing Framework**: Mocha
- **Dependency Management**: npm
- **VS Code API**: Utilizes the VS Code extension API for integration and command execution.
- **Vulnerability Data**: National Vulnerability Database (NVD) API

## Contact

If you come across any issues, have suggestions for improvement, or want to discuss further enhancements, feel free to contact me at [jaya2004kra@gmail.com](mailto:jaya2004kra@gmail.com). Your feedback is greatly appreciated.

## License

All the code and resources in this repository are licensed under the Creative Commons Legal Code License. You are free to use, modify, and distribute the code under the terms of this license. However, I do not take responsibility for the accuracy or reliability of the programs.

## My Social Profiles:

- [**LINKEDIN**](https://www.linkedin.com/in/jayashrek/)