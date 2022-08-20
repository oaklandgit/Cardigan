export const menubarItems = [
  {
    id: "apple",
    label: "",
    items: [{ label: "uno" }, { label: "dos" }, { label: "tres" }],
  },
  { id: "file", label: "File" },
  {
    id: "edit",
    label: "Edit",
    items: [
      { label: "Undo", shortcut: "⌘Z" },
      { label: "Cut", shortcut: "⌘X", section: true },
      { label: "Copy", shortcut: "⌘C" },
      { label: "Past", shortcut: "⌘V" },
      {
        label: "Clear",
        callback: () => {
          console.log('menu: clear');
        },
      },
      {
        label: "New Card",
        shortcut: "⌘N",
        section: true,
        callback: () => {
         console.log('menu: new card');
        },
      },
      { label: "Delete Card" },
      { label: "Cut Card" },
      { label: "Copy Card" },
      {
        label: "Text Style…",
        shortcut: "⌘T",
        section: true,
        disabled: true,
      },
      { label: "Background", shortcut: "⌘B" },
      { label: "Icon", shortcut: "⌘I" },
    ],
  },
  {
    id: "go",
    label: "Go",
    items: [
      { label: "Back", shortcut: "⌘~" },
      { label: "Home", shortcut: "⌘H" },
      { label: "Help", shortcut: "⌘?" },
      { label: "Recent", shortcut: "⌘R" },
      { label: "First", shortcut: "⌘1", section: true },
      { label: "Previous", shortcut: "⌘2" },
      { label: "Next", shortcut: "⌘3" },
      { label: "Last", shortcut: "⌘4" },
      { label: "Find…", shortcut: "⌘F", section: true },
      { label: "Message", shortcut: "⌘M" },
      { label: "Scroll", shortcut: "⌘E" },
      { label: "Next Window", shortcut: "⌘L", disabled: true },
    ],
  },
  { id: "tools", label: "Tools"},
  {
    id: "objects",
    label: "Objects",
    items: [
      { label: "Button Info…", disabled: true },
      { label: "Field Info…", disabled: true },
      { label: "Card Info…" },
      { label: "Bkgnd Info…" },
      { label: "Stack Info…" },
      {
        label: "Bring Closer",
        section: true,
        shortcut: "⌘+",
        callback: () => {
          console.log('menu: bring closer');
        },
      },
      {
        label: "Send Farther",
        shortcut: "⌘-",
        callback: () => {
          console.log('menu: send farther');
        },
      },
      {
        label: "New Button",
        section: true,
        callback: () => {
          console.log('menu: new button');
        },
      },
      {
        label: "New Field",
        callback: () => {
          console.log('menu: new field');
        },
      },
      { label: "New Background" },
    ],
  },
  {
    id: "styles", label: "Styles",
  }
];