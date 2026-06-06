'use client';

import {type Dispatch, createContext, SetStateAction } from "react";

export const HomeLayoutContext = createContext({
  leftSection: {
    title: "",
    subTitle: "",
    link: {
      url: "",
      txt: "",
    },
  },
  setLeftSection: (prev: {
    title: "";
    subTitle: "";
    link: {
      url: "";
      txt: "";
    };
  }) => {},
});