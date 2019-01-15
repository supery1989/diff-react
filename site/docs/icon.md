## Icon 图标

::: demo
```js
render() {
  return (
    <div>
      <Icon type='loading1' style={{color:'red'}} spin />
      <Icon type='adduser' />
    </div>
  )
}
```
:::

### 方向性图标

::: demo
```js
getLists() {
  return ['stepforward', 'stepbackward', 'fastforward', 'fastbackward', 'shrink', 'arrowsalt', 'down', 'up', 'right', 'left', 'caretdown', 'caretup', 'caretright', 'caretleft', 'downcircle', 'downcircle-o', 'upcircle', 'upcircle-o', 'rightcircle', 'rightcircle-o', 'leftcircle', 'leftcircle-o', 'doubleright', 'doubleleft', 'verticleright', 'verticleleft', 'forward', 'banckward', 'enter', 'back', 'retweet', 'swap', 'swapleft', 'swapright', 'arrowdown', 'arrowup', 'arrowright', 'arrowleft', 'play', 'play-o', 'caretcircleoup', 'upsquare', 'upsquare-o', 'downsquare', 'downsquare-o', 'leftsquare', 'leftsquare-o', 'rightsquare', 'rightsquare-o', 'login', 'logout', 'menufold', 'menuunfold', 'menu-fold', 'menu-unfold', 'indentleft', 'indentright']
}
renderItem = list => {
  return (
    <li key={list}>
      <Icon type={list} />
      <span>{list}</span>
    </li>
  )
}
render() {
  const lists = this.getLists();
  return (
    <ul className="demo-icon-lists">
      {lists.map(list => {
      	return this.renderItem(list)
      })}
    </ul>
  )
}
```
:::

### 提示建议性图标

::: demo
```js
getLists() {
  return ['question', 'questioncircle', 'questioncircle-o', 'plus', 'pluscircle', 'pluscircle-o', 'pause', 'pausecircle', 'pausecircle-o', 'minus', 'minuscircle', 'minuscircle-o', 'plussquare', 'plussquare-o', 'minussquare', 'minussquare-o', 'info', 'infocircle', 'infocircle-o', 'warning', 'warningcircle', 'warningcircle-o', 'close', 'closecircle', 'closecircle-o', 'closesquare', 'closesquare-o', 'check', 'checkcircle', 'checkcircle-o', 'checksquare', 'checksquare-o', 'clockcircle', 'clockcircle-o', 'exclamation']
}
renderItem = list => {
  return (
    <li key={list}>
      <Icon type={list} />
      <span>{list}</span>
    </li>
  )
}
render() {
  const lists = this.getLists();
  return (
    <ul className="demo-icon-lists">
      {lists.map(list => {
      	return this.renderItem(list)
      })}
    </ul>
  )
}
```
:::

### 编辑类图标

::: demo
```js
getLists() {
  return ['edit', 'form', 'copy', 'delete']
}
renderItem = list => {
  return (
    <li key={list}>
      <Icon type={list} />
      <span>{list}</span>
    </li>
  )
}
render() {
  const lists = this.getLists();
  return (
    <ul className="demo-icon-lists">
      {lists.map(list => {
      	return this.renderItem(list)
      })}
    </ul>
  )
}
```
:::

### 数据类图标

::: demo
```js
getLists() {
  return ['areachart', 'piechart', 'barchart', 'barschart', 'linechart', 'dotchart']
}
renderItem = list => {
  return (
    <li key={list}>
      <Icon type={list} />
      <span>{list}</span>
    </li>
  )
}
render() {
  const lists = this.getLists();
  return (
    <ul className="demo-icon-lists">
      {lists.map(list => {
      	return this.renderItem(list)
      })}
    </ul>
  )
}
```
:::

### 网站通用图标

::: demo
```js
getLists() {
  return ['lock', 'unlock', 'bars', 'book', 'calendar', 'cloud', 'cloud-o', 'clouddownload', 'clouddownload-o', 'cloudupload', 'cloudupload-o', 'creditcard', 'desktop', 'download', 'upload', 'ellipsis', 'file', 'filetext', 'filejpg', 'filepdf', 'fileadd', 'fileexcle', 'fileppt', 'fileunknow', 'fileword', 'filemarkdown', 'folder', 'folderadd', 'folderopen', 'hdd', 'frown', 'frown-o', 'meh', 'meh-o', 'smile', 'smile-o', 'inbox', 'laptop', 'appstore', 'appstore-o', 'link', 'mail', 'mobile', 'notification', 'paperclip', 'picture', 'poweroff', 'reload', 'search', 'find', 'setting', 'sharealt', 'shoppingcart', 'tablet', 'tag', 'tag-o', 'tags', 'tags-o', 'totop', 'user', 'videocamera', 'home', 'loading', 'loading2', 'star', 'star-o', 'heart', 'heart-o', 'enviroment', 'enviroment-o', 'eye', 'eye-o', 'camera', 'camera-o', 'save', 'team','solution', 'phone', 'filter', 'exception', 'export', 'export2', 'customerservice', 'qrcode', 'scan', 'like', 'like-o', 'dislike', 'dislike-o', 'message', 'paycircle', 'paycircle-o', 'calculator', 'pushpin', 'pushpin-o', 'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect', 'database', 'barcode', 'hourglass', 'key', 'flag', 'layout', 'printer', 'sound', 'USB', 'skin', 'tool', 'sync', 'wifi', 'car', 'adduser', 'addusergroup', 'deleteuser', 'deleteusergroup', 'man', 'woman', 'gift', 'idcard', 'medicinebox', 'redenvelopes', 'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy', 'contacts', 'shake', 'api', 'fork', 'dashboard', 'table', 'profile', 'rest', 'earth', 'shop', 'carryout']
}
renderItem = list => {
  return (
    <li key={list}>
      <Icon type={list} />
      <span>{list}</span>
    </li>
  )
}
render() {
  const lists = this.getLists();
  return (
    <ul className="demo-icon-lists">
      {lists.map(list => {
      	return this.renderItem(list)
      })}
    </ul>
  )
}
```
:::

### 品牌和标识

::: demo
```js
getLists() {
  return ['apple', 'apple-o', 'android', 'android-o', 'windows', 'windows-o', 'ie', 'chrome', 'github', 'aliwangwang', 'aliwangwang-o', 'dingding', 'dingding-o', 'weibo', 'weibocircle', 'weibosquare', 'taobaocircle', 'taobaosquare', 'html', 'twitter', 'wechat', 'youtube', 'alipaysquare', 'alipaycircle', 'skype', 'qq', 'mediumwordmark', 'gitlab', 'mediummonogram', 'linkedinsquare', 'googleplus', 'google', 'dropbox', 'facebooksquare', 'codepen', 'codepencircle', 'codeSandbox', 'codesquare', 'codesquare-o', 'amazon', 'antdesign', 'aliyun', 'zhihu', 'slack', 'slacksquare', 'behance', 'behancesquare', 'dribbble', 'dribbblesquare', 'instagram', 'yuque']
}
renderItem = list => {
  return (
    <li key={list}>
      <Icon type={list} />
      <span>{list}</span>
    </li>
  )
}
render() {
  const lists = this.getLists();
  return (
    <ul className="demo-icon-lists">
      {lists.map(list => {
      	return this.renderItem(list)
      })}
    </ul>
  )
}
```
:::
