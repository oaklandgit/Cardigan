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
    // component: Menu,
    items: [
      { label: "Undo", shortcut: "⌘Z" },
      { label: "Cut", shortcut: "⌘X", section: true },
      { label: "Copy", shortcut: "⌘C" },
      { label: "Past", shortcut: "⌘V" },
      {
        label: "Clear",
        callback: () => {
          deleteSelectedElement();
        },
      },
      {
        label: "New Card",
        shortcut: "⌘N",
        section: true,
        callback: () => {
          console.log(createCard(1, false)); // for now, bg is always 1
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
    // component: Menu,
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
    // component: Menu,
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
          reorderTo(-1);
        },
      },
      {
        label: "Send Farther",
        shortcut: "⌘-",
        callback: () => {
          reorderTo(1);
        },
      },
      {
        label: "New Button",
        section: true,
        callback: () => {
          // $appMode = "button";
          // createButton($currentCard);
        },
      },
      {
        label: "New Field",
        callback: () => {
          // $appMode = "field";
          // createField($currentCard);
        },
      },
      { label: "New Background" },
    ],
  },
  {
    id: "styles", label: "Styles",
    // component: Menu
  }
];