import { Toggle } from "@/components/ui/toggle"
import { useTheme } from "@/components/theme-provider"

import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const changeTheme = () => {
    if (theme === 'dark') {setTheme('light') } else {setTheme('dark')}
  };

  return (
    <Toggle onPressedChange={changeTheme}>
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Toggle>
  )
}