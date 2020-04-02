import React, { forwardRef } from 'react'

const Button = (props, ref) => {
  // state = { show : false, x:this.props.x, y :this.props.y }
  const { name, isShow } = props;

  const action = () => {
    if (!isShow) {
      props.action()
    }
  }

  return (
    <div className={'button '} ref={ ref } onClick={() => action() } style={{ background: isShow && '#555' }} >
      <label> {isShow && name} </label>
    </div>
  )
}

export default forwardRef(Button)