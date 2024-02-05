export default {
  LANG: 'ru',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'ошибка загрузки видео'
      },
      mse: {
        code: 2,
        msg: 'ошибка добавления потока'
      },
      parse: {
        code: 3,
        msg: 'ошибка синтаксического разбора'
      },
      format: {
        code: 4,
        msg: 'неверный формат'
      },
      decoder: {
        code: 5,
        msg: 'ошибка декодирования'
      },
      runtime: {
        code: 6,
        msg: 'грамматические ошибки'
      },
      timeout: {
        code: 7,
        msg: 'тайм-аут воспроизведения'
      },
      other: {
        code: 8,
        msg: 'прочие ошибки'
      }
    },
    HAVE_NOTHING: 'Нет информации о готовности аудио/видео',
    HAVE_METADATA: 'Метаданные аудио/видео готовы ',
    HAVE_CURRENT_DATA:
        'Данные о текущем месте воспроизведения доступны, но недостаточно данных для воспроизведения следующего кадра/миллисекунды',
    HAVE_FUTURE_DATA: 'Доступен текущий и как минимум один кадр данных',
    HAVE_ENOUGH_DATA: 'Доступных данных достаточно для начала воспроизведения',
    NETWORK_EMPTY: 'Аудио/видео не инициализировано',
    NETWORK_IDLE:
        'Аудио/видео активны и выбраны для ресурсов, но сеть не используется',
    NETWORK_LOADING: 'Браузер загружает данные',
    NETWORK_NO_SOURCE: 'Источник аудио/видео не найден',
    MEDIA_ERR_ABORTED: 'Процесс выборки прерван пользователем',
    MEDIA_ERR_NETWORK: 'Произошла ошибка при загрузке',
    MEDIA_ERR_DECODE: 'Произошла ошибка при декодировании',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Аудио/видео не поддерживается',
    REPLAY: 'Повторить воспроизведение',
    ERROR: 'Сеть не подключена',
    PLAY_TIPS: 'Воспроизвести',
    PAUSE_TIPS: 'Пауза',
    PLAYNEXT_TIPS: 'Воспроизвести ​следующее',
    DOWNLOAD_TIPS: 'Загрузить',
    ROTATE_TIPS: 'Повернуть',
    RELOAD_TIPS: 'Перезагрузить',
    FULLSCREEN_TIPS: 'Полный экран',
    EXITFULLSCREEN_TIPS: 'Выйти из полноэкранного режима',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'Выход из cssfullscreen',
    TEXTTRACK: 'Субтитры',
    PIP: 'Картинка в картинке',
    SCREENSHOT: 'Снимок экрана',
    LIVE: 'В ЭФИРЕ',
    OFF: 'Выкл',
    OPEN: 'Открыть',
    MINI_DRAG: 'Щелкните и удерживайте, чтобы переместить',
    MINISCREEN: 'Мини-экран',
    REFRESH_TIPS: 'Попробуйте',
    REFRESH: 'Обновить',
    FORWARD: 'переслать',
    LIVE_TIP: 'В эфире'
  }
}
