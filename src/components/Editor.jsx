import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'

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
        class: 'p-4 min-h-[200px] focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      console.log('Editor: Contenido actualizado')
      console.log('HTML actual:', editor.getHTML())
      console.log('Texto plano:', editor.getText())
      console.log('Posición del cursor:', editor.state.selection.$anchor.pos)
    },
    onCreate: ({ editor }) => {
      console.log('Editor: Inicializado')
      console.log('Configuración inicial:', editor.getJSON())
    },
  })

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
      
      // Aplicar marcas (negrita, cursiva)
      if (item.marks) {
        item.marks.forEach(mark => {
          if (mark.type === 'bold') {
            text = `**${text}**`
          }
          if (mark.type === 'italic') {
            text = `_${text}_`
          }
        })
      }
      
      // Manejar tipos específicos de nodos
      if (item.type === 'bulletList') {
        return '\n' + text.split('\n').map(line => `• ${line}`).join('\n')
      }
      if (item.type === 'listItem') {
        return text + '\n'
      }
      if (item.type === 'paragraph') {
        return text + '\n'
      }
      
      return text
    }).join('')
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
      formattedText = formattedText.trim()
      
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
          <EditorContent editor={editor} />
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

