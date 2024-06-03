export default {
  LANG: 'de',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'Fehler beim Herunterladen des Videos'
      },
      mse: {
        code: 2,
        msg: 'Fehler beim Anhängen des Streams'
      },
      parse: {
        code: 3,
        msg: 'Fehler beim Parsen'
      },
      format: {
        code: 4,
        msg: 'falsches Format'
      },
      decoder: {
        code: 5,
        msg: 'Dekodierungsfehler'
      },
      runtime: {
        code: 6,
        msg: 'grammatikalische Fehler'
      },
      timeout: {
        code: 7,
        msg: 'Wiedergabeunterbrechung'
      },
      other: {
        code: 8,
        msg: 'andere Fehler'
      }
    },
    HAVE_NOTHING:
        'Es sind keine Informationen darüber vorhanden, ob Audio/Video wiedergabebereit ist',
    HAVE_METADATA: 'Audio-/Video-Metadaten können genutzt werden ',
    HAVE_CURRENT_DATA:
        'Es sind Daten über die aktuelle Wiedergabeposition verfügbar, jedoch reichen diese nicht aus, um den nächsten Frame / die nächste Millisekunde wiederzugeben',
    HAVE_FUTURE_DATA:
        'Das aktuelle und mindestens ein Datenframe ist verfügbar',
    HAVE_ENOUGH_DATA:
        'Die verfügbaren Daten reichen aus, um die Wiedergabe zu starten',
    NETWORK_EMPTY: 'Audio/Video wurde nicht initialisiert',
    NETWORK_IDLE:
        'Audio/Video ist aktiv und wurde für die Ressourcen ausgewählt, aber es wird kein Netzwerk verwendet',
    NETWORK_LOADING: 'Der Browser lädt die Daten herunter',
    NETWORK_NO_SOURCE: 'Keine Audio-/Videoquelle gefunden',
    MEDIA_ERR_ABORTED: 'Der Abrufvorgang wurde vom Benutzer abgebrochen',
    MEDIA_ERR_NETWORK: 'Beim Herunterladen ist ein Fehler aufgetreten',
    MEDIA_ERR_DECODE: 'Bei der Entschlüsselung ist ein Fehler aufgetreten',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Audio/Video wird nicht unterstützt',
    REPLAY: 'Erneute Wiedergabe',
    ERROR: 'Das Netzwerk ist offline',
    PLAY_TIPS: 'Wiedergabe',
    PAUSE_TIPS: 'Anhalten',
    PLAYNEXT_TIPS: 'Nächstes wiedergeben',
    DOWNLOAD_TIPS: 'Herunterladen',
    ROTATE_TIPS: 'Drehen',
    RELOAD_TIPS: 'Neu laden',
    FULLSCREEN_TIPS: 'Vollbildschirm',
    EXITFULLSCREEN_TIPS: 'Vollbildschirm beenden',
    CSSFULLSCREEN_TIPS: 'CSS-Vollbildschirm',
    EXITCSSFULLSCREEN_TIPS: 'CSS-Vollbildschirm beenden',
    TEXTTRACK: 'Beschriftung',
    PIP: 'PIP',
    SCREENSHOT: 'Screenshot',
    LIVE: 'LIVE',
    OFF: 'Aus',
    OPEN: 'Öffnen',
    MINI_DRAG: 'Klicken und zum Ziehen halten',
    MINISCREEN: 'Miniaturbildschirm',
    REFRESH_TIPS: 'Bitte versuchen',
    REFRESH: 'Aktualisieren',
    FORWARD: 'weiterleiten',
    LIVE_TIP: 'Live'
  }
}
