import { articulos as arts } from "../database_articulos.js";
export const themes = [
  {
    title: "dark",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#181b1f",
      primary: "#9ea2a8",
      secundary: "#878b91",
      extra1: "#1d2024",
    }
  },
  {
    title: "dark blue",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "#2793e6",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "monokai",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#161d1f",
      primary: "#ad2643",
      secundary: "#7b868a",
      extra1: "#22262b",
      neumorphismLinearBackground1: "#181f21",
      neumorphismLinearBackground2: "#141a1c",
      neumorphismBoxShadow1: "#101516",
      neumorphismBoxShadow2: "#1c2528"
    }
  },
  {
    title: "light blue",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#202630",
      primary: "#2793e6",
      secundary: "#7f858f",
      extra1: "#42525D",
    }
  },
  {
    title: "ladrillo",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#5d1f29",
      primary: "#af5237",
      secundary: "#eb8140",
      extra1: "#22262b",
    }
  },
  {
    title: "cafe verde",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#472420",
      primary: "#124b50",
      secundary: "#6b817e",
      extra1: "#22262b",
    }
  },
  {
    title: "turquesa",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#87b7ac",
      primary: "#717b7b",
      secundary: "#f8f8f8",
      extra1: "#22262b",
    }
  },
  {
    title: "smooth pink",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#2a2c3a",
      primary: "#dba1bc",
      secundary: "#635469",
      extra1: "#22262b",
      extra2: "red",
    }
  },
  {
    title: "charcoal",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#364652",
      primary: "#ED9390",
      secundary: "#A5AE9E",
      extra1: "#293132",
    }
  },
  {
    title: "dark purple",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#1A1D1A",
      primary: "#9F86C0",
      secundary: "#E0B1CB",
      extra1: "#E0B1CB",
    }
  },
  {
    title: "dracula",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#1c181c",
      primary: "#F043A5",
      secundary: "#7CFFC4",
      extra1: "#512d5c",
    }
  },
  {
    title: "dark yellow",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#002129",
      primary: "#F2CCBB",
      secundary: "#C78686",
      extra1: "#5D737E",
    }
  },
  {
    title: "celeste",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#293132",
      primary: "#77B3C1",
      secundary: "#D68C45",
      extra1: "#77B3C1",
    }
  },
  {
    title: "dark 14",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "green",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 15",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "yellow",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 16",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "black",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 17",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "gray",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 18",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "pink",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 19",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "brown",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 20",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "blue",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 21",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "brown",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 21",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "pink",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "dark 22",
    icon: "bi bi-browser-firefox",
    colors: {
      background: "#191c21",
      primary: "yellow",
      secundary: "#6e7278",
      extra1: "#22262b",
    }
  },
  {
    title: "abscs",
    icon: "bi bi-browser-firefox",
    list: [
      {
        title: "hola",
        icon: "bi bi-check",
      },
      {
        title: "que",
        icon: "bi bi-check",
      },
    ],
  },
];

export const reducer = (state, action) => {
  if (action.type == "get") {
    const theme = state.filter();
    return [...state, action.payload];
  } else if (action.type == "filter-theme") {
    console.log("filter-theme in reducer", action);
    const criteria = action.payload.criteria;
    if (!criteria) {
      return themes;
    }
    const filtered_array = themes.filter((theme) => criteria == theme.title);
    console.log("criteria", filtered_array);
    if (filtered_array) {
      return filtered_array[0];
    } else {
      return null;
    }
  }
  return state;
};
