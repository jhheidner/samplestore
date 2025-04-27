
# Shopping Store E2E Tests

This repository contains end-to-end (E2E) tests for the **Shopping Store** application.

## Overview

The project is built using **Playwright** for E2E testing, which ensures the shopping store application is fully functional and free of regressions across all major browsers and devices.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 16.0.0)
- [Docker](https://www.docker.com/) (for containerized tests, optional)
- [Playwright](https://playwright.dev/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/shopping-store-tests.git
   cd shopping-store-tests
   ```

2. **Install dependencies:**

   Run the following command to install the necessary dependencies from the `package-lock.json` file.

   ```bash
   npm ci
   ```

### Running Tests

You can run the tests locally by using the following commands:

1. **Start the application** (make sure it’s running on the expected port):
   
   ```bash
   ./shopping-store-linux-amd64
   ```

2. **Run tests:**

   To execute the tests, use the command below:

   ```bash
   npm run test:ci
   ```

### CI/CD

This project is integrated with GitHub Actions to automatically run tests on push to the `main` branch. The setup uses **Playwright** in a Docker container.

### Troubleshooting

- If the tests fail during setup, verify that the **shopping store application** is up and running on `http://localhost:2221`.
- You may increase the `timeout` in the setup if the application is taking longer than expected to start.

---

## Contributing

Feel free to fork this project and submit pull requests. Contributions are welcome!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
