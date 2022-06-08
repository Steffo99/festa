# Editables

This folder contains controlled input components with two modes: a "editing" mode, which displays a box where the user can input data, and a "preview" mode, which renders the value of the data input by the user.

For example, [`EditableMarkdown`](EditableMarkdown.tsx) displays a `textarea` in editing mode, and renders the Markdown into a `div` in preview mode.

The mode of the elements is determined by the current value of the [`EditingContext`](EditingContext.ts) they are in.
