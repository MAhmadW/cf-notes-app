import { Toggle } from "@/components/ui/toggle"

import { Book, Pen } from "lucide-react"

const EditToggle = ({mode, setMode}) => {

  const changeTheme = () => {
    if (mode === 'read') {setMode('edit') } else {setMode('read')}
  };

  return (
    <Toggle onPressedChange={changeTheme}>
      {mode === 'read' ? <Book/> : <Pen/>}
    </Toggle>
  )
}

export default EditToggle;