/* eslint-disable no-undef */
const width = 1194;
const height = 668;

function fetchdata (file, cb) {
  fetch(file).then(res => {
    return res.arrayBuffer()
  }).then(data => {
    cb(new Uint8Array(data));
  })
}

fetchdata(`data/yuyv422.yuv`, function (data) {
  let r = new Render({
    format: 'YUY2',
    canvas: document.querySelector('#c1')
  });
  r.render([data], width, height);
})

fetchdata(`data/rgb32.yuv`, function (data) {
  let r = new Render({
    format: 'RGB32',
    canvas: document.querySelector('#c2'),
    opacity: 1,
    flip: 'y'
  });
  r.render([data], width, height);
});

fetchdata(`data/rgb24.yuv`, function (data) {
  let r = new Render({
    format: 'RGB24',
    canvas: document.querySelector('#c3'),
    opacity: 1,
    flip: 'y'
  });
  r.render([data], width, height);
})

fetchdata(`data/nv12.yuv`, function (data) {
  window.r = new Render({
    format: 'NV12',
    canvas: document.querySelector('#c4')
  });
  let ydata = data.slice(0, width * height);
  let uvdata = data.slice(width * height, 1.5 * width * height);
  r.render([ydata, uvdata], width, height);
})


fetchdata(`data/yuv420p.yuv`, function (data) {
  let r = new Render({
    format: 'YUV420',
    canvas: document.querySelector('#c5')
  });
  let ydata = data.slice(0, width * height);
  let udata = data.slice(width * height, 1.25 * width * height);
  let vdata = data.slice(1.25 * width * height, 1.5 * width * height);
  r.render([ydata, udata, vdata], width, height);
})

function rendervideo () {   
  let { r, data, frameCount, lastRenderTime } = window.vdata;
  if (new Date().getTime() - lastRenderTime < 33) {
    requestAnimationFrame(rendervideo);
  } else {
    let start = frameCount * 320 * 240 * 2;
    let end = start + (320 * 240 * 2);
    r.render([data.slice(start, end)], 320, 240);
    window.vdata.lastRenderTime = new Date().getTime();
    window.vdata.frameCount++;
    requestAnimationFrame(rendervideo);
  }
}

fetchdata(`data/123.yuv`, function (data) {
  window.vdata = {
    r: new Render({
      format: 'YUY2',
      canvas: document.querySelector('#c6'),
      opacity: 0.5,
      flip: 'xy'
    }),
    data,
    frameCount: 0,
    lastRenderTime: 0
  };
  requestAnimationFrame(rendervideo)
});
