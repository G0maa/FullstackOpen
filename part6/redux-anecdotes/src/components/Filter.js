import { connect } from 'react-redux'
// import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    // const dispatch = useDispatch()

    const handleChange = (event) => {
      // dispatch(setFilter(event.target.value))
      // console.log(props.setFilter)
      props.setFilter(event.target.value)
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
// export default Filter
export default connect(
  null,
  { setFilter },
)(Filter)
