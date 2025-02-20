import React from 'react'

const MockEmojiPicker = ({ onEmojiClick }) => {
  const handleEmojiClick = () => {
    onEmojiClick({ emoji: '😊', unified: '1f60a', names: ['smile'] })
  }

  return (
    <div className="EmojiPickerReact" data-testid="emoji-picker">
      <input
        type="search"
        placeholder="Search emojis..."
        className="EmojiPickerReact-search"
        onChange={(e) => {
          if (e.target.value === 'smile') {
            // Simular que se encontró el emoji
            const emojiElement = document.createElement('button')
            emojiElement.setAttribute('data-unified', '1f60a')
            emojiElement.textContent = '😊'
            e.target.parentElement.appendChild(emojiElement)
          }
        }}
      />
      <div className="EmojiPickerReact-category-nav">
        <button onClick={handleEmojiClick} data-unified="1f60a">😊</button>
      </div>
    </div>
  )
}

export default MockEmojiPicker 