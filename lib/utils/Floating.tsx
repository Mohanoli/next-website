export function getTranslate(pos: string) {
  const map: Record<string, { x: string; y: string }> = {
    // top left
    "top-[11%]  left-[19%]": {
      x: "-150px",
      y: "-120px",
    },

    // middle left
    "top-[41%] left-[6%]": {
      x: "-185px",
      y: "-1px",
    },

    // bottom left
    "bottom-[12%] left-[16%]": {
      x: "-150px",
      y: "130px",
    },

    // top right
    "top-[11%]  right-[15%]": {
      x: "150px",
      y: "-120px",
    },

    // middle right
    "top-[41%] right-[6%]": {
      x: "185px",
      y: "-1px",
    },

    // bottom right
    "bottom-[12%] right-[16%]": {
      x: "150px",
      y: "130px",
    },
  };

  return map[pos] || { x: "0px", y: "0px" };
}