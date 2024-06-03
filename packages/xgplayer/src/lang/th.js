export default {
  LANG: 'th',
  TEXT: {
    ERROR_TYPES: {
      network: {
        code: 1,
        msg: 'เกิดข้อผิดพลาดในการดาวน์โหลดวิดีโอ'
      },
      mse: {
        code: 2,
        msg: 'เกิดข้อผิดพลาดในการผนวกสตรีม'
      },
      parse: {
        code: 3,
        msg: 'เกิดข้อผิดพลาดในการแยกวิเคราะห์'
      },
      format: {
        code: 4,
        msg: 'รูปแบบไม่ถูกต้อง'
      },
      decoder: {
        code: 5,
        msg: 'เกิดข้อผิดพลาดในการถอดรหัส'
      },
      runtime: {
        code: 6,
        msg: 'เกิดข้อผิดพลาดทางไวยากรณ์'
      },
      timeout: {
        code: 7,
        msg: 'หมดเวลาเล่น'
      },
      other: {
        code: 8,
        msg: 'ข้อผิดพลาดอื่น ๆ'
      }
    },
    HAVE_NOTHING: 'ไม่มีข้อมูลความพร้อมของเสียง/วิดีโอ',
    HAVE_METADATA: 'ข้อมูลของข้อมูลเสียง/วิดีโอพร้อมแล้ว ',
    HAVE_CURRENT_DATA:
        'มีข้อมูลตำแหน่งการเล่นปัจจุบัน แต่มีข้อมูลไม่พอที่จะเล่นเฟรม/มิลลิวินาทีถัดไป',
    HAVE_FUTURE_DATA: 'มีเฟรมข้อมูลปัจจุบันอย่างน้อยหนึ่งเฟรม',
    HAVE_ENOUGH_DATA: 'ข้อมูลที่มีอยู่เพียงพอที่จะเริ่มเล่น',
    NETWORK_EMPTY: 'ยังไม่ได้เริ่มต้นเสียง/วิดีโอ',
    NETWORK_IDLE:
        'เสียง/วิดีโอใช้งานอยู่และเลือกไว้ใช้กับทรัพยากร แต่ไม่มีการใช้เครือข่าย',
    NETWORK_LOADING: 'เบราว์เซอร์กำลังดาวน์โหลดข้อมูล',
    NETWORK_NO_SOURCE: 'ไม่พบแหล่งเสียง/วิดีโอ',
    MEDIA_ERR_ABORTED: 'ผู้ใช้ยกเลิกกระบวนการดึงแล้ว',
    MEDIA_ERR_NETWORK: 'เกิดข้อผิดพลาดขณะดาวน์โหลด',
    MEDIA_ERR_DECODE: 'เกิดข้อผิดพลาดขณะถอดรหัส',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'ไม่รองรับเสียง/วิดีโอ',
    REPLAY: 'เล่นซ้ำ',
    ERROR: 'เครือข่ายออฟไลน์อยู่',
    PLAY_TIPS: 'เล่น',
    PAUSE_TIPS: 'หยุดชั่วคราว',
    PLAYNEXT_TIPS: 'เล่นรายการถัดไป',
    DOWNLOAD_TIPS: 'ดาวน์โหลด',
    ROTATE_TIPS: 'หมุน',
    RELOAD_TIPS: 'โหลดใหม่',
    FULLSCREEN_TIPS: 'เต็มหน้าจอ',
    EXITFULLSCREEN_TIPS: 'ออกจากโหมดเต็มหน้าจอ',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'ออกจาก cssfullscreen',
    TEXTTRACK: 'คำบรรยาย',
    PIP: 'PIP',
    SCREENSHOT: 'ภาพหน้าจอ',
    LIVE: 'สด',
    OFF: 'ปิด',
    OPEN: 'เปิด',
    MINI_DRAG: 'คลิกค้างไว้เพื่อลาก',
    MINISCREEN: 'จอเล็ก',
    REFRESH_TIPS: 'โปรดลอง',
    REFRESH: 'รีเฟรช',
    FORWARD: 'ส่งต่อ',
    LIVE_TIP: 'สด'
  }
}