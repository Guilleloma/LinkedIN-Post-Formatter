import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import React from 'react'

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiContainerRef = React.useRef(null)

  useEffect(() => {
    console.log('🟢 MenuBar: Component mounted')
    console.log('📍 MenuBar initial DOM state:', document.querySelector('.border-b.border-gray-200'))
    
    const handleClickOutside = (event) => {
      if (emojiContainerRef.current && !emojiContainerRef.current.contains(event.target)) {
        console.log('👆 MenuBar: Click outside detected')
        console.log('📍 MenuBar click target:', event.target)
        console.log('📍 MenuBar container ref:', emojiContainerRef.current)
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      console.log('🔴 MenuBar: Component unmounting, removing event listener')
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    console.log('🔄 MenuBar: showEmojiPicker state changed:', showEmojiPicker)
    console.log('📍 MenuBar emoji container:', document.querySelector('[data-testid="emoji-container"]'))
    if (showEmojiPicker) {
      console.log('📍 MenuBar emoji picker:', document.querySelector('[data-testid="emoji-picker"]'))
    }
  }, [showEmojiPicker])

  if (!editor) {
    console.log('⚠️ MenuBar: Editor not initialized')
    return null
  }

  const handleCommand = (command, name) => {
    console.log(`🎯 MenuBar: Executing command ${name}`)
    if (name === 'bulletList') {
      editor.chain().focus().toggleBulletList().run()
      console.log(`📝 MenuBar: bulletList state:`, editor.isActive('bulletList'))
    } else {
      command()
      console.log(`📝 MenuBar: ${name} state:`, editor.isActive(name))
    }
  }

  const onEmojiClick = (emojiData) => {
    console.log('😊 MenuBar: Emoji clicked:', emojiData)
    console.log('📍 MenuBar editor state before insert:', editor.getHTML())
    editor.chain().focus().insertContent(emojiData.emoji).run()
    console.log('📍 MenuBar editor state after insert:', editor.getHTML())
    setShowEmojiPicker(false)
  }

  return (
    <div className="border-b border-gray-200 p-4 flex gap-2 relative">
      <button
        onClick={() => handleCommand(
          () => editor.chain().focus().toggleBold().run(),
          'bold'
        )}
        className={`px-3 py-1 border rounded text-white ${
          editor.isActive('bold') ? 'bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'
        }`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => handleCommand(
          () => editor.chain().focus().toggleItalic().run(),
          'italic'
        )}
        className={`px-3 py-1 border rounded text-white ${
          editor.isActive('italic') ? 'bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'
        }`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => handleCommand(
          () => editor.chain().focus().toggleBulletList().run(),
          'bulletList'
        )}
        className={`px-3 py-1 border rounded text-white ${
          editor.isActive('bulletList') ? 'bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'
        }`}
        title="List"
      >
        • List
      </button>
      <button
        onClick={() => {
          setShowEmojiPicker(!showEmojiPicker)
        }}
        className={`px-3 py-1 border rounded text-white bg-gray-800 hover:bg-gray-700`}
        title="Emojis"
        data-testid="emoji-toggle"
      >
        😊
      </button>
      {showEmojiPicker && (
        <div 
          ref={emojiContainerRef} 
          className="absolute top-full left-0 z-50 mt-2" 
          data-testid="emoji-container"
        >
          <div className="bg-white border rounded shadow-lg" data-testid="emoji-picker">
            <EmojiPicker
              searchDisabled={false}
              width={300}
              height={450}
              previewConfig={{ showPreview: false }}
              lazyLoadEmojis={true}
              skinTonesDisabled={false}
              searchPlaceholder="Search emojis..."
              onEmojiClick={(emojiData) => {
                editor.chain().focus().insertContent(emojiData.emoji).run()
                setShowEmojiPicker(false)
              }}
            />
          </div>
        </div>
      )}
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
        paragraph: {
          HTMLAttributes: {
            class: 'mb-4',
          },
        },
      }),
    ],
    content: '<p>Write here your text and apply the desired format</p>',
    editorProps: {
      attributes: {
        class: 'p-4 min-h-[200px] focus:outline-none text-gray-800',
      },
    },
    onUpdate: ({ editor }) => {
      // No necesitamos guardar el contenido
    },
    onCreate: ({ editor }) => {
      // No necesitamos cargar contenido guardado
    }
  })

  const formatText = (text, charMap) => {
    return text.split('').map(char => charMap[char] || char).join('')
  }

  const formatForLinkedIn = (content) => {
    let formattedText = '';
    let isInList = false;

    content.content.forEach((node, index) => {
      if (node.type === 'paragraph') {
        const text = node.content
          .map((item) => {
            if (item.marks && item.marks.length > 0) {
              const mark = item.marks[0];
              return mark.type === 'bold'
                ? item.text.split('').map(char => BOLD_CHARS[char] || char).join('')
                : item.text.split('').map(char => ITALIC_CHARS[char] || char).join('');
            }
            return item.text;
          })
          .join('');

        // Add double line break before paragraph if it's not the first node
        formattedText += index > 0 ? '\n\n' + text : text;
      } else if (node.type === 'bulletList') {
        isInList = true;
        // Add double line break before list if it's not the first node
        if (index > 0) formattedText += '\n\n';
        
        node.content.forEach((listItem, i) => {
          const text = listItem.content[0].content
            .map((item) => {
              if (item.marks && item.marks.length > 0) {
                const mark = item.marks[0];
                return mark.type === 'bold'
                  ? item.text.split('').map(char => BOLD_CHARS[char] || char).join('')
                  : item.text.split('').map(char => ITALIC_CHARS[char] || char).join('');
              }
              return item.text;
            })
            .join('');
          formattedText += `• ${text}${i < node.content.length - 1 ? '\n' : ''}`;
        });
      }
    });

    return formattedText.trim();
  }

  const handleCopy = async () => {
    console.log('Starting copy process')
    
    if (!editor) {
      console.error('Editor not available for copying')
      return
    }

    try {
      const json = editor.getJSON()
      console.log('JSON content:', json)
      
      let formattedText = formatForLinkedIn(json)
      console.log('Formatted text for LinkedIn:', formattedText)

      await navigator.clipboard.writeText(formattedText)
      console.log('Text successfully copied to clipboard')
      
      setCopyStatus('Copied!')
      setTimeout(() => {
        setCopyStatus('')
        console.log('Copy status reset')
      }, 2000)
    } catch (err) {
      console.error('Error copying:', err)
      setCopyStatus('Error copying')
      setTimeout(() => {
        setCopyStatus('')
        console.log('Error status reset')
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">No more boring posts! ✨</h1>
          <p className="text-xl text-gray-600 mb-8">
            Transform your LinkedIn posts with unique formats that will stand out from the crowd
          </p>
          <div className="bg-white border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Transformation example:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Original text:</h3>
                <p>Great news! 🎉</p>
                <p>3 reasons why I'm excited:</p>
                <p>• New project started</p>
                <p>• Amazing team</p>
                <p>• Innovative technology</p>
              </div>
              <div className="p-4 bg-blue-50 rounded">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Formatted text:</h3>
                <p>𝗚𝗿𝗲𝗮𝘁 𝗻𝗲𝘄𝘀! 🎉</p>
                <p>3 𝘳𝘦𝘢𝘴𝘰𝘯𝘴 why I'm excited:</p>
                <p>• 𝗡𝗲𝘄 𝗽𝗿𝗼𝗷𝗲𝗰𝘁 started</p>
                <p>• Amazing 𝘵𝘦𝘢𝘮</p>
                <p>• Innovative 𝘵𝘦𝘤𝘩𝘯𝘰𝘭𝘰𝘨𝘺</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-lg shadow">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="prose max-w-none" />
          <div className="border-t p-4 flex items-center justify-between">
            <button 
              onClick={handleCopy}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Copy to clipboard
            </button>
            {copyStatus && (
              <span className={`text-${copyStatus === 'Error copying' ? 'red' : 'green'}-500`}>
                {copyStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor 


