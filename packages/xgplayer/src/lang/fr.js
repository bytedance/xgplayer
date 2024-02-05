export default {
  LANG: 'fr',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'erreur de téléchargement vidéo'
      },
      mse: {
        code: 2,
        msg: 'erreur d\'ajout du stream'
      },
      parse: {
        code: 3,
        msg: 'erreur d\'analyse'
      },
      format: {
        code: 4,
        msg: 'format erroné'
      },
      decoder: {
        code: 5,
        msg: 'erreur de décodage'
      },
      runtime: {
        code: 6,
        msg: 'erreurs grammaticales'
      },
      timeout: {
        code: 7,
        msg: 'lecture expirée'
      },
      other: {
        code: 8,
        msg: 'autres erreurs'
      }
    },
    HAVE_NOTHING:
        'Il n\'y a pas d\'information sur la disponibilité de l\'audio/vidéo',
    HAVE_METADATA: 'Les métadonnées audio/vidéo sont prêtes ',
    HAVE_CURRENT_DATA:
        'Les données relatives à l\'emplacement de lecture actuel sont disponibles, mais les données ne sont pas suffisantes pour lire l\'image/la milliseconde suivante',
    HAVE_FUTURE_DATA: 'Trame de données actuelles (au moins une) disponible',
    HAVE_ENOUGH_DATA:
        'Les données disponibles sont suffisantes pour démarrer la lecture',
    NETWORK_EMPTY: 'L\'audio/vidéo n\'a pas été initialisé',
    NETWORK_IDLE:
        'L\'audio/vidéo est actif et a été sélectionné comme ressource, mais aucun réseau n\'est utilisé',
    NETWORK_LOADING: 'Le navigateur télécharge les données',
    NETWORK_NO_SOURCE: 'Aucune source audio/vidéo n\'a été trouvée',
    MEDIA_ERR_ABORTED:
        'Le processus de recherche est interrompu par l\'utilisateur',
    MEDIA_ERR_NETWORK: 'Une erreur s\'est produite lors du téléchargement',
    MEDIA_ERR_DECODE: 'Une erreur s\'est produite lors du décodage',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'L\'audio/vidéo n\'est pas pris en charge',
    REPLAY: 'Relancer',
    ERROR: 'Le réseau est hors ligne',
    PLAY_TIPS: 'Lire',
    PAUSE_TIPS: 'Mettre en pause',
    PLAYNEXT_TIPS: 'Lire l\'élément suivant',
    DOWNLOAD_TIPS: 'Télécharger',
    ROTATE_TIPS: 'Pivoter',
    RELOAD_TIPS: 'Actualiser',
    FULLSCREEN_TIPS: 'Plein écran',
    EXITFULLSCREEN_TIPS: 'Quitter le plein écran',
    CSSFULLSCREEN_TIPS: 'Plein écran css',
    EXITCSSFULLSCREEN_TIPS: 'Quitter le plein écran css',
    TEXTTRACK: 'Légende',
    PIP: 'PIP',
    SCREENSHOT: 'Capture d\'écran',
    LIVE: 'EN DIRECT',
    OFF: 'Désactivé',
    OPEN: 'Ouvrir',
    MINI_DRAG: 'Cliquer et maintenir pour faire glisser',
    MINISCREEN: 'Mini écran',
    REFRESH_TIPS: 'Essayez',
    REFRESH: 'Actualiser',
    FORWARD: 'transférer',
    LIVE_TIP: 'En direct'
  }
}