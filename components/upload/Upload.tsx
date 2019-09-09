import * as React from 'react'
import classnames from 'classnames'
import omit from 'omit.js'
import View, { ROOT_PREFIX } from '../../libs/view'
import Icon from '../icon'
import Loading from '../loading'
import Ajax from '../../libs/ajax'
import Button from '../button'
import CropLine from '../cropline'

export interface UploadProps {
  className?: string
  style?: object
  type : 'square' | 'inline'
  accept?: string
  disabled?: boolean
  multiple: boolean
  limit?: number
  autoUpload: boolean
  onExceed?: (files: any) => void
  onStart?: (file: any) => void
  beforeUpload?: (file: any) => any
  onRemove?: (file: any) => void
  name?: string
  headers?: object
  withCredentials?: boolean
  data?: object
  action?: string
  onProgress?: (e: any, file: any) => void
  onSuccess?: (response: any, file: any) => void
  onError?: (err: any, file: any) => void
  httpRequest?: () => any
}

export default class Upload extends React.Component<UploadProps> {
  private prefix = `${ROOT_PREFIX}-upload`
  static defaultProps = {
    autoUpload: true,
    multiple: true,
    type: 'square'
  }
  state: any

  constructor(props: UploadProps) {
    super(props)
    this.state = {
      imageUrl: '',
      showBtns: false,
      loading: false,
      showTip: false,
      filename: props.name || '未选择任何文件'
    }
  }

  handleChange(e: any) {
    if (e.target instanceof HTMLInputElement) {
      const files = e.target.files
      if (!files) return
      this.setState({
        imageUrl: URL.createObjectURL(files[0])
      })
      this.uploadFiles(files);
      (this.refs.input as any).value = null
    }
  }

  uploadFiles(files: FileList) {
    const { multiple, limit, onExceed, onStart, autoUpload } = this.props;
    if (limit && files.length > limit) {
      onExceed && onExceed(files)
      return
    }
    let postFiles = Array.prototype.slice.call(files)
    if (postFiles.length === 0) return
    if (!multiple) {
      postFiles = postFiles.slice(0, 1)
    }
    postFiles.forEach((file: any) => {
      onStart && onStart(file)
      if (autoUpload) this.upload(file);
    })
  }

  upload(file: any) {
    const { beforeUpload, onRemove } = this.props
    if (!beforeUpload) return this.post(file)
    const before = beforeUpload(file)
    if (before && before.then) {
      before.then(
        (processedFile: any) => {
          if (
            Object.prototype.toString.call(processedFile) === '[object File]'
          ) {
            this.post(processedFile)
          } else {
            this.post(file)
          }
        },
        () => {
          file && onRemove && onRemove(file)
        }
      )
    } else if (before !== false) {
      this.post(file)
    } else {
      file && onRemove && onRemove(file)
    }
  }

  post(file: any) {
    this.setState({ loading: true })
    const { name: filename, headers, withCredentials, data, action, onProgress, onSuccess, onError } = this.props
    const { httpRequest = Ajax } = this.props
    const req: any = httpRequest({
      headers,
      withCredentials,
      file,
      data,
      filename,
      action,
      onProgress: (e: any) => onProgress && onProgress(e, file),
      onSuccess: (res: any) => {
        this.setState({
          loading: false,
          filename: file.name,
        })
        onSuccess && onSuccess(res, file)
      },
      onError: (err: any) => {
        this.setState({
          imageUrl: '',
          showBtns: false,
          loading: false,
          showTip: true,
          filename: `上传失败，${err.message}`
        })
        onError && onError(err, file)
      }
    })
    if(req && req.then){
      req.then(onSuccess, onError)
    }
  }

  handleClick() {
    if (!this.props.disabled && !this.state.showBtns && !this.state.loading) {
      (this.refs.input as HTMLElement).click()
    }
  }

  handleMouseEnter() {
    const { imageUrl } = this.state
    if (imageUrl) {
      this.setState({
        showBtns: true
      })
    }
  }

  handleMouseLeave() {
    const { showBtns } = this.state
    showBtns && this.setState({ showBtns: false })
  }

  handleReload() {
    (this.refs.input as HTMLElement).click()
  }

  handleDelete() {
    (this.refs.input as any).value = null
    this.setState({
      imageUrl: '',
      showBtns: false
    })
  }

  render() {
    const { multiple, accept, disabled, type, ...rest } = this.props
    const viewProps = omit(rest, ['limit', 'onExceed', 'onStart', 'autoUpload', 'onRemove', 'beforeUpload', 'name', 'headers', 'withCredentials', 'data', 'action', 'onProgress', 'onSuccess', 'onError'])
    const cls = classnames({
      [`${this.prefix}-disabled`]: disabled,
      [`${this.prefix}-${type}`]: type
    })
    const { imageUrl, showBtns, loading, showTip, filename } = this.state
    if (type === 'square') {
      return (
        <View config={{...viewProps, prefix: this.prefix, cls}} onClick={this.handleClick.bind(this)} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
          <Loading loading={loading}>
            { imageUrl && <img src={imageUrl} className={`${this.prefix}-image`} />}
            {showBtns && <div className={`${this.prefix}-actions`}>
              <div className={`${this.prefix}-actions-mask`} />
              <Icon type='reload' className={`${this.prefix}-actions-reload`} onClick={this.handleReload.bind(this)} />
              <Icon type='delete' className={`${this.prefix}-actions-delete`} onClick={this.handleDelete.bind(this)} />
            </div>}
            { !imageUrl && <Icon type='plus' className={`${this.prefix}-icon`} />}
            { !imageUrl && showTip && <CropLine text={filename} className={`${this.prefix}-warning`} lines={1} />}
            <input className={`${this.prefix}-input`} type='file' ref='input' onChange={this.handleChange.bind(this)} multiple={multiple} accept={accept} />
          </Loading>
        </View>
      )
    }
    const cls2 = classnames(`${this.prefix}-info`, {
      [`${this.prefix}-warning`]: showTip
    })
    return (
      <View config={{...viewProps, prefix: this.prefix, cls}} onClick={this.handleClick.bind(this)}>
        <Button disabled={disabled} type='primary' text='点击上传' round={false} loading={loading} />
        <CropLine text={filename} className={cls2} lines={1} />
        <input className={`${this.prefix}-input`} type='file' ref='input' onChange={this.handleChange.bind(this)} multiple={multiple} accept={accept} />
      </View>
    )
  }
}
