export default {
  LANG: 'kr',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: '동영상 다운로드 오류'
      },
      mse: {
        code: 2,
        msg: '스트림 추가 오류'
      },
      parse: {
        code: 3,
        msg: '구문 분석 오류'
      },
      format: {
        code: 4,
        msg: '잘못된 형식'
      },
      decoder: {
        code: 5,
        msg: '디코딩 오류'
      },
      runtime: {
        code: 6,
        msg: '문법 오류'
      },
      timeout: {
        code: 7,
        msg: '재생 시간 초과'
      },
      other: {
        code: 8,
        msg: '기타 오류'
      }
    },
    HAVE_NOTHING: '오디오/동영상 준비 여부에 대한 정보가 없습니다',
    HAVE_METADATA: '오디오/동영상 메타데이터가 준비되었습니다 ',
    HAVE_CURRENT_DATA:
        '현재 재생 위치에 대한 데이터를 사용할 수 있지만 다음 프레임/밀리초를 재생하기에는 데이터가 충분하지 않습니다',
    HAVE_FUTURE_DATA: '현재 및 하나 이상의 데이터 프레임을 사용할 수 있습니다',
    HAVE_ENOUGH_DATA: '사용 가능한 데이터가 재생을 시작하기에 충분합니다',
    NETWORK_EMPTY: '오디오/동영상이 초기화되지 않았습니다',
    NETWORK_IDLE:
        '오디오/동영상이 활성 상태이고 리소스에 대해 선택되었지만 네트워크가 사용되지 않습니다',
    NETWORK_LOADING: '브라우저에서 데이터를 다운로드하고 있습니다',
    NETWORK_NO_SOURCE: '오디오/동영상 소스를 찾을 수 없습니다',
    MEDIA_ERR_ABORTED: '사용자가 가져오기 처리 과정을 중단했습니다',
    MEDIA_ERR_NETWORK: '다운로드하는 동안 오류가 발생했습니다',
    MEDIA_ERR_DECODE: '디코딩하는 동안 오류가 발생했습니다',
    MEDIA_ERR_SRC_NOT_SUPPORTED: '오디오/동영상이 지원되지 않습니다',
    REPLAY: '재생',
    ERROR: '네트워크가 오프라인 상태입니다',
    PLAY_TIPS: '재생',
    PAUSE_TIPS: '일시 정지',
    PLAYNEXT_TIPS: '다음 재생',
    DOWNLOAD_TIPS: '다운로드',
    ROTATE_TIPS: '회전',
    RELOAD_TIPS: '다시 로드',
    FULLSCREEN_TIPS: '전체 화면',
    EXITFULLSCREEN_TIPS: '전체 화면 종료',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'cssfullscreen 종료',
    TEXTTRACK: '캡션',
    PIP: 'PIP',
    SCREENSHOT: '스크린샷',
    LIVE: '라이브',
    OFF: '끄기',
    OPEN: '열기',
    MINI_DRAG: '클릭하고 길게 눌러 드래그',
    MINISCREEN: '미니스크린',
    REFRESH_TIPS: '시도해 보세요',
    REFRESH: '새로 고침',
    FORWARD: '전달',
    LIVE_TIP: '라이브'
  }
}
