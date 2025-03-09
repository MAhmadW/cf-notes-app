import { PenBox } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const Empty = () => {
    return (
        <div className='w-full h-screen flex flex-col items-start justify-start'>
            <div className='flex flex-row w-full h-[10%] items-end justify-end p-3'><ThemeToggle/></div>
            <div className='w-full h-[90%] flex flex-row items-center justify-center space-x-5'>
                    <p> Open a note or create a new one through the sidebar!</p>
                    <PenBox className='w-10 h-10'/>
            </div>
        </div>
    )
}

export default Empty;