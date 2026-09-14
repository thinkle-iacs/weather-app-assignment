# Weather App: Live Data, Your Idea

Build a useful, surprising, or unusually delightful weather app. This starter already turns a U.S. ZIP code into a National Weather Service forecast. Your job is to turn that live data into an experience worth using.

You might answer a question such as:

- How far would someone have to travel to find sunshine?
- When is the best weather window for a run, game, photo shoot, or dog walk?
- When will it rain—and how confident should the user be?
- What will the weather be along a road trip?
- How can an ordinary forecast feel funny, calm, dramatic, beautiful, or specific to one audience?

You may also pitch your own idea. A conventional forecast is fine if the interface and visual design are genuinely your own.

## Start the project

1. Open a terminal in this repository.
2. Run `npm install` once.
3. Run `npm start` whenever you want to work.
4. Open the local URL printed in the terminal.

The page reloads automatically when you save. Stop the server with `Control+C`.

## How the starter works

The browser makes three requests:

1. `getCoordinatesForZip()` asks Zippopotam.us for the ZIP code's latitude and longitude.
2. `getForecastUrls()` asks `api.weather.gov/points/{latitude},{longitude}` which NWS office/grid serves that point and gets forecast URLs.
3. `getForecast()` follows the returned daily forecast URL.

Open `script.js` and follow those functions from `handleSubmit()` downward. The starter displays the complete forecast response as indented JSON in a `<pre>` element. It does not select forecast periods or build a finished interface. Choose which data matters for your idea and replace the raw output in `renderForecast()` with your own presentation. `styles.css` is linked but contains no style rules; the page intentionally uses browser defaults. Read the [NWS API documentation](https://www.weather.gov/documentation/services-web-api) to decide what your app needs.

> The National Weather Service covers the United States and its territories. The ZIP-code helper is only a convenient starting input; you may switch to coordinates, browser geolocation, a map, city buttons, a route, or another sensible input.

## Minimum project requirements

Your finished app must:

- use live weather data to serve a clear purpose or concept;
- transform the API data rather than merely printing raw JSON;
- use asynchronous JavaScript (`fetch`, `async`, and `await`);
- include useful loading, empty, and error states;
- work well with a keyboard and at narrow mobile widths;
- have a coherent visual system: intentional typography, color, spacing, and hierarchy;
- credit code, content, images, and AI assistance both in code comments and in the finished site;
- be published and submitted as both a working site link and a source-code link.

## Assessment: Digital Creation

Your whole site is assessed on the **Digital Creation** standard. The three rows below describe the evidence in this project; they are aspects of that overall assessment, not separate point totals.

| Aspect | Meeting the Standard (3) | Mastery (4) |
| --- | --- | --- |
| **Appearance** | Your site has an intentional, consistent visual design. You apply contrast, repetition, alignment, and grouping (CRAG). You choose typography and colors, maintain readable contrast, and design for narrow screens rather than leaving browser defaults. | Your visual choices work together to communicate the app's purpose and personality. Careful typography, spacing, color, and hierarchy guide attention; layouts show attention to detail across screen sizes and interface states. |
| **Function** | Your app serves a clear purpose. Controls have clear labels and affordances, work with a keyboard, and produce the expected result. Loading, empty, and error states help the user understand what is happening. | The app achieves its purpose with a thoughtful, efficient interaction flow. It handles unusual inputs and recovery gracefully, and its interactions show care for the user's experience. |
| **Working use of the API** | Your app successfully requests live weather data with asynchronous JavaScript and selects, transforms, and presents relevant values for your concept. The result goes beyond the starter's JSON dump. You can explain the request → response → output flow and acknowledge data sources and AI assistance on the site and in code. | You use API data thoughtfully to answer your chosen question through meaningful comparison, filtering, calculation, or another purposeful transformation. Your code is clear and well commented; it handles missing data and failed requests, and you can explain and verify how the output follows from the data. |

A working copy of the starter is a starting point, not a finished Digital Creation submission. Mastery comes from the quality and purpose of your decisions, not simply adding more features.

## Suggested milestones

1. **Trace the starter.** Label the input, request, response, transformation, and output in your own words.
2. **Choose a user and question.** Write one sentence: “This app helps ___ decide or understand ___.”
3. **Sketch before styling.** Make a rough mobile layout and identify the most important information.
4. **Build the data logic.** Filter, compare, calculate, or combine forecast periods to answer your question.
5. **Design the states.** Make loading, error, no-result, and success states feel intentional.
6. **Test and revise.** Try multiple ZIP codes, keyboard-only use, a phone-sized screen, and a failed request.
7. **Publish and explain.** Check the live URL and be prepared to explain your data flow and design choices.

## Project shape

```text
.
├── index.html          # page structure and accessible labels
├── styles.css          # empty stylesheet; design it yourself
├── script.js           # API requests, data logic, and rendering
├── citations.html      # visible source and AI acknowledgments
├── AGENTS.md           # guardrails for coding agents
├── package.json        # npm start command
└── .github/workflows/  # automatic GitHub Pages deployment
```

## Technical notes

- Do not put API keys or other secrets in browser JavaScript or commit them to GitHub.
- Check `response.ok` before reading a response as JSON.
- Treat API data as uncertain: properties can be absent, services can be slow, and requests can fail.
- Avoid hammering a public service while developing. Fetch in response to a deliberate user action.
- Keep functions focused. Separating “get data,” “choose data,” and “display data” makes experimentation easier.
- If you use a coding agent, keep its generated-code fences and update `citations.html` during the same work session. The repository includes matching instructions for Codex, Copilot, and other assistants.

## Publishing

Every push to `main` runs the included GitHub Pages action. In **Settings → Pages**, set **Source** to **GitHub Actions** if needed. The site URL will have this shape:

`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## Starter sources

- [National Weather Service API](https://www.weather.gov/documentation/services-web-api)
- [Zippopotam.us ZIP code API](https://www.zippopotam.us/)

Starter revised for IACS Web Design 2, 2026–2027.

Teachers preparing to launch this repository should search for `FIXME` or open [FIXME.md](FIXME.md).
