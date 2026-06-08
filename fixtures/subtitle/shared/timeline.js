import { formatCueText, formatTime } from './utils.js'

export function createTimeline ({ list, getMedia, onSeek }) {
  let items = []

  function render (nextItems = []) {
    items = nextItems
    const fragment = document.createDocumentFragment()

    items.forEach((cue, index) => {
      const item = document.createElement('button')
      const time = document.createElement('span')
      const text = document.createElement('span')

      item.type = 'button'
      item.className = 'timeline-item'
      item.dataset.timelineIndex = String(index)
      time.className = 'timeline-time'
      time.textContent = `${formatTime(cue.start)} - ${formatTime(cue.end)}`
      text.className = 'timeline-text'
      text.textContent = formatCueText(cue.text)

      item.append(time, text)
      item.addEventListener('click', () => onSeek(index))
      fragment.appendChild(item)
    })

    if (items.length === 0) {
      const empty = document.createElement('p')
      empty.className = 'timeline-empty'
      empty.textContent = '当前轨道暂无已解析字幕'
      fragment.appendChild(empty)
    }

    list.replaceChildren(fragment)
    updateActive()
  }

  function updateActive () {
    const currentTime = getMedia()?.currentTime || 0

    list.querySelectorAll('.timeline-item').forEach(item => {
      const cue = items[Number(item.dataset.timelineIndex)]
      const isActive = cue && currentTime >= cue.start && currentTime < cue.end
      item.classList.toggle('is-active', Boolean(isActive))
      item.setAttribute('aria-current', isActive ? 'true' : 'false')
    })
  }

  function reset () {
    items = []
    list.replaceChildren()
  }

  function getItems () {
    return items
  }

  return {
    getItems,
    render,
    reset,
    updateActive
  }
}
