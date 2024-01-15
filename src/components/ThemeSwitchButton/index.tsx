import { useThemeContext } from "../../context/ThemeContext";

import { Button } from "@components/Button";

import SwitchSVG from "../../assets/switch.svg?react";

const ThemeSwitchButton = () => {
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <Button
      onClick={toggleTheme}
      style={{
        padding: 0,
        color: "inherit",
      }}
    >
      <SwitchSVG
        width={28}
        height={28}
        transform={isDark ? "matrix(1, 0, 0, -1, 0, 0)" : ""}
      />
    </Button>
  );
};

export default ThemeSwitchButton;
