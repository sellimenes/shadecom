'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#fff4e2',
  '#ffe9cc',
  '#ffd09c',
  '#fdb766',
  '#fca13a',
  '#fb931d',
  '#fc8c0c',
  '#e17900',
  '#c86a00',
  '#ae5a00',
];

const muted: MantineColorsTuple = [
  '#f3f3fe',
  '#e4e6ed',
  '#c8cad3',
  '#a9adb9',
  '#9093a4',
  '#808496',
  '#767c91',
  '#656a7e',
  '#585e72',
  '#4a5167',
];

export const theme = createTheme({
  colors: {
    primary,
    muted,
  },
});
