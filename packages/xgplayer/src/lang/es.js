export default {
  LANG: 'es',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'error de descarga de vídeo'
      },
      mse: {
        code: 2,
        msg: 'error al añadir emisión'
      },
      parse: {
        code: 3,
        msg: 'error de análisis'
      },
      format: {
        code: 4,
        msg: 'formato incorrecto'
      },
      decoder: {
        code: 5,
        msg: 'error de descodificación'
      },
      runtime: {
        code: 6,
        msg: 'errores gramaticales'
      },
      timeout: {
        code: 7,
        msg: 'tiempo de espera de reproducción agotado'
      },
      other: {
        code: 8,
        msg: 'otros errores'
      }
    },
    HAVE_NOTHING:
        'No hay información sobre si el audio o el vídeo están listos',
    HAVE_METADATA: 'Los metadatos de audio o vídeo están listos ',
    HAVE_CURRENT_DATA:
        'Los datos sobre la ubicación de reproducción actual están disponibles, pero no hay suficientes datos para reproducir el siguiente marco/milisegundo',
    HAVE_FUTURE_DATA:
        'El marco de datos actual y al menos uno más están disponibles',
    HAVE_ENOUGH_DATA:
        'Los datos disponibles son suficientes para iniciar la reproducción',
    NETWORK_EMPTY: 'El audio o el vídeo no se han iniciado',
    NETWORK_IDLE:
        'El audio o el vídeo están activos y se han seleccionado para los recursos, pero no se utiliza ninguna red',
    NETWORK_LOADING: 'El navegador está descargando los datos',
    NETWORK_NO_SOURCE: 'No se ha encontrado ninguna fuente de audio o vídeo',
    MEDIA_ERR_ABORTED: 'El usuario ha cancelado el proceso de recuperación',
    MEDIA_ERR_NETWORK: 'Se ha producido un error al descargar',
    MEDIA_ERR_DECODE: 'Se ha producido un error al descodificar',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'El audio o el vídeo no son compatibles',
    REPLAY: 'Volver a reproducir',
    ERROR: 'La red está fuera de línea',
    PLAY_TIPS: 'Reproducir',
    PAUSE_TIPS: 'Pausar',
    PLAYNEXT_TIPS: 'Reproducir siguiente',
    DOWNLOAD_TIPS: 'Descargar',
    ROTATE_TIPS: 'Girar',
    RELOAD_TIPS: 'Cargar de nuevo',
    FULLSCREEN_TIPS: 'Pantalla completa',
    EXITFULLSCREEN_TIPS: 'Salir de la pantalla completa',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'Salir de cssfullscreen',
    TEXTTRACK: 'Subtítulo',
    PIP: 'PIP',
    SCREENSHOT: 'Captura de pantalla',
    LIVE: 'EN DIRECTO',
    OFF: 'Desactivado',
    OPEN: 'Abrir',
    MINI_DRAG: 'Haz clic y mantén pulsado para arrastrar',
    MINISCREEN: 'Minipantalla',
    REFRESH_TIPS: 'Inténtalo',
    REFRESH: 'Volver a cargar',
    FORWARD: 'reenviar',
    LIVE_TIP: 'En directo'
  }
}
