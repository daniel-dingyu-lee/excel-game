// Excel Shortcut Trainer — shortcut data set
// Curated for PE / IB financial modeling workflows.
//
// Each item has a `win` and `mac` variant:
//   spec:   { ctrl, alt, shift, meta, key } — used to match a real KeyboardEvent
//   labels: display chips, e.g. ['Ctrl','Shift','%']
//   safe:   whether the combo can reliably be captured in a browser without the
//           browser itself hijacking it (view-source, reload, close tab, etc).
//           When false, the game auto-falls-back to multiple-choice for that
//           question on that platform.

const CATEGORIES = [
  'Navigation',
  'Selection',
  'Formulas & Calculation',
  'Number Formatting',
  'Text Formatting',
  'Editing & Cells',
  'Rows & Columns',
  'Find & Replace',
  'Workbook & Files',
  'Misc',
];

const SHORTCUTS = [
  // ---------- Navigation ----------
  {
    id: 'nav-a1', category: 'Navigation',
    task: 'Jump straight to cell A1 (beginning of the worksheet)',
    win: { spec: { ctrl: true, key: 'Home' }, labels: ['Ctrl', 'Home'], safe: true },
    mac: { spec: { ctrl: true, key: 'Home' }, labels: ['Ctrl', 'fn', '←'], safe: true },
  },
  {
    id: 'nav-end', category: 'Navigation',
    task: 'Jump to the last used cell in the worksheet',
    win: { spec: { ctrl: true, key: 'End' }, labels: ['Ctrl', 'End'], safe: true },
    mac: { spec: { ctrl: true, key: 'End' }, labels: ['Ctrl', 'fn', '→'], safe: true },
  },
  {
    id: 'nav-goto', category: 'Navigation',
    task: 'Open the "Go To" dialog to jump to a specific cell/range',
    win: { spec: { ctrl: true, key: 'g' }, labels: ['Ctrl', 'G'], safe: true },
    mac: { spec: { ctrl: true, key: 'g' }, labels: ['Ctrl', 'G'], safe: true },
  },
  {
    id: 'nav-edge', category: 'Navigation',
    task: 'Jump to the bottom edge of a contiguous data range (like the end of a column of data)',
    win: { spec: { ctrl: true, key: 'ArrowDown' }, labels: ['Ctrl', '↓'], safe: true },
    mac: { spec: { meta: true, key: 'ArrowDown' }, labels: ['Cmd', '↓'], safe: true },
  },
  {
    id: 'nav-pgdn', category: 'Navigation',
    task: 'Move the view down one full screen',
    win: { spec: { key: 'PageDown' }, labels: ['Page Down'], safe: true },
    mac: { spec: { key: 'PageDown' }, labels: ['fn', '↓'], safe: true },
  },

  // ---------- Selection ----------
  {
    id: 'sel-col', category: 'Selection',
    task: 'Select the entire column of the active cell',
    win: { spec: { ctrl: true, key: ' ' }, labels: ['Ctrl', 'Space'], safe: true },
    mac: { spec: { ctrl: true, key: ' ' }, labels: ['Ctrl', 'Space'], safe: false },
  },
  {
    id: 'sel-row', category: 'Selection',
    task: 'Select the entire row of the active cell',
    win: { spec: { shift: true, key: ' ' }, labels: ['Shift', 'Space'], safe: true },
    mac: { spec: { shift: true, key: ' ' }, labels: ['Shift', 'Space'], safe: true },
  },
  {
    id: 'sel-extend', category: 'Selection',
    task: 'Extend the selection down to the last non-blank cell in the column',
    win: { spec: { ctrl: true, shift: true, key: 'ArrowDown' }, labels: ['Ctrl', 'Shift', '↓'], safe: true },
    mac: { spec: { meta: true, shift: true, key: 'ArrowDown' }, labels: ['Cmd', 'Shift', '↓'], safe: true },
  },
  {
    id: 'sel-all', category: 'Selection',
    task: 'Select the current region / entire worksheet',
    win: { spec: { ctrl: true, key: 'a' }, labels: ['Ctrl', 'A'], safe: true },
    mac: { spec: { meta: true, key: 'a' }, labels: ['Cmd', 'A'], safe: true },
  },
  {
    id: 'sel-begin', category: 'Selection',
    task: 'Extend the selection to the beginning of the worksheet',
    win: { spec: { ctrl: true, shift: true, key: 'Home' }, labels: ['Ctrl', 'Shift', 'Home'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: 'Home' }, labels: ['Ctrl', 'Shift', 'fn', '←'], safe: true },
  },
  {
    id: 'sel-endext', category: 'Selection',
    task: 'Extend the selection to the last used cell',
    win: { spec: { ctrl: true, shift: true, key: 'End' }, labels: ['Ctrl', 'Shift', 'End'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: 'End' }, labels: ['Ctrl', 'Shift', 'fn', '→'], safe: true },
  },

  // ---------- Formulas & Calculation ----------
  {
    id: 'f-autosum', category: 'Formulas & Calculation',
    task: 'Insert AutoSum for the selected range',
    win: { spec: { alt: true, key: '=' }, labels: ['Alt', '='], safe: true },
    mac: { spec: { shift: true, meta: true, key: 't' }, labels: ['Shift', 'Cmd', 'T'], safe: false },
  },
  {
    id: 'f-abs', category: 'Formulas & Calculation',
    task: 'While editing a formula, toggle a reference between relative and absolute ($A$1, A$1, $A1, A1)',
    win: { spec: { key: 'F4' }, labels: ['F4'], safe: true },
    mac: { spec: { key: 'F4' }, labels: ['F4'], safe: true },
  },
  {
    id: 'f-showformulas', category: 'Formulas & Calculation',
    task: 'Toggle showing formulas instead of their calculated values (great for auditing a model)',
    win: { spec: { ctrl: true, key: '`' }, labels: ['Ctrl', '`'], safe: true },
    mac: { spec: { ctrl: true, key: '`' }, labels: ['Ctrl', '`'], safe: true },
  },
  {
    id: 'f-filldown', category: 'Formulas & Calculation',
    task: 'Fill the selection down from the top row',
    win: { spec: { ctrl: true, key: 'd' }, labels: ['Ctrl', 'D'], safe: true },
    mac: { spec: { meta: true, key: 'd' }, labels: ['Cmd', 'D'], safe: true },
  },
  {
    id: 'f-fillright', category: 'Formulas & Calculation',
    task: 'Fill the selection right from the leftmost column',
    win: { spec: { ctrl: true, key: 'r' }, labels: ['Ctrl', 'R'], safe: false },
    mac: { spec: { meta: true, key: 'r' }, labels: ['Cmd', 'R'], safe: false },
  },
  {
    id: 'f-copyabove', category: 'Formulas & Calculation',
    task: 'Copy the value/formula from the cell directly above into the active cell',
    win: { spec: { ctrl: true, key: "'" }, labels: ['Ctrl', "'"], safe: true },
    mac: { spec: { ctrl: true, key: "'" }, labels: ['Ctrl', "'"], safe: true },
  },
  {
    id: 'f-calcall', category: 'Formulas & Calculation',
    task: 'Recalculate all open workbooks',
    win: { spec: { key: 'F9' }, labels: ['F9'], safe: true },
    mac: { spec: { key: 'F9' }, labels: ['F9'], safe: true },
  },
  {
    id: 'f-calcsheet', category: 'Formulas & Calculation',
    task: 'Recalculate only the active worksheet',
    win: { spec: { shift: true, key: 'F9' }, labels: ['Shift', 'F9'], safe: true },
    mac: { spec: { shift: true, key: 'F9' }, labels: ['Shift', 'F9'], safe: true },
  },

  // ---------- Number Formatting ----------
  {
    id: 'nf-general', category: 'Number Formatting',
    task: 'Apply the General number format',
    win: { spec: { ctrl: true, shift: true, key: '~' }, labels: ['Ctrl', 'Shift', '~'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '~' }, labels: ['Ctrl', 'Shift', '~'], safe: true },
  },
  {
    id: 'nf-currency', category: 'Number Formatting',
    task: 'Apply Currency format with 2 decimal places',
    win: { spec: { ctrl: true, shift: true, key: '$' }, labels: ['Ctrl', 'Shift', '$'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '$' }, labels: ['Ctrl', 'Shift', '$'], safe: true },
  },
  {
    id: 'nf-percent', category: 'Number Formatting',
    task: 'Apply Percentage format with no decimal places',
    win: { spec: { ctrl: true, shift: true, key: '%' }, labels: ['Ctrl', 'Shift', '%'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '%' }, labels: ['Ctrl', 'Shift', '%'], safe: true },
  },
  {
    id: 'nf-comma', category: 'Number Formatting',
    task: 'Apply Comma (thousands separator) format',
    win: { spec: { ctrl: true, shift: true, key: '!' }, labels: ['Ctrl', 'Shift', '!'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '!' }, labels: ['Ctrl', 'Shift', '!'], safe: true },
  },
  {
    id: 'nf-date', category: 'Number Formatting',
    task: 'Apply Date format',
    win: { spec: { ctrl: true, shift: true, key: '#' }, labels: ['Ctrl', 'Shift', '#'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '#' }, labels: ['Ctrl', 'Shift', '#'], safe: true },
  },
  {
    id: 'nf-time', category: 'Number Formatting',
    task: 'Apply Time format',
    win: { spec: { ctrl: true, shift: true, key: '@' }, labels: ['Ctrl', 'Shift', '@'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '@' }, labels: ['Ctrl', 'Shift', '@'], safe: true },
  },

  // ---------- Text Formatting ----------
  {
    id: 'tf-bold', category: 'Text Formatting',
    task: 'Toggle Bold on the selection',
    win: { spec: { ctrl: true, key: 'b' }, labels: ['Ctrl', 'B'], safe: true },
    mac: { spec: { meta: true, key: 'b' }, labels: ['Cmd', 'B'], safe: true },
  },
  {
    id: 'tf-italic', category: 'Text Formatting',
    task: 'Toggle Italic on the selection',
    win: { spec: { ctrl: true, key: 'i' }, labels: ['Ctrl', 'I'], safe: true },
    mac: { spec: { meta: true, key: 'i' }, labels: ['Cmd', 'I'], safe: true },
  },
  {
    id: 'tf-underline', category: 'Text Formatting',
    task: 'Toggle Underline on the selection',
    win: { spec: { ctrl: true, key: 'u' }, labels: ['Ctrl', 'U'], safe: false },
    mac: { spec: { meta: true, key: 'u' }, labels: ['Cmd', 'U'], safe: true },
  },
  {
    id: 'tf-strike', category: 'Text Formatting',
    task: 'Toggle Strikethrough on the selection',
    win: { spec: { ctrl: true, key: '5' }, labels: ['Ctrl', '5'], safe: true },
    mac: { spec: { shift: true, meta: true, key: 'x' }, labels: ['Shift', 'Cmd', 'X'], safe: true },
  },

  // ---------- Editing & Cells ----------
  {
    id: 'e-edit', category: 'Editing & Cells',
    task: 'Edit the active cell (put it into edit mode)',
    win: { spec: { key: 'F2' }, labels: ['F2'], safe: true },
    mac: { spec: { key: 'F2' }, labels: ['F2'], safe: true },
  },
  {
    id: 'e-formatcells', category: 'Editing & Cells',
    task: 'Open the Format Cells dialog',
    win: { spec: { ctrl: true, key: '1' }, labels: ['Ctrl', '1'], safe: true },
    mac: { spec: { meta: true, key: '1' }, labels: ['Cmd', '1'], safe: true },
  },
  {
    id: 'e-pastespecial', category: 'Editing & Cells',
    task: 'Open the Paste Special dialog (crucial for pasting values-only over formulas)',
    win: { spec: { ctrl: true, alt: true, key: 'v' }, labels: ['Ctrl', 'Alt', 'V'], safe: true },
    mac: { spec: { ctrl: true, meta: true, key: 'v' }, labels: ['Ctrl', 'Cmd', 'V'], safe: true },
  },
  {
    id: 'e-insertcells', category: 'Editing & Cells',
    task: 'Insert cells / rows / columns at the selection',
    win: { spec: { ctrl: true, shift: true, key: '+' }, labels: ['Ctrl', 'Shift', '+'], safe: false },
    mac: { spec: { meta: true, shift: true, key: '+' }, labels: ['Cmd', 'Shift', '+'], safe: false },
  },
  {
    id: 'e-deletecells', category: 'Editing & Cells',
    task: 'Delete the selected cells / rows / columns',
    win: { spec: { ctrl: true, key: '-' }, labels: ['Ctrl', '-'], safe: false },
    mac: { spec: { meta: true, key: '-' }, labels: ['Cmd', '-'], safe: false },
  },
  {
    id: 'e-copy', category: 'Editing & Cells',
    task: 'Copy the selection',
    win: { spec: { ctrl: true, key: 'c' }, labels: ['Ctrl', 'C'], safe: true },
    mac: { spec: { meta: true, key: 'c' }, labels: ['Cmd', 'C'], safe: true },
  },
  {
    id: 'e-cut', category: 'Editing & Cells',
    task: 'Cut the selection',
    win: { spec: { ctrl: true, key: 'x' }, labels: ['Ctrl', 'X'], safe: true },
    mac: { spec: { meta: true, key: 'x' }, labels: ['Cmd', 'X'], safe: true },
  },
  {
    id: 'e-paste', category: 'Editing & Cells',
    task: 'Paste the clipboard contents',
    win: { spec: { ctrl: true, key: 'v' }, labels: ['Ctrl', 'V'], safe: true },
    mac: { spec: { meta: true, key: 'v' }, labels: ['Cmd', 'V'], safe: true },
  },
  {
    id: 'e-undo', category: 'Editing & Cells',
    task: 'Undo the last action',
    win: { spec: { ctrl: true, key: 'z' }, labels: ['Ctrl', 'Z'], safe: true },
    mac: { spec: { meta: true, key: 'z' }, labels: ['Cmd', 'Z'], safe: true },
  },
  {
    id: 'e-redo', category: 'Editing & Cells',
    task: 'Redo the last undone action',
    win: { spec: { ctrl: true, key: 'y' }, labels: ['Ctrl', 'Y'], safe: true },
    mac: { spec: { shift: true, meta: true, key: 'z' }, labels: ['Shift', 'Cmd', 'Z'], safe: true },
  },

  // ---------- Rows & Columns ----------
  {
    id: 'rc-hiderow', category: 'Rows & Columns',
    task: 'Hide the selected row(s)',
    win: { spec: { ctrl: true, key: '9' }, labels: ['Ctrl', '9'], safe: false },
    mac: { spec: { ctrl: true, key: '9' }, labels: ['Ctrl', '9'], safe: true },
  },
  {
    id: 'rc-hidecol', category: 'Rows & Columns',
    task: 'Hide the selected column(s)',
    win: { spec: { ctrl: true, key: '0' }, labels: ['Ctrl', '0'], safe: false },
    mac: { spec: { ctrl: true, key: '0' }, labels: ['Ctrl', '0'], safe: true },
  },
  {
    id: 'rc-unhiderow', category: 'Rows & Columns',
    task: 'Unhide rows within the selection',
    win: { spec: { ctrl: true, shift: true, key: '(' }, labels: ['Ctrl', 'Shift', '9'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: '(' }, labels: ['Ctrl', 'Shift', '9'], safe: true },
  },
  {
    id: 'rc-unhidecol', category: 'Rows & Columns',
    task: 'Unhide columns within the selection',
    win: { spec: { ctrl: true, shift: true, key: ')' }, labels: ['Ctrl', 'Shift', '0'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: ')' }, labels: ['Ctrl', 'Shift', '0'], safe: true },
  },

  // ---------- Find & Replace ----------
  {
    id: 'fr-find', category: 'Find & Replace',
    task: 'Open Find',
    win: { spec: { ctrl: true, key: 'f' }, labels: ['Ctrl', 'F'], safe: false },
    mac: { spec: { ctrl: true, key: 'f' }, labels: ['Ctrl', 'F'], safe: false },
  },
  {
    id: 'fr-replace', category: 'Find & Replace',
    task: 'Open Find & Replace',
    win: { spec: { ctrl: true, key: 'h' }, labels: ['Ctrl', 'H'], safe: false },
    mac: { spec: { shift: true, meta: true, key: 'h' }, labels: ['Shift', 'Cmd', 'H'], safe: false },
  },

  // ---------- Workbook & Files ----------
  {
    id: 'wf-save', category: 'Workbook & Files',
    task: 'Save the workbook',
    win: { spec: { ctrl: true, key: 's' }, labels: ['Ctrl', 'S'], safe: true },
    mac: { spec: { meta: true, key: 's' }, labels: ['Cmd', 'S'], safe: true },
  },
  {
    id: 'wf-saveas', category: 'Workbook & Files',
    task: 'Save As (save a copy under a new name/location)',
    win: { spec: { key: 'F12' }, labels: ['F12'], safe: false },
    mac: { spec: { shift: true, meta: true, key: 's' }, labels: ['Shift', 'Cmd', 'S'], safe: true },
  },
  {
    id: 'wf-open', category: 'Workbook & Files',
    task: 'Open a workbook',
    win: { spec: { ctrl: true, key: 'o' }, labels: ['Ctrl', 'O'], safe: false },
    mac: { spec: { meta: true, key: 'o' }, labels: ['Cmd', 'O'], safe: false },
  },
  {
    id: 'wf-print', category: 'Workbook & Files',
    task: 'Print (open the print pane)',
    win: { spec: { ctrl: true, key: 'p' }, labels: ['Ctrl', 'P'], safe: false },
    mac: { spec: { meta: true, key: 'p' }, labels: ['Cmd', 'P'], safe: false },
  },
  {
    id: 'wf-hyperlink', category: 'Workbook & Files',
    task: 'Insert a hyperlink',
    win: { spec: { ctrl: true, key: 'k' }, labels: ['Ctrl', 'K'], safe: false },
    mac: { spec: { meta: true, key: 'k' }, labels: ['Cmd', 'K'], safe: false },
  },
  {
    id: 'wf-expandbar', category: 'Workbook & Files',
    task: 'Expand or collapse the formula bar',
    win: { spec: { ctrl: true, shift: true, key: 'u' }, labels: ['Ctrl', 'Shift', 'U'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: 'u' }, labels: ['Ctrl', 'Shift', 'U'], safe: true },
  },

  // ---------- Misc ----------
  {
    id: 'm-filter', category: 'Misc',
    task: 'Toggle AutoFilter on the selected range',
    win: { spec: { ctrl: true, shift: true, key: 'l' }, labels: ['Ctrl', 'Shift', 'L'], safe: true },
    mac: { spec: { ctrl: true, shift: true, key: 'l' }, labels: ['Ctrl', 'Shift', 'L'], safe: true },
  },
  {
    id: 'm-comment', category: 'Misc',
    task: 'Insert or edit a comment on the active cell',
    win: { spec: { shift: true, key: 'F2' }, labels: ['Shift', 'F2'], safe: true },
    mac: { spec: { shift: true, key: 'F2' }, labels: ['Shift', 'F2'], safe: true },
  },
];
