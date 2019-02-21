const MENU_LISTS = [
  {
    type: '通用',
    lists: [
      { key: 'button', name: 'Button 按钮*0' },
      { key: 'icon', name: 'Icon 图标'}
    ] 
  },
  {
    type: '布局',
    lists: [
      { key: 'layout', name: 'Layout 布局*02'},
      { key: 'grid', name: 'Grid 栅格'},
    ]
  },
  {
    type: '导航',
    lists: [
      { key: 'breadcrumb', name: 'Breadcrumb 面包屑'},
      { key: 'menu', name: 'Menu 导航菜单'},
      { key: 'steps', name: 'Steps 步骤条'},
      { key: 'progress', name: 'Progress 进度条*1'},
      { key: 'page', name: 'Page 分页*2'},
      { key: 'dropdown', name: 'Dropdown 下拉菜单'},
    ]
  },
  {
    type: '数据录入',
    lists: [
      { key: 'rate', name: 'Rate 评分*1'},
      { key: 'input', name: 'Input 输入框'},
      { key: 'radio', name: 'Radio 单选框'},
      { key: 'colorPicker', name: 'ColorPicker 颜色选择器*1'},
      { key: 'checkbox', name: 'Checkbox 复选框'},
      { key: 'switch', name: 'Switch 开关'},
      { key: 'select', name: 'Select 下拉框*12'},
      { key: 'timepicker', name: 'Time Picker 时间选择框*2'},
      { key: 'inputnumber', name: 'Time Picker 数字输入框*99'},
      { key: 'textarea', name: 'Time Picker 文本域*99'},
    ]
  },
  {
    type: '展示',
    lists: [
      { key: 'tooltip', name: 'Tooltip 文字提示*12'},
      { key: 'avatar', name: 'Avatar 头像*1'},
      { key: 'badge', name: 'Badge 标记*1'},
      { key: 'carousel', name: 'Carousel 走马灯*1'},
      { key: 'tag', name: 'Tag 标签'},
      { key: 'blockheader', name: 'BlockHeader 标题*99', from: 'youzan'},
    ]
  },
  {
    type: '反馈',
    lists: [
      { key: 'alert', name: 'Alert 警告'},
      { key: 'transition', name: 'Transition 动画*0'},
      { key: 'loading', name: 'Loading 加载'},
      { key: 'toast', name: 'Toast 消息提示'},
      { key: 'notification', name: 'Notification 通知' },
      { key: 'popup', name: 'Popup 对话框' }
    ]
  },
  {
    type: '其他',
    lists: [
      { key: 'backtop', name: 'BackTop 返回顶部'},
      { key: 'copy', name: 'Copy 复制'},
      { key: 'divider', name: 'Divider 分割线'},
      { key: 'timestamp', name: 'Timestamp 时间戳*99', from: 'uiw'},
      { key: 'countdown', name: 'Countdown 倒计时*99'},
      { key: 'copyright', name: 'Copyright 版权*99'},
    ]
  }
]

// 组件组数
export let MENU_LISTS_TOTAL = 0
// 已完成组件数量
export let COMPLETE_MENU_TOTAL = 0
MENU_LISTS.map((items: any) => {
  items.total = items.lists.length
  items.complete = 0
  MENU_LISTS_TOTAL += items.total
  items.lists.map((item: any) => {
    if (item.name.indexOf('*') === -1) {
      COMPLETE_MENU_TOTAL++
      items.complete ++
    }
  })
})

export default MENU_LISTS