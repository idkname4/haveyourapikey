# **App Name**: Web2API Agent

## Core Features:

- Website Exploration Agent: Crawls internal links within the allowed domain using Firecrawl and Playwright as a fallback, identifying list, detail, and pagination patterns.
- Data Understanding & Extraction with LLM: Uses an LLM tool to infer repeating data structures and field types (string, number, date, enum), while also supporting user-defined fields for precise data extraction.
- API Generation: Automatically creates REST endpoints (GET only in MVP), pagination params, and filters where applicable, outputting JSON Schema and OpenAPI spec for easy integration.
- Human-in-the-Loop Controls: Requests approval for large crawls, form submissions, and auth-required pages, providing editable extraction rules to maintain control over the agent's actions.
- Failure Detection and Recovery: Detects and classifies CAPTCHAs, infinite pagination, DOM inconsistencies, and access denial, providing recovery suggestions to ensure the agent remains functional.
- Live Agent Explorer: Allows users to watch a live view of the agent exploring the site, providing transparency and aiding in debugging.
- API Playground: Provides a Swagger-like interface for users to test the generated endpoints in-browser, ensuring the API functions as expected.

## Style Guidelines:

- Primary color: Dark Purple (#4A148C) to give a sophisticated and technical feel to the interface.
- Background color: Near black (#121212) for a modern dark theme aesthetic.
- Accent color: Cyan (#00FFFF) to highlight key elements and actions within the interface, providing a clear visual contrast.
- Body and headline font: 'Inter' sans-serif font to ensure readability and a modern feel.
- Code font: 'Source Code Pro' monospaced font for code snippets.
- Use minimalist line icons to maintain a clean and developer-friendly interface.
- Subtle transitions and loading animations to enhance the user experience without being distracting.