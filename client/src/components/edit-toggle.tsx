import { Toggle } from "@/components/ui/toggle"
import { EditMode } from "@/types/notes";

import { Book, Pen } from "lucide-react"
import { SetStateAction } from "react";

const EditToggle = ({mode, setMode} : {mode: EditMode, setMode: React.Dispatch<SetStateAction<EditMode>>})  => {

  const changeTheme = () => {
    if (mode === EditMode.read) {setMode(EditMode.edit) } else {setMode(EditMode.read)}
  };

  return (
    <Toggle onPressedChange={changeTheme}>
      {mode === EditMode.read ? <Book/> : <Pen/>}
    </Toggle>
  )
}

export default EditToggle;