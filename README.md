# Excel Shortcut Trainer — PE/IB Edition

A browser-based drilling game for practicing Excel keyboard shortcuts used in
private equity / investment banking financial modeling — navigation,
selection, formulas, number formatting, paste special, and more.

Pick **Windows** or **Mac** and the game quizzes you with the correct key
combination for that platform.

## Running it

No build step, no dependencies. Just open `index.html` in a browser:

```
open index.html
```

Or serve it locally (needed if your browser blocks local script loading):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How it works

- **Press the real keys mode** (default): a task is shown (e.g. "Apply
  Percentage format") and you press the actual shortcut on your keyboard.
  A handful of shortcuts that browsers themselves intercept (Find, Print,
  Reload, etc.) automatically fall back to multiple choice so the browser
  doesn't hijack the keystroke.
- **Multiple choice mode**: click the correct key combination from four
  options.
- **Cheat Sheet**: a full reference of every shortcut in the game for the
  selected platform, browsable before or after a round.

Scores, streaks, and per-category accuracy are shown at the end of each
round, along with a list of missed shortcuts to review. Best scores per
platform are saved locally in your browser.
