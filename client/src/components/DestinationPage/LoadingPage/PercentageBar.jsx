import React, {useState} from 'react'
import './PercentageBar.css'

const PercentageBar = ({percentage}) => {
    const [style, setStyle] = useState({})
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${percentage}%`
		}
		
		setStyle(newStyle);
	}, 200)

  return (
    <div className="rounded-2xl relative mt-4 mb-0 h-8 w-80" style={{
        backgroundColor: '#d8d8d8'
    }}>
        <div className="progress-done" style={style}>
            {percentage}%
        </div>
    </div>
  )
}

export default PercentageBar