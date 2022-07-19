// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log('Notificaiton component re-render')
  // const notification = useSelector(state => state.notification)

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(props.notification === null) {
    style = {
      display: 'none',
    }
  }

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    notification: state.notification,
  }
}

// export default Notification
export default connect(
  mapStatetoProps,
  null,
)(Notification)
