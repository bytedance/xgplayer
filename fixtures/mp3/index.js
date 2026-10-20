import Player from '../../packages/xgplayer/src'
import MP3Plugin from '../../packages/xgplayer-mp3/src'
import { DEFAULT_MP3_FIXTURE_SAMPLE, MP3_FIXTURE_SAMPLES } from './samples'
import { createStatusView, STATUS_EVENTS } from './status'

const $ = (selector) => document.querySelector(selector)
const urlInput = $('#url')
const fileInput = $('#file')
const sampleList = $('#sample-list')

let player
let objectUrl
let currentSample = DEFAULT_MP3_FIXTURE_SAMPLE

const status = createStatusView({
  target: $('#status'),
  getPlayer: () => player,
  getSample: () => currentSample,
  isSupported: () => MP3Plugin.isSupported()
})

function createPlayer(url, sample = null) {
  currentSample = sample || { name: 'Custom URL' }

  if (!MP3Plugin.isSupported()) {
    player?.destroy()
    player = null
    status.update()
    return
  }

  player?.destroy()
  player = new Player({
    id: 'player',
    url,
    mediaType: 'audio',
    autoplay: false,
    plugins: [MP3Plugin],
    mp3: {
      segmentDuration: 4,
      maxBufferLength: 16,
      minBufferLength: 4,
      closeDowngrade: true,
      openLog: true
    }
  })

  window.player = player
  urlInput.value = url
  bindStatusEvents(player)
  status.update()
}

function bindStatusEvents(instance) {
  STATUS_EVENTS.forEach((eventName) => {
    instance.on(eventName, () => {
      if (player === instance) status.update()
    })
  })
}

function renderTags(tags) {
  return tags.map((tag) => `<span>${tag}</span>`).join('')
}

function renderSamples() {
  sampleList.innerHTML = MP3_FIXTURE_SAMPLES.map(
    (group, groupIndex) => `
      <section class="sample-group">
        <h2>${group.group}</h2>
        ${group.items
          .map(
            (sample, sampleIndex) => `
              <article class="sample-card">
                <div class="sample-card__header">
                  <h3>${sample.name}</h3>
                  <button type="button" data-sample="${groupIndex}:${sampleIndex}">
                    加载
                  </button>
                </div>
                <div class="tags">${renderTags(sample.tags)}</div>
              </article>
            `
          )
          .join('')}
      </section>
    `
  ).join('')
}

sampleList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-sample]')
  if (!button) return

  const [groupIndex, sampleIndex] = button.dataset.sample.split(':').map(Number)
  const sample = MP3_FIXTURE_SAMPLES[groupIndex]?.items[sampleIndex]
  if (sample) createPlayer(sample.url, sample)
})

$('#load-url').addEventListener('click', () => {
  const url = urlInput.value.trim()
  if (url) createPlayer(url)
})

fileInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (objectUrl) URL.revokeObjectURL(objectUrl)
  objectUrl = URL.createObjectURL(file)
  createPlayer(objectUrl, { name: file.name })
})

urlInput.value = currentSample?.url || ''
renderSamples()
createPlayer(currentSample.url, currentSample)
