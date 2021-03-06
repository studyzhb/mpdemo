var spider = require('../lib/spider')

spider({
  url: 'http://www.dytt8.net/index.htm',
  decoding: 'gb2312'
}, {
  items: {
    selector: '.co_area2 .co_content2 ul',
    handler: {
      url: {
        selector: 'a!attr:href'
      },
      title: {
        selector: 'a!text'
      }
    }
  }
}).then((data) => {
  // 第一页成功
  if (data && data.items) {
    var urls = data.items.url
    urls.forEach(function (url) {
      url = 'http://www.dytt8.net' + url
      // 遍历开始抓取第二页面
      spider({url: url, decoding: 'gb2312'}, {
        url: {
          selector: '#Zoom table td a!text'
        },
        title: {
          selector: '.title_all h1!text'
        }
      }).then((d) => {
        console.log(d)
      })
    })
  }
})
