import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

// Mapeo de caracteres para formateo
const BOLD_CHARS = {
  'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜',
  'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥',
  'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
  'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
  'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿',
  's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇'
}

const ITALIC_CHARS = {
  'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐',
  'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙',
  'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡',
  'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪',
  'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳',
  's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
}

const MenuBar = ({ editor }) => {
  if (!editor) {
    console.log('MenuBar: Editor no inicializado')
    return null
  }

  const handleCommand = (command, name) => {
    console.log(`MenuBar: Ejecutando comando ${name}`)
    if (name === 'bulletList') {
      // Si estamos en una lista, salimos de ella
      if (editor.isActive('bulletList')) {
        console.log('Desactivando lista en la posición actual')
        editor.chain().focus().toggleBulletList().run()
      } else {
        // Si no estamos en una lista, creamos una nueva en la posición actual
        console.log('Creando nueva lista en la posición actual')
        editor
          .chain()
          .focus()
          .insertContent({ type: 'bulletList', content: [{ type: 'listItem', content: [{ type: 'paragraph' }] }] })
          .run()
      }
    } else {
      command()
    }
    console.log(`MenuBar: Estado de ${name}:`, editor.isActive(name))
  }

  return (
    <div className="border-b border-gray-200 p-4 flex gap-2">
      <button
        onClick={() => handleCommand(
          () => editor.chain().focus().toggleBold().run(),
          'bold'
        )}
        className={`px-3 py-1 border rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Negrita"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => handleCommand(
          () => editor.chain().focus().toggleItalic().run(),
          'italic'
        )}
        className={`px-3 py-1 border rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Cursiva"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => handleCommand(
          () => editor.chain().focus().toggleBulletList().run(),
          'bulletList'
        )}
        className={`px-3 py-1 border rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Lista"
      >
        • Lista
      </button>
    </div>
  )
}

const Editor = () => {
  const [copyStatus, setCopyStatus] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4',
          },
          keepMarks: true,
          keepAttributes: true,
        },
      }),
    ],
    content: '<p>¡Escribe tu post de LinkedIn aquí!</p>',
    editorProps: {
      attributes: {
        class: 'p-4 min-h-[200px] focus:outline-none text-gray-800',
      },
    },
  })

  const formatText = (text, charMap) => {
    return text.split('').map(char => charMap[char] || char).join('')
  }

  const formatForLinkedIn = (node) => {
    if (!node || !node.content) return ''
    
    return node.content.map(item => {
      let text = ''
      
      // Procesar el contenido del nodo
      if (item.content) {
        text = formatForLinkedIn(item)
      } else if (item.text) {
        text = item.text
      }
      
      // Aplicar marcas usando caracteres Unicode específicos
      if (item.marks) {
        item.marks.forEach(mark => {
          if (mark.type === 'bold') {
            text = formatText(text, BOLD_CHARS)
          }
          if (mark.type === 'italic') {
            text = formatText(text, ITALIC_CHARS)
          }
        })
      }
      
      // Manejar tipos específicos de nodos
      if (item.type === 'bulletList') {
        return text.split('\n').filter(Boolean).map(line => `• ${line.trim()}`).join('\n')
      }
      if (item.type === 'listItem') {
        return text.trim()
      }
      if (item.type === 'paragraph') {
        return text + (item.type === 'listItem' ? '' : '\n\n')
      }
      
      return text
    }).join('').replace(/\n\n+/g, '\n\n').trim()
  }

  const handleCopy = async () => {
    console.log('Iniciando proceso de copia')
    
    if (!editor) {
      console.error('Editor no disponible para copiar')
      return
    }

    try {
      const json = editor.getJSON()
      console.log('Contenido JSON:', json)
      
      let formattedText = formatForLinkedIn(json)
      console.log('Texto formateado para LinkedIn:', formattedText)

      await navigator.clipboard.writeText(formattedText)
      console.log('Texto copiado al portapapeles exitosamente')
      
      setCopyStatus('¡Copiado!')
      setTimeout(() => {
        setCopyStatus('')
        console.log('Estado de copia reiniciado')
      }, 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
      setCopyStatus('Error al copiar')
      setTimeout(() => {
        setCopyStatus('')
        console.log('Estado de error reiniciado')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border rounded-lg shadow">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="prose max-w-none" />
          <div className="border-t p-4 flex items-center justify-between">
            <button 
              onClick={handleCopy}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Copiar al portapapeles
            </button>
            {copyStatus && (
              <span className="text-green-500">{copyStatus}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor 


