import { NotebookPen, Trash } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'

import {
    useQuery,
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query'

import { deleteNote, getNotes, newNote } from "@/services/notes"
import { Skeleton } from "./skeleton"

const parseDate = (dateString: string) => {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
}

export const AppSidebar = ({setNote}) => {
    const queryClient = useQueryClient()

    const notesQuery = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const resp = await getNotes()
            return resp.data
        },
        refetchOnWindowFocus: false,
      })

    const createNewNoteMutation = useMutation({
    mutationFn: newNote,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    })

    const onCreate = (event) => {
        event.preventDefault()
        createNewNoteMutation.mutate()
    }

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onMutate: () => {
          setNote(null)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
        })
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {notesQuery.isPending || notesQuery.isFetching || createNewNoteMutation.isPending || deleteNoteMutation.isPending? <div className="space-y-2"><Skeleton className="w-full h-6"/> <Skeleton className="w-full h-6"/> <Skeleton className="w-full h-6"/> </div>: notesQuery.data.notes.map((note) => (
                <SidebarMenuItem key={note.id} onClick={()=>{setNote(note)}}>
                  <SidebarMenuButton asChild className='hover:cursor-pointer' >
                    <div className='flex flex-row items-center justify-between'><div className='flex flex-row items-start justify-start'>{note.title.slice(0,10)} {note.title.slice(0,10)!==note.title? <p className='text-gray-600'>...</p>: ''}</div> 
                    <div className="flex flex-row text-gray-600 space-x-2 items-center justify-between">
                      <span>{parseDate(note.created_at)}</span> 
                      <Button variant={'destructive'}  className="h-[50%]" onClick={()=>{deleteNoteMutation.mutate(note.id)}}><Trash/></Button>
                    </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={onCreate} disabled={createNewNoteMutation.isPending}>New note <NotebookPen /></Button>
      </SidebarFooter>
    </Sidebar>
  )
}
