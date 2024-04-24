import React from 'react'
import {Routes,Route} from "react-router-dom";
import routes1 from './Routes1';

const TheContent=()=> {
    return (
        <div>
          
          <Routes>
          {routes1.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  pageTitle={route.pageTitle}
                  element={<route.element username email mobile password textarea aPrimary aSuccess aInfo aWarning aDanger aSecondary aLight aDark />}
                />
              )
            )
          })}
        </Routes>
        
           
        </div>
    )
}

export default TheContent
