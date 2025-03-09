import { PenBox } from "lucide-react"
import ThemeToggle from "./theme-toggle"

const Empty = () => {
    return (
        <div className='w-full h-full flex flex-col items-start justify-start'>
            <div className='flex flex-row w-full h-[10%] items-end justify-end p-5'><ThemeToggle/></div>
            <div className='w-full h-[90%] flex flex-col md:flex-row items-center justify-center overflow-x-visible'>
                    <div className='p-2'>
                        <p className='text-center break-words'> Open a note or create a new one through the sidebar!</p>
                    </div>
                    <div className='p-2'>
                        <PenBox className='w-10 h-10'/>
                    </div>
            </div>
        </div>
    )
}

export default Empty;