# Security Policy

## Supported Versions

The following versions of this project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| v1.x.x  | :white_check_mark: |
| < v1.x  | :x:                |

## Reporting a Vulnerability

I take the security of this project seriously. If you believe you have found a security vulnerability, please report it responsibly.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:

1.  **Email:** Send a detailed report to [surya.mangaraj@example.com](mailto:surya.mangaraj@example.com) (replace with your actual contact if available, or I'll use a placeholder for now).
2.  **GitHub Private Vulnerability Reporting:** If enabled for this repository, please use the "Report a vulnerability" button in the Security tab.

### What to include in your report

To help me address the issue quickly, please include:

-   A description of the vulnerability and its potential impact.
-   Steps to reproduce the issue (proof-of-concept code or screenshots are very helpful).
-   The environment where the issue was discovered (e.g., browser version, OS).

### Our Response Process

1.  **Acknowledgement:** You will receive an acknowledgement of your report within 48 hours.
2.  **Investigation:** I will investigate the report and determine the severity and impact.
3.  **Fix:** If a vulnerability is confirmed, I will work on a fix as a priority.
4.  **Disclosure:** Once a fix is implemented and verified, I will release a new version. Public disclosure will happen after the fix is available to users.

## Security Best Practices

As this is a static/SPA portfolio site, security risks are primarily focused on:

-   **Cross-Site Scripting (XSS):** Ensuring all dynamic content is properly sanitized.
-   **Dependency Vulnerabilities:** Regularly updating `npm` packages to patch known issues.
-   **Deployment Security:** Ensuring the hosting platform is configured with secure headers (HSTS, CSP, etc.).

---

*Last Updated: May 2026*
