import React, { useContext } from 'react'
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import DataContext from './Context/DataContext'

const Header = ({title}) => {
  const {width}=useContext(DataContext)
  return (//768 992
    <header>
      <h1>{title}</h1>
      {
      
      width<640?<SmartphoneIcon/>:width<768?<TabletAndroidIcon/>:<LaptopIcon/>}
    </header>
  )
}

Header.defaultProps={
  title:"Social Medial App"
}

export default Header
