const MENU_LISTS = [
  {
    type: '通用',
    lists: [
      { key: 'button', name: 'Button 按钮' },
      { key: 'icon', name: 'Icon 图标'}
    ] 
  },
  {
    type: '布局',
    lists: [
      { key: 'grid', name: 'Grid 栅格'},
      { key: 'layout', name: 'Layout 布局'},
    ]
  },
  {
    type: '导航',
    lists: [
      { key: 'breadcrumb', name: 'Breadcrumb 面包屑'},
      { key: 'dropdown', name: 'Dropdown 下拉菜单'},
      { key: 'menu', name: 'Menu 导航菜单'},
      { key: 'page', name: 'Page 分页'},
      { key: 'progress', name: 'Progress 进度条*14'},
      { key: 'steps', name: 'Steps 步骤条'},
      { key: 'tabs', name: 'Tabs 标签页*99', from: 'element'},
      { key: 'tree', name: 'Tree 树形控件*99', from: 'element'},
    ]
  },
  {
    type: '数据录入',
    lists: [
      { key: 'checkbox', name: 'Checkbox 复选框'},
      { key: 'colorPicker', name: 'ColorPicker 颜色选择器*1'},
      { key: 'input', name: 'Input 输入框'},
      { key: 'inputnumber', name: 'inputNumber 数字输入框*4'},
      { key: 'radio', name: 'Radio 单选框'},
      { key: 'rate', name: 'Rate 评分*1'},
      { key: 'select', name: 'Select 下拉框'},
      { key: 'switch', name: 'Switch 开关'},
      { key: 'textarea', name: 'Textarea 文本域'},
      { key: 'timepicker', name: 'TimePicker 时间选择器'},
    ]
  },
  {
    type: '展示',
    lists: [
      { key: 'avatar', name: 'Avatar 头像*14'},
      { key: 'badge', name: 'Badge 标记*14'},
      { key: 'blockheader', name: 'BlockHeader 标题'},
      { key: 'card', name: 'Card 卡片'},
      { key: 'carousel', name: 'Carousel 走马灯*14'},
      { key: 'collapse', name: 'Collapse 折叠面板*99', from: 'element'},
      { key: 'tag', name: 'Tag 标签'},
      { key: 'table', name: 'Table 表格*99' },
      { key: 'tooltip', name: 'Tooltip 文字提示'},
    ]
  },
  {
    type: '反馈',
    lists: [
      { key: 'alert', name: 'Alert 警告'},
      { key: 'errorboundary', name: 'ErrorBoundary 错误隔离*4', from: 'youzan'},
      { key: 'loading', name: 'Loading 加载'},
      { key: 'notification', name: 'Notification 通知' },
      { key: 'popover', name: 'Popover 弹出框' },
      { key: 'popup', name: 'Popup 对话框' },
      { key: 'toast', name: 'Toast 消息提示'},
      { key: 'transition', name: 'Transition 动画*04'},
    ]
  },
  {
    type: '其他',
    lists: [
      { key: 'backtop', name: 'BackTop 返回顶部'},
      { key: 'copy', name: 'Copy 复制'},
      { key: 'copyright', name: 'Copyright 版权*4'},
      { key: 'countdown', name: 'Countdown 倒计时'},
      { key: 'divider', name: 'Divider 分割线'},
      { key: 'moment', name: 'Moment 时刻'},
    ]
  }
]

// 组件组数
export let MENU_LISTS_TOTAL = 0
// 已完成组件数量
export let COMPLETE_MENU_TOTAL = 0
// 所有组件列表格式化为数组格式
export let MENU_LISTS_ARR:any = []
MENU_LISTS.map((items: any) => {
  items.total = items.lists.length
  items.complete = 0
  MENU_LISTS_TOTAL += items.total
  items.lists.map((item: any) => {
    MENU_LISTS_ARR.push(item)
    if (item.name.indexOf('*') === -1) {
      COMPLETE_MENU_TOTAL++
      items.complete ++
    }
  })
})

export default MENU_LISTS