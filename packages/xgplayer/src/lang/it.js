export default {
  LANG: 'it',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'errore di download del video'
      },
      mse: {
        code: 2,
        msg: 'errore di accodamento del flusso'
      },
      parse: {
        code: 3,
        msg: 'errore di analisi'
      },
      format: {
        code: 4,
        msg: 'formato errato'
      },
      decoder: {
        code: 5,
        msg: 'errore di decodifica'
      },
      runtime: {
        code: 6,
        msg: 'errori grammaticali'
      },
      timeout: {
        code: 7,
        msg: 'timeout della riproduzione'
      },
      other: {
        code: 8,
        msg: 'altri errori'
      }
    },
    HAVE_NOTHING:
        'Non ci sono informazioni che indichino se l\'audio/il video è pronto',
    HAVE_METADATA: 'I metadati audio/video sono pronti ',
    HAVE_CURRENT_DATA:
        'I dati sulla posizione corrente di riproduzione sono disponibili, ma non ci sono dati sufficienti per riprodurre il prossimo frame/millisecondo',
    HAVE_FUTURE_DATA: 'Corrente e almeno un frame di dati è disponibile',
    HAVE_ENOUGH_DATA:
        'I dati disponibili sono sufficienti per avviare la riproduzione',
    NETWORK_EMPTY: 'L\'audio/Il video non è stato inizializzato',
    NETWORK_IDLE:
        'L\'audio/Il video è attivo ed è stato selezionato per le risorse, ma non viene utilizzata alcuna rete',
    NETWORK_LOADING: 'Il browser sta scaricando i dati',
    NETWORK_NO_SOURCE: 'Nessuna origine audio/video trovata',
    MEDIA_ERR_ABORTED: 'Il processo di recupero è stato interrotto dall\'utente',
    MEDIA_ERR_NETWORK: 'Si è verificato un errore durante il download',
    MEDIA_ERR_DECODE: 'Si è verificato un errore durante la decodificazione',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Audio/Video non supportato',
    REPLAY: 'Riproduci di nuovo',
    ERROR: 'Rete offline',
    PLAY_TIPS: 'Riproduci',
    PAUSE_TIPS: 'Sospendi',
    PLAYNEXT_TIPS: 'Riproduci successivo',
    DOWNLOAD_TIPS: 'Scarica',
    ROTATE_TIPS: 'Ruota',
    RELOAD_TIPS: 'Ricarica',
    FULLSCREEN_TIPS: 'Schermo intero',
    EXITFULLSCREEN_TIPS: 'Esci dallo schermo intero',
    CSSFULLSCREEN_TIPS: 'Schermo intero CSS',
    EXITCSSFULLSCREEN_TIPS: 'Esci dallo schermo intero CSS',
    TEXTTRACK: 'Didascalia',
    PIP: 'Immagine nell\'immagine',
    SCREENSHOT: 'Screenshot',
    LIVE: 'IN DIRETTA',
    OFF: 'Inattivo',
    OPEN: 'Apri',
    MINI_DRAG: 'Fai clic e tieni premuto per trascinare',
    MINISCREEN: 'Minischermo',
    REFRESH_TIPS: 'Prova',
    REFRESH: 'Aggiorna',
    FORWARD: 'inoltra',
    LIVE_TIP: 'In diretta'
  }
}