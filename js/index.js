// 渲染面包屑版块
function renderBreadcrumb() {
  const breadcrumb = document.querySelector('.breadcrumb')
  for (let i = 0; i < goodData.path.length; i++) {
    const a = document.createElement('a')
    a.innerHTML = goodData.path[i].title
    a.href = goodData.path[i].url ? goodData.path[i].url : 'javascript:;'

    breadcrumb.appendChild(a)

    if (i < goodData.path.length - 1) {
      const span = document.createElement('span')
      span.innerHTML = '/'
      breadcrumb.appendChild(span)
    }
  }
}
renderBreadcrumb()

// 放大镜版块鼠标移入移出显示隐藏
function magnifierShow() {
  const top = document.querySelector('.detail .left .top')
  const magnifier = document.querySelector('.magnifier')
  const mask = document.querySelector('.mask')
  top.addEventListener('mouseenter', function () {
    magnifier.style.display = 'block'
    mask.style.opacity = 1
  })
  top.addEventListener('mouseleave', function () {
    magnifier.style.display = 'none'
    mask.style.opacity = 0
  })
}
magnifierShow()

// 放大镜版块鼠标移动
function magnifierMove() {
  const top = document.querySelector('.detail .left .top')
  const mask = document.querySelector('.mask')
  const img = document.querySelector('.magnifier img')
  top.addEventListener('mousemove', function (e) {
    const mouse_x = e.clientX
    const mouse_y = e.clientY
    let mask_left = mouse_x - 100 - top.getBoundingClientRect().x
    let mask_top = mouse_y - 100 - top.getBoundingClientRect().y
    if (mask_left < 0) {
      mask_left = 0
    }
    if (mask_left > 200) {
      mask_left = 200
    }
    if (mask_top < 0) {
      mask_top = 0
    }
    if (mask_top > 200) {
      mask_top = 200
    }
    mask.style.left = `${mask_left}px`
    mask.style.top = `${mask_top}px`
    img.style.left = `-${mask_left * 2}px`
    img.style.top = `-${mask_top * 2}px`
  })
}
magnifierMove()

// 渲染轮播图版块
function renderCarousel() {
  const carousel = document.querySelector('.carousel ul')
  for (let i = 0; i < goodData.imagessrc.length; i++) {
    const li = document.createElement('li')
    const img = document.createElement('img')
    li.className = 'carousel-item'
    img.src = goodData.imagessrc[i].s
    img.dataset.smallPicUrl = goodData.imagessrc[i].s
    img.dataset.bigPicUrl = goodData.imagessrc[i].b
    li.appendChild(img)
    carousel.appendChild(li)
  }
}
renderCarousel()

// 点击缩略图切换大小图
function carouselChange() {
  // 事件委托
  const carousel = document.querySelector('.carousel ul')
  const smallPic = document.querySelector('#small-pic')
  const bigPic = document.querySelector('#big-pic')
  carousel.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
      smallPic.src = e.target.dataset.smallPicUrl
      bigPic.src = e.target.dataset.bigPicUrl
    }
  })
}
carouselChange()

// 点击按钮移动轮播图
function carouselMove() {
  let start = 4
  const rightBtn = document.querySelector('.detail .right-button')
  const leftBtn = document.querySelector('.detail .left-button')
  const carousel = document.querySelector('.carousel ul')
  rightBtn.addEventListener('click', function () {
    const allDistance = (goodData.imagessrc.length - 5) * 78
    const stride = 78
    start = start - stride
    if (start < -allDistance) {
      start = -allDistance
    }
    carousel.style.left = `${start}px`
  })
  leftBtn.addEventListener('click', function () {
    const allDistance = (goodData.imagessrc.length - 5) * 78
    const stride = 78
    start = start + stride
    if (start > 4) {
      start = 4
    }
    carousel.style.left = `${start}px`
  })
}
carouselMove()

// 渲染商品详情版块
function renderGoodsDetail() {
  const top = document.querySelector('.detail .right .top')
  top.innerHTML = `
    <p class="title">${goodData.goodsDetail.title}</p>
    <p class="recommend">${goodData.goodsDetail.recommend}</p>
    <div class="price">
      <div id="price">
        <div>
          <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
          <div class="money">
            <span>￥</span>
            <span>${goodData.goodsDetail.price}</span>
            <span>降价通知</span>
          </div>
        </div>
        <div>
          <span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
          <div>
            <span class="mark">${goodData.goodsDetail.promoteSales.type}</span>
            <span>${goodData.goodsDetail.promoteSales.content}</span>
          </div>
        </div>
      </div>
      <div id="comment">
        <span>累计评价</span>
        <span>${goodData.goodsDetail.evaluateNum}</span>
      </div>
    </div>
    <p class="support">
      <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
      <span>${goodData.goodsDetail.support}</span>
    </p>
    <p class="address">
      <span>配 送 至</span>
      <span>${goodData.goodsDetail.address}</span>
    </p>
  `
}
renderGoodsDetail()

// 渲染商品售卖属性列表
function renderCrumbData() {
  const sales = document.querySelector('.detail .right .bottom .sales')
  for (let i = 0; i < goodData.goodsDetail.crumbData.length; i++) {
    const salesItem = document.createElement('li')
    salesItem.className = 'sales-item'

    const salesItemTitle = document.createElement('span')
    salesItemTitle.className = 'sales-item-title'
    salesItemTitle.innerHTML = goodData.goodsDetail.crumbData[i].title

    const salesValue = document.createElement('ul')
    salesValue.className = 'sales-value'

    for (let j = 0; j < goodData.goodsDetail.crumbData[i].data.length; j++) {
      const salesValueItem = document.createElement('li')
      salesValueItem.className = 'sales-value-item'
      salesValueItem.innerHTML = goodData.goodsDetail.crumbData[i].data[j].type
      salesValueItem.dataset.changePrice = goodData.goodsDetail.crumbData[i].data[j].changePrice

      salesValue.appendChild(salesValueItem)
    }

    salesItem.appendChild(salesItemTitle)
    salesItem.appendChild(salesValue)

    sales.append(salesItem)
  }
}
renderCrumbData()

// 点击选择商品属性值：排他思维、事件委托
function chooseGoodsAttrValue() {
  const salesValues = document.querySelectorAll('.sales-value')
  const attrs = document.querySelector('.attrs')
  for (let i = 0; i < salesValues.length; i++) {
    salesValues[i].addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
        const salesValueItems = salesValues[i].querySelectorAll('.sales-value-item')
        for (let j = 0; j < salesValueItems.length; j++) {
          salesValueItems[j].classList.remove('active')
        }
        e.target.classList.add('active')

        attrs.innerHTML = ''
        const actives = document.querySelectorAll('.sales-value-item.active')
        for(let k = 0; k < actives.length; k++) {
          const attrsItem = document.createElement('li')
          attrsItem.className = 'attrs-item'
          
          const itemContent = document.createElement('span')
          itemContent.className = 'item-content'
          itemContent.innerHTML = actives[k].innerHTML
          itemContent.dataset.changePrice = actives[k].dataset.changePrice

          const deleteButton = document.createElement('button')
          deleteButton.className = 'delete-button'
          deleteButton.innerHTML = 'X'

          attrsItem.appendChild(itemContent)
          attrsItem.appendChild(deleteButton)

          attrs.appendChild(attrsItem)

          watchPriceChange()
        }
      }
    })
  }
}
chooseGoodsAttrValue()

// 点击删除按钮删除已选中商品属性值
function deleteGoodsAttrValue() {
  const attrs = document.querySelector('.attrs')
  attrs.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON') {
      attrs.removeChild(e.target.parentElement)

      const actives = document.querySelectorAll('.sales-value-item.active')
      for(let i = 0; i < actives.length; i++) {
        if(actives[i].innerHTML === e.target.previousElementSibling.innerHTML) {
          actives[i].classList.remove('active')
          break
        }
      }

      watchPriceChange()
    }
  })
}
deleteGoodsAttrValue()

// 封装价格变动函数
function watchPriceChange() {
  const price = document.querySelector('.content .wrapper .detail .right .top .price #price > div .money span:nth-child(2)')
  let basePrice = 5299
  const itemContents = document.querySelectorAll('.content .wrapper .detail .right .bottom .attrs .attrs-item .item-content')
  for(let i = 0; i < itemContents.length; i++) {
    basePrice += parseInt(itemContents[i].dataset.changePrice)
  }
  price.innerHTML = `${basePrice}`
}

// 封装套餐价格联动函数
function watchPrice2Change() {
  const checkboxes = document.querySelectorAll('.param .wrapper .right .top .right-content .right-left ul li > div input')
  for(let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
      let basePrice = 5299
      for(let j = 0; j < checkboxes.length; j++) {
        if(checkboxes[j].checked) {
          basePrice += 50
        }
      }
      document.querySelector('.param .wrapper .right .top .right-content .right-right p.price').innerHTML = `￥${basePrice}`
    })
  }
}
watchPrice2Change()

// 封装公共选项卡函数
function switchTabsActive(tabs, contents) {
  for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function() {
      tabs.forEach(value => {
        value.classList.remove('active')
      })
      tabs[i].classList.add('active')
      contents.forEach(value => {
        value.classList.remove('active')
      })
      contents[i].classList.add('active')
    })
  }
}
switchTabsActive(document.querySelectorAll('.param .wrapper .left .tab .tab-item'), document.querySelectorAll('.param .wrapper .left .tab-content'))
switchTabsActive(document.querySelectorAll('.param .wrapper .right .bottom .tab .tab-item'), document.querySelectorAll('.param .wrapper .right .bottom .tab-content'))

// 开启/关闭侧边栏函数
function openOrCloseNav() {
  const btn = document.querySelector('.nav .open-button')
  const nav = document.querySelector('.nav')
  btn.addEventListener('click', function() {
    if(btn.innerHTML === 'open') {
      btn.innerHTML = 'close'
      nav.style.right = 0
    }
    else {
      btn.innerHTML = 'open'
      nav.style.right = '-345px'
    }
  })
}
openOrCloseNav()