const MENU_LISTS = [
  {
    type: '通用',
    lists: [
      { key: 'button', name: 'Button 按钮*' },
      { key: 'icon', name: 'Icon 图标'}
    ] 
  },
  {
    type: '布局',
    lists: [
      { key: 'layout', name: 'Layout 布局*2'}
    ]
  },
  {
    type: '导航',
    lists: [
      { key: 'breadcrumb', name: 'Breadcrumb 面包屑#@2'},
      { key: 'menu', name: 'Menu 菜单#@'},
      { key: 'steps', name: 'Steps 步骤条'},
      { key: 'progress', name: 'Progress 进度条#@'},
      { key: 'page', name: 'Page 分页2'},
      { key: 'dropdowm', name: 'Dropdown 下拉菜单2'},
    ]
  },
  {
    type: '数据录入',
    lists: [
      { key: 'rate', name: 'Rate 评分#@'},
      { key: 'input', name: 'Input 输入框'},
      { key: 'radio', name: 'Radio 单选框'},
      { key: 'colorPicker', name: 'ColorPicker 颜色选择器#@'},
      { key: 'checkbox', name: 'Checkbox 复选框'},
      { key: 'switch', name: 'Switch 开关'},
      { key: 'select', name: 'Select 下拉框#@2'},
      { key: 'timepicker', name: 'Time Picker 时间选择框2'},
      { key: 'inputnumber', name: 'Time Picker 数字输入框'},
      { key: 'textarea', name: 'Time Picker 文本域'},
    ]
  },
  {
    type: '展示',
    lists: [
      { key: 'tooltip', name: 'Tooltip 文字提示#@2'},
      { key: 'avatar', name: 'Avatar 头像#@'},
      { key: 'badge', name: 'Badge 标记#@'},
      { key: 'carousel', name: 'Carousel 走马灯#@'},
      { key: 'tag', name: 'Tag 标签'},
    ]
  },
  {
    type: '反馈',
    lists: [
      { key: 'alert', name: 'Alert 警告'},
      { key: 'transition', name: 'Transition 动画*'},
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
      { key: 'divider', name: 'Divider 分割线#@'},
    ]
  }
]

export let MENU_LISTS_TOTAL = 0
MENU_LISTS.map(items => {
  MENU_LISTS_TOTAL += items.lists.length
})

export default MENU_LISTS