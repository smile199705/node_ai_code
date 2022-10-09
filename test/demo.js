let img

let a = '图片审核失败, 错误图片是:https://colorv-video-bj-1251345866.cos.ap-beijing.myqcloud.com/render/photos/d0875959087bb76c69878ea97814353d.jpg嫌疑标签：Sexy，NakedArt'

img = a.split('https://')
console.log(img)
if (img[1]) {
    img = img[1].split('.jpg')
    console.log(img)
    img = `https://${img[0]}.jpg`
}

console.log(typeof img)
