import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ThemeToggle from "./theme-toggle";
import EditToggle from "./edit-toggle";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { editNote } from "@/services/notes";

const debounceTime = 1000;

const Note = ({note, setNote}) => {
    const queryClient = useQueryClient()
    const [mode, setMode] = useState('read')

    const [dirty, setDirty] = useState(false)

    const editNoteMutation = useMutation({
        mutationFn: editNote,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        },
        })

    const onTitleChange = (e) => {
        setNote((prev) =>({...prev, title: e.target.value}))
        setDirty(true)
    };

    const onContentChange = (e) => {
        setNote((prev) =>({...prev, content: e.target.value}))
        setDirty(true)
    };

    useEffect(() => {
        const handler = setTimeout(() => {
          if (note.id && dirty) {
            editNoteMutation.mutate(note);
            setDirty(false)
          }
        }, debounceTime);
      
        return () => clearTimeout(handler); 
      }, [note, editNoteMutation.mutate]); 

    return (
        <div className="flex flex-col w-full h-screen">
            <div className='flex flex-row w-full h-[10%] items-end justify-end space-x-3 p-3'>
                <EditToggle mode={mode} setMode={setMode}/>
                <ThemeToggle/>
            </div>

            {mode === 'read'?
                <>
                    <div className='w-full h-1/6 flex flex-row items-center justify-start p-5 text-3xl md:text-2xl'>
                        {note.title}
                    </div>
                    <div className='w-full h-5/6 flex flex-row items-start justify-start p-5 text-xl md:text-lg'>
                        {note.content === '' ? <p className='text-lg md:text-md text-gray-600'>This note has no content. Start editing by switching to edit mode.</p>: note.content}
                    </div>
                </>
                :
                <>
                <div className='w-full h-1/6 flex flex-row items-center justify-start p-5'>
                    <Input value={note.title} onChange={onTitleChange} className='h-full text-3xl md:text-2xl'/>
                </div>
                <div className='w-full h-5/6 flex flex-row items-start justify-start p-5 text-xl md:text-lg'>
                    <Textarea value={note.content} placeholder='Start writing!' onChange={onContentChange} className='w-text-xl md:text-lg'/>
                </div>
                </>
            }
        </div>
    )
}

export default Note;