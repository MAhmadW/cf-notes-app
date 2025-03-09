import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { useState } from "react"

import Note from "./components/note"
import Empty from "./components/empty"

const App = ({ children }: { children: React.ReactNode }) => {
  const [currentNote, setCurrentNote] = useState(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="w-100vw h-screen">
    <SidebarProvider>
      <AppSidebar setNote={setCurrentNote} />
        <SidebarTrigger />
        {
        currentNote === null?
          <Empty/>: 
          <Note note={currentNote} setNote={setCurrentNote}/>
        }
        {children}
    </SidebarProvider>
    </div>
    </ThemeProvider>
  )
}

export default App
