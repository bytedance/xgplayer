export function createMseView({ el, t, num, fmtTime, currentEvents }) {
  const expandedEvents = new Set()
  let sourceDetailsOpen = false

  function rangeEnd(track) {
    const ranges = track.buffered || []
    return ranges.length ? ranges[ranges.length - 1].end : 0
  }

  function formatNumber(value, digits) {
    if (value === Infinity) return '∞'
    if (value === -Infinity) return '-∞'
    return num(value, digits)
  }

  function formatSeconds(value, digits = 2) {
    const formatted = formatNumber(value, digits)
    return formatted === '—' ? formatted : `${formatted}s`
  }

  function formatClock(value) {
    if (typeof value !== 'number' || !Number.isFinite(value)) return '—'
    const hours = Math.floor(value / 3600)
    const minutes = Math.floor((value % 3600) / 60)
    const seconds = (value % 60).toFixed(value < 60 ? 2 : 1)
    return hours
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(4, '0')}`
      : `${minutes}:${String(seconds).padStart(4, '0')}`
  }

  function metric(label, value, status) {
    const node = el('div', `mse-metric${status ? ` ${status}` : ''}`)
    node.appendChild(el('span', 'mse-metric-label', label))
    node.appendChild(el('strong', 'mse-metric-value', String(value)))
    return node
  }

  function sectionHeader(title, meta) {
    const head = el('div', 'mse-section-head')
    head.appendChild(el('h3', null, title))
    if (meta != null) head.appendChild(el('span', 'muted', String(meta)))
    return head
  }

  function timelineDuration(mse) {
    const tracks = Array.isArray(mse.tracks) ? mse.tracks : []
    if (
      typeof mse.duration === 'number' &&
      Number.isFinite(mse.duration) &&
      mse.duration > 0
    ) {
      return mse.duration
    }
    return Math.max(mse.currentTime || 0, ...tracks.map((track) => rangeEnd(track)), 1)
  }

  function trackTimeline(track, currentTime, duration) {
    const ranges = Array.isArray(track.buffered) ? track.buffered : []
    const row = el('div', 'mse-track')
    row.dataset.type = track.type
    const head = el('div', 'mse-track-head')
    const identity = el('div', 'mse-track-identity')
    identity.appendChild(el('strong', 'mse-track-name', track.type))
    identity.appendChild(el('span', 'mse-track-codec', track.mimeType || '—'))
    head.appendChild(identity)
    const stats = el('div', 'mse-track-stats')
    stats.appendChild(badge(t('mseAhead', [formatSeconds(track.bufferAhead)])))
    stats.appendChild(badge(t('mseRanges', [String(ranges.length)])))
    if (track.queueLength)
      stats.appendChild(badge(t('mseQueue', [String(track.queueLength)]), 'warn'))
    if (track.updating) stats.appendChild(badge(t('mseUpdating'), 'warn'))
    if (track.full) stats.appendChild(badge(t('mseFull'), 'error'))
    head.appendChild(stats)
    row.appendChild(head)
    const bar = el('div', 'mse-range-bar')
    ranges.forEach((range) => {
      const segment = el('div', 'range')
      segment.style.left = `${Math.max(
        0,
        Math.min(100, (range.start / duration) * 100)
      )}%`
      segment.style.width = `${Math.max(
        0.5,
        Math.min(100, ((range.end - range.start) / duration) * 100)
      )}%`
      segment.title = `${formatClock(range.start)} – ${formatClock(range.end)}`
      bar.appendChild(segment)
    })
    const cursor = el('div', 'cursor')
    cursor.style.left = `${Math.max(
      0,
      Math.min(100, ((currentTime || 0) / duration) * 100)
    )}%`
    cursor.title = t('mseCurrentTimeValue', [formatClock(currentTime)])
    bar.appendChild(cursor)
    row.appendChild(bar)
    const scale = el('div', 'mse-range-scale')
    scale.appendChild(el('span', null, '0:00'))
    scale.appendChild(
      el(
        'span',
        'mse-range-current',
        t('mseCurrentTimeValue', [formatClock(currentTime)])
      )
    )
    scale.appendChild(el('span', null, formatClock(duration)))
    row.appendChild(scale)
    return row
  }

  function sourceBufferList(tracks) {
    const list = el('div', 'mse-sb-list')
    tracks.forEach((track) => {
      const row = el('section', 'mse-sb-row')
      const head = el('div', 'mse-sb-head')
      const identity = el('div', 'mse-sb-identity')
      identity.appendChild(el('strong', 'mse-track-type', track.type))
      identity.appendChild(el('code', null, track.mimeType || '—'))
      head.appendChild(identity)
      const flags = el('div', 'mse-sb-flags')
      if (track.updating) flags.appendChild(badge(t('mseUpdating'), 'warn'))
      if (track.full) flags.appendChild(badge(t('mseFull'), 'error'))
      head.appendChild(flags)
      row.appendChild(head)

      const details = el('div', 'mse-sb-grid')
      const values = {
        mode: track.mode || '—',
        timestampOffset: formatSeconds(track.timestampOffset),
        appendWindow: `${formatSeconds(track.appendWindowStart)} – ${formatSeconds(track.appendWindowEnd)}`,
        [t('mseQueueLabel')]: track.queueLength,
        [t('mseCurrentOperation')]: track.currentOperation
          ? track.currentOperation.name
          : '—'
      }
      Object.keys(values).forEach((label) => {
        const property = el('div', 'mse-sb-property')
        property.appendChild(el('span', null, label))
        property.appendChild(el('code', null, String(values[label])))
        details.appendChild(property)
      })
      row.appendChild(details)
      list.appendChild(row)
    })
    return list
  }

  function recentEvents() {
    return currentEvents()
      .filter((event) => {
        if (
          event.probeId === 'mse' ||
          /sourcebuffer|mediasource|appendbuffer|removebuffer|buffereos|mse/i.test(
            event.type
          )
        ) {
          return true
        }
        return event.category === 'error' && /mse/i.test(JSON.stringify(event.data || {}))
      })
      .slice(-40)
      .reverse()
  }

  function formatBytes(value) {
    if (typeof value !== 'number' || value < 0) return ''
    if (value < 1024) return `${value} B`
    if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`
    return `${(value / 1024 / 1024).toFixed(2)} MB`
  }

  function eventTone(event) {
    if (event.category === 'error' || /error/i.test(event.type)) return 'error'
    if (/remove|clear|abort/i.test(event.type)) return 'remove'
    if (/append|update/i.test(event.type)) return 'append'
    return 'state'
  }

  function eventSummary(event) {
    const data = event.data || {}
    const parts = []
    if (data.track != null) parts.push(String(data.track))
    if (data.byteLength != null) parts.push(formatBytes(data.byteLength))
    if (data.start != null || data.end != null)
      parts.push(`${formatSeconds(data.start)} – ${formatSeconds(data.end)}`)
    if (data.mimeType) parts.push(data.mimeType)
    if (data.reason) parts.push(String(data.reason))
    if (data.buffered?.length != null)
      parts.push(t('mseRanges', [String(data.buffered.length)]))
    if (!parts.length) {
      Object.keys(data)
        .slice(0, 2)
        .forEach((key) => {
          const value = data[key]
          if (value == null || typeof value === 'object') return
          parts.push(`${key}=${String(value)}`)
        })
    }
    return parts.join(' · ') || '—'
  }

  function eventList(events) {
    if (!events.length) return el('div', 'mse-empty-inline', t('mseNoEvents'))
    const list = el('div', 'mse-event-list')
    events.forEach((event) => {
      const key = `${event.ts}|${event.type}|${event.playerId || ''}`
      const details = document.createElement('details')
      details.className = `mse-event ${eventTone(event)}`
      details.open = expandedEvents.has(key)
      details.ontoggle = () => {
        if (details.open) expandedEvents.add(key)
        else expandedEvents.delete(key)
      }
      const summary = document.createElement('summary')
      summary.className = 'mse-event-summary'
      summary.appendChild(el('time', null, fmtTime(event.ts)))
      summary.appendChild(el('code', 'mse-event-name', event.type))
      summary.appendChild(el('span', 'mse-event-brief', eventSummary(event)))
      details.appendChild(summary)
      const data = el('pre', 'mse-event-data')
      try {
        data.textContent = JSON.stringify(event.data || {}, null, 2)
      } catch {
        data.textContent = String(event.data || '')
      }
      details.appendChild(data)
      list.appendChild(details)
    })
    return list
  }

  function eventTable() {
    const events = recentEvents()
    return { events, node: eventList(events) }
  }

  function badge(text, status) {
    const node = el('span', `mse-badge${status ? ` ${status}` : ''}`)
    node.textContent = text
    return node
  }

  function runtimeMeta(label, value) {
    const item = el('div', 'mse-runtime-meta-item')
    item.appendChild(el('span', null, label))
    item.appendChild(el('code', null, String(value == null ? '—' : value)))
    return item
  }

  return function viewMse(metrics) {
    const wrap = el('div', 'mse-view')
    const mse = metrics.mse
    if (!mse) {
      const empty = el('div', 'empty mse-empty')
      empty.appendChild(el('strong', null, 'MSE'))
      empty.appendChild(el('span', null, t('mseUnavailable')))
      wrap.appendChild(empty)
      return wrap
    }

    const trackList = Array.isArray(mse.tracks) ? mse.tracks : []
    const summary = el('section', 'card mse-summary')
    const summaryHead = sectionHeader(t('mseRuntime'))
    const badges = el('div', 'mse-badges')
    const readyStateOk = mse.readyState === 'open' || mse.readyState === 'ended'
    badges.appendChild(badge(`${mse.source || 'unknown'} · ${mse.confidence || '—'}`))
    if (mse.adapter) badges.appendChild(badge(mse.adapter))
    if (mse.full) badges.appendChild(badge(t('mseFull'), 'error'))
    if (mse.currentTimeCovered) badges.appendChild(badge(t('mseCovered'), 'ok'))
    summaryHead.appendChild(badges)
    summary.appendChild(summaryHead)

    const aheadValues = trackList
      .map((track) => track.bufferAhead)
      .filter((value) => typeof value === 'number' && Number.isFinite(value))
    const minAhead = aheadValues.length ? Math.min(...aheadValues) : null
    const metricsStrip = el('div', 'mse-metrics')
    metricsStrip.appendChild(
      metric(
        t('mseMetricState'),
        `${mse.engine} · ${mse.readyState}`,
        readyStateOk ? 'ok' : 'warn'
      )
    )
    metricsStrip.appendChild(
      metric(t('mseMetricTracks'), mse.sourceBufferCount ?? trackList.length)
    )
    metricsStrip.appendChild(
      metric(
        t('mseMetricQueue'),
        mse.pendingOperations || 0,
        mse.pendingOperations > 0 ? 'warn' : ''
      )
    )
    metricsStrip.appendChild(
      metric(t('mseMetricAhead'), formatSeconds(minAhead), minAhead === 0 ? 'warn' : '')
    )
    metricsStrip.appendChild(
      metric(
        t('mseMetricAvDelta'),
        mse.avEndDelta == null ? '—' : formatSeconds(mse.avEndDelta, 3),
        mse.avEndDelta > 0.25 ? 'warn' : ''
      )
    )
    summary.appendChild(metricsStrip)

    const runtime = el('div', 'mse-runtime-meta')
    runtime.appendChild(runtimeMeta('plugin', mse.plugin))
    runtime.appendChild(runtimeMeta('attach', mse.attachMode))
    runtime.appendChild(runtimeMeta('streaming', mse.streaming))
    runtime.appendChild(runtimeMeta('object URL', mse.objectUrl ? 'attached' : '—'))
    summary.appendChild(runtime)
    wrap.appendChild(summary)

    const tracks = el('section', 'card mse-tracks')
    tracks.appendChild(
      sectionHeader(
        t('mseBufferedTracks'),
        `${t('mseCurrentTimeValue', [formatClock(mse.currentTime)])} · ${t('mseDurationValue', [formatClock(mse.duration)])}`
      )
    )
    if (!trackList.length) {
      tracks.appendChild(el('div', 'mse-empty-inline', t('mseNoSourceBuffers')))
    } else {
      const duration = timelineDuration(mse)
      trackList.forEach((track) => {
        tracks.appendChild(trackTimeline(track, mse.currentTime, duration))
      })
    }
    wrap.appendChild(tracks)

    const eventResult = eventTable()
    const events = el('section', 'card mse-events-card')
    events.appendChild(
      sectionHeader(
        t('mseRecentEvents'),
        t('mseEventCount', [String(eventResult.events.length)])
      )
    )
    events.appendChild(eventResult.node)
    wrap.appendChild(events)

    if (trackList.length) {
      const sourceBuffers = document.createElement('details')
      sourceBuffers.className = 'card mse-source-details'
      sourceBuffers.open = sourceDetailsOpen
      sourceBuffers.ontoggle = () => {
        sourceDetailsOpen = sourceBuffers.open
      }
      const sourceSummary = document.createElement('summary')
      sourceSummary.className = 'mse-source-summary'
      sourceSummary.appendChild(el('strong', null, t('mseSourceBuffers')))
      sourceSummary.appendChild(
        el('span', 'muted', t('mseTrackCount', [String(trackList.length)]))
      )
      sourceBuffers.appendChild(sourceSummary)
      sourceBuffers.appendChild(sourceBufferList(trackList))
      wrap.appendChild(sourceBuffers)
    }
    return wrap
  }
}
