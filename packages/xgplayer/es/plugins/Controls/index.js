var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import Progress from '../icons/progress';
import PlayIcon from '../icons/playIcon';
import FullScreen from '../icons/fullscreen';
import TimeIcon from '../icons/timeIcon';
import VolumeIcon from '../icons/volumeIcon';
import RotateIcon from '../icons/rotate';
// import MiniScreen from '../icons/miniScreen'
import PIPIcon from '../icons/pipIcon';
import PlayNextIcon from '../icons/playNextIcon';
// import DownLoadIcon from '../icons/downloadIcon'
// import ScreenShotIcon from '../icons/screenShotIcon'
import DefinitionIcon from '../icons/definitionIcon';
import PlaybackRateIcon from '../icons/playbackRateIcon';
import CssFullScreen from '../icons/cssFullScreen';

var Controls = function (_Plugin) {
  _inherits(Controls, _Plugin);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
  }

  _createClass(Controls, [{
    key: 'afterCreate',
    value: function afterCreate() {}
  }, {
    key: 'children',
    value: function children() {
      this.left = this.find('left-grid');
      this.center = this.find('center');
      this.right = this.find('right-grid');
      return {
        TimeIcon: {
          plugin: TimeIcon,
          options: {
            index: 3,
            root: this.left
          }
        },
        PlayIcon: {
          plugin: PlayIcon,
          options: {
            index: 0,
            root: this.left
          }
        },
        playNextIcon: {
          plugin: PlayNextIcon,
          options: {
            index: 1,
            root: this.left
          }
        },
        // DownLoadIcon: {
        //   plugin: DownLoadIcon,
        //   options: {
        //     index: 3,
        //     root: this.right
        //   }
        // },
        // ScreenShotIcon: {
        //   plugin: ScreenShotIcon,
        //   options: {
        //     index: 4,
        //     root: this.right
        //   }
        // },
        FullScreen: {
          plugin: FullScreen,
          options: {
            index: 0,
            root: this.right
          }
        },
        VolumeIcon: {
          plugin: VolumeIcon,
          options: {
            index: 1,
            root: this.right
          }
        },
        RotateIcon: {
          plugin: DefinitionIcon,
          options: {
            index: 2,
            root: this.right
          }
        },
        DefinitionIcon: {
          plugin: RotateIcon,
          options: {
            index: 3,
            root: this.right
          }
        },
        PlaybackRateIcon: {
          plugin: PlaybackRateIcon,
          options: {
            index: 4,
            root: this.right
          }
        },
        // MiniScreen: {
        //   plugin: MiniScreen,
        //   options: {
        //     index: 1,
        //     root: this.right
        //   }
        // },
        PIPIcon: {
          plugin: PIPIcon,
          options: {
            index: 1,
            root: this.right
          }
        },
        CssFullScreen: {
          plugin: CssFullScreen,
          options: {
            index: 1,
            root: this.right
          }
        },
        Progress: {
          plugin: Progress,
          options: {
            root: this.center
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">\n    <left-grid class="left-grid">\n    </Left-grid>\n    <center class="center"></center>\n    <right-grid class="right-grid">\n    </right-grid>\n    </xg-controls>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Controls';
    }
  }]);

  return Controls;
}(Plugin);

export default Controls;