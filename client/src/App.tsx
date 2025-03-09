import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { useState } from "react"

import Note from "./components/note"
import Empty from "./components/empty"
import { emptyNote, INote } from "./types/notes"

const App = () => {
  const [currentNote, setCurrentNote] = useState<INote>(emptyNote);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="w-100vw h-screen flex">
    <SidebarProvider>
      <AppSidebar setNote={setCurrentNote} />
      <div className='w-full h-screen flex'>
        <SidebarTrigger className='absolute' />
        {
        currentNote.id === -1?
          <Empty/>: 
          <Note note={currentNote} setNote={setCurrentNote}/>
        }
      </div>
    </SidebarProvider>
    </div>
    </ThemeProvider>
  )
}

export default App
