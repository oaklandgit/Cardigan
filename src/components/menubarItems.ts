export const menubarItems = [
  {
    id: "apple",
    label: "",
    items: [{ label: "uno" }, { label: "dos" }, { label: "tres" }],
  },
  { id: "file", label: "File", items: [{ label: "🤡" }, { label: "👽" }, { label: "😻" }] },
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
        action: "actionClear"
      },
      {
        label: "New Card",
        shortcut: "⌘N",
        section: true,
        action: "newCard",
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
      { label: "Background", shortcut: "⌘B", action: "backgroundMode" },
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
      { label: "Previous", shortcut: "⌘2", action: "prevCard" },
      { label: "Next", shortcut: "⌘3", action: "nextCard" },
      { label: "Last", shortcut: "⌘4" },
      { label: "Find…", shortcut: "⌘F", section: true },
      { label: "Message", shortcut: "⌘M" },
      { label: "Scroll", shortcut: "⌘E" },
      { label: "Next Window", shortcut: "⌘L", disabled: true },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    type: "palette",
    items: [
      { label: "Browse", icon: "browse.svg", action: "browseMode" },
      { label: "Button", icon: "browse.svg", action: "buttonMode"  },
      { label: "Field", icon: "field.svg", action: "fieldMode" },
      { label: "Brush", icon: "brush.svg", section: "true" },
      { label: "Pencil", icon: "pencil.svg" },
      { label: "Eraser", icon: "eraser.svg" },
      { label: "Line", icon: "line.svg" },
      { label: "Lasso", icon: "lasso.svg" },
      { label: "Marquee", icon: "marquee.svg" },
    ]
  },
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
        action: "actionBringCloser"
      },
      {
        label: "Send Farther",
        shortcut: "⌘-",
        action: "actionSendFarther"
      },
      {
        label: "New Button",
        section: true,
        action: "newButton"
      },
      {
        label: "New Field",
        action: "newField"
      },
      { label: "New Background" },
    ],
  },
  {
    id: "styles", label: "Styles",
  }
];